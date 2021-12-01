/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/* eslint-disable eqeqeq */
/* eslint-disable prettier/prettier */
/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {
  Mutation,
  Arg,
  Resolver,
  Query,
  Ctx,
  UseMiddleware,
  FieldResolver,
  Root,
} from 'type-graphql'
import { v4 } from 'uuid'
import { ObjectId } from 'mongodb'
import { ClassRoom, ClassRoomModel } from '../Entity/classes/class.entity'
import ClassInput, { ClassRoomUpdateInput } from '../Entity/classes/class.input'
import { IContext, isAuth } from '../middlewares/auth.middleware'
import { User, UserModel } from '../Entity/user/user.entity'
import { IdeleteResponse } from './course.resolver'
import { Course, CourseModel } from '../Entity/course/course.entity'
import timeDifference from '../utils/timeremain'
import { RefType } from '../types'

@Resolver(() => ClassRoom)
class ClassRoomResolver {
  @Query(() => [ClassRoom])
  @UseMiddleware(isAuth)
  async getMyClasses(@Ctx() ctx: IContext): Promise<ClassRoom[]> {
    const classRooms = ClassRoomModel.find({
      owner: ctx.payload!.user._id,
    })
    if (!classRooms) return []
    return classRooms
  }

  @Query(() => Boolean)
  @UseMiddleware(isAuth)
  async isJoined(@Ctx() ctx: IContext,
  @Arg('id') id: string): Promise<boolean> {

    const classRoom =await  ClassRoomModel.findById(id)
    
    if(!classRoom) throw new Error("NotFound");
    if(classRoom.owner?.toString() === ctx.payload!.user._id.toString()) return true
    if(classRoom.state === 'PUBLIC') return true
    
    return classRoom.members?.includes(ctx.payload!.user._id) || false
    
  }

  @Query(() => [ClassRoom])
  async getClasses(): Promise<ClassRoom[]> {
    const classRooms = ClassRoomModel.find({
    })
    if (!classRooms) return []
    return classRooms
  }

  @Query(() => ClassRoom)
  @UseMiddleware(isAuth)
  async getOneClassRoom(
    @Ctx() ctx: IContext,
    @Arg('id') id: string
  ): Promise<ClassRoom> {
    const { user } = ctx.payload!
    const classRoom = await ClassRoomModel.findById(id)
    if (!classRoom) throw new Error('Not Valid id')
    if(
      (classRoom.state === 'PRIVATE' && 
      classRoom.members!.filter((m) => m == user._id as unknown as RefType<User>).length === 0) &&
      classRoom.owner as unknown as ObjectId != user._id) {throw new Error('Promision denied')}

    return classRoom
  }

  @Query(() => ClassRoom)
  @UseMiddleware(isAuth)
  async getFilteredClass(
    @Ctx() ctx: IContext,
    @Arg('invite') invite: string
  ): Promise<ClassRoom> {
    const { user } = ctx.payload!
    const classRoom = (await ClassRoomModel.find({ inviteSecret:invite })).length ? await ClassRoomModel.find({ inviteSecret:invite })[0] : null
    if (!classRoom) throw new Error('Not Valid invite')
    if(
      (classRoom.state === 'PRIVATE' && 
      classRoom.members!.filter((m) => m == user._id as unknown as RefType<User>).length === 0) &&
      classRoom.owner as unknown as ObjectId != user._id){
        await this.joinClass(classRoom,invite,user._id.toString())
      }

    return classRoom
  }

  @Mutation(() => ClassRoom)
  @UseMiddleware(isAuth)
  async createClass(
    @Ctx() ctx: IContext,
    @Arg('data') data: ClassInput
  ): Promise<ClassRoom> {
    const { user } = ctx.payload!
    data.course = data.course ? [new ObjectId(data.course[0])] : undefined
    const classRoom = await new ClassRoomModel({ ...data, owner : user._id })
    classRoom.inviteSecret = v4()
    classRoom.inviteSecretTmp = Date.now()
    await classRoom.save()
    console.log(classRoom);
    return classRoom
  }

  @FieldResolver()
  async owner(@Root() classRoom: ClassRoom): Promise<User> {
    return (await UserModel.findById(classRoom.owner))!;
  }

  @FieldResolver()
  async course(@Root() classRoom: ClassRoom): Promise<Course[]> {
    console.log(classRoom);
    return (await CourseModel.find({ classRoom }))!;
  }

  @FieldResolver()
  async members(@Root() classRoom: ClassRoom): Promise<User[]> {
    const users: User[] = []
    for(const i of classRoom.members as RefType<User>[]){
      
      users.push(await UserModel.findById( i) as User)!;
    }
    console.log(users);
    return users
  }

  @Mutation(() => ClassRoom)
  @UseMiddleware(isAuth)
  async updateClass(
    @Arg('data') data: ClassRoomUpdateInput,
    @Ctx() ctx: IContext,
  ): Promise<ClassRoom | null> {
    const { user } = ctx.payload!
    const classRoom = await  ClassRoomModel.findById(data._id)
    if(!classRoom) throw new Error("no class found");
    const d = await UserModel.findById(classRoom?.owner)
    const s = await UserModel.findById(user._id)

    if (d?._id.toHexString() !== s?._id.toHexString()) {
        throw new Error("not allowed");
    }
    
    if (data.members) {
      if(classRoom.members?.includes(data.members[0])){
        throw new Error("Alredy member");  
      }
      classRoom.members?.push(data.members)
    }
    delete data.members
    await  ClassRoomModel.findOneAndUpdate(data._id, data , { new:true })
    await classRoom.save()
    const updated = await  ClassRoomModel.findById(data._id)


    return updated
  }

  @Mutation(() => ClassRoom)
  @UseMiddleware(isAuth)
  async joinClass(
    @Arg('data') data: ClassRoomUpdateInput,
    @Arg('invite') invite: string,
    @Arg('memberId') memberId: string
  ): Promise<ClassRoom | null> {
    const classRoom = await ClassRoomModel.findById(data._id)
    if(!classRoom) throw new Error("no class found");
    
    const member = await UserModel.findById(memberId)
    if(!member) throw new Error("no member found");

    const valid  = timeDifference(Date.now() ,(classRoom.inviteSecretTmp as number))
    if(!valid) throw new Error("no valid invite");

    const memberExist = classRoom.members?.includes(member)
    if(!memberExist) throw new Error("already joined");

    if(classRoom.inviteSecret === invite &&  valid && member && memberExist) {
      classRoom.members?.push(member)
    }
    await classRoom.save()
    console.log(classRoom);
    return classRoom
  }

  @Mutation(() => IdeleteResponse)
  @UseMiddleware(isAuth)
  async deleteClass(@Arg('id') id: string): Promise<IdeleteResponse> {
    const classRoom = ClassRoomModel.findById(id)
    const corses = await CourseModel.find({ classRoom: id })
    const ids = corses.map(el => el.id)
    await CourseModel.deleteMany({
    _id: { $in: ids },
    })
    
    const deletedClass = await classRoom.deleteOne()
    return deletedClass
  }
}

export default ClassRoomResolver
