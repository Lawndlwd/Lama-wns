/* eslint-disable import/no-cycle */
import {
  getModelForClass,
  prop,
  setGlobalOptions,
  Severity,
} from '@typegoose/typegoose'
import { ObjectType, Field, ID } from 'type-graphql'
import { ObjectId } from 'mongodb'
import { Course } from '../course/course.entity'
import { User } from '../user/user.entity'
import { RefType } from '../../types'

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class ClassRoom {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  @prop({ trim: true, required: true })
  name!: string

  @Field(() => [String])
  @prop({ required: false })
  tags!: Array<string>

  @Field()
  @prop({ trim: true, required: true })
  desc!: string

  @Field()
  @prop({ trim: true, required: true })
  image!: string

  @Field()
  @prop({ trim: true, required: false })
  inviteSecret?: string

  @Field()
  @prop({ required: true })
  inviteSecretTmp!: number

  @Field(() => User)
  @prop({ required: true, ref: User })
  owner!: RefType<User>

  @Field()
  @prop({ required: false, default: 0 })
  rate?: number

  @Field()
  @prop({ required: true, default: 'PUBLIC' })
  state?: 'PUBLIC' | 'PRIVATE'

  @Field(() => [Course])
  @prop({ required: false })
  public course?: Array<RefType<Course>>

  @Field(() => [User])
  @prop({ required: false, ref: User })
  public members?: RefType<User>[]

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

export const ClassRoomModel = getModelForClass(ClassRoom, {
  schemaOptions: { timestamps: true },
})
