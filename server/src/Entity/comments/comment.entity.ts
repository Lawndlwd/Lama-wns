/* eslint-disable import/no-cycle */
import {
  getModelForClass,
  prop,
  Ref,
  setGlobalOptions,
  Severity,
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { ObjectType, Field, ID } from 'type-graphql'
import { ClassRoom } from '../classes/class.entity'
import { RefType } from '../../types'
import { User } from '../user/user.entity'
import { Course } from '../course/course.entity'

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })
@ObjectType()
export class Comment {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field(() => User)
  @prop({ required: true, ref: User })
  commenter!: RefType<User>

  @Field(() => String, { nullable: true })
  @prop({ trim: true, required: false })
  parent?: Ref<Course>

  @Field()
  @prop({ required: true })
  content!: string

  @Field()
  @prop({ required: true })
  public step!: string

  @Field(() => String)
  @prop({ required: true })
  public course!: Ref<Course>

  @Field(() => String)
  @prop({ required: true })
  public classRoom!: Ref<ClassRoom>

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

export const CommentModel = getModelForClass(Comment, {
  schemaOptions: { timestamps: true },
})
