/* eslint-disable import/no-cycle */
/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable max-classes-per-file */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { ObjectType, Field, Int, ID, Float } from 'type-graphql'
import {
  prop,
  getModelForClass,
  Severity,
  setGlobalOptions,
} from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'
import { ClassRoom } from '../classes/class.entity'
import { RefType } from '../../types'

setGlobalOptions({ options: { allowMixed: Severity.ALLOW } })

@ObjectType()
export class Steps {
  @Field()
  @prop({ trim: true, required: true })
  title!: string

  @Field({ nullable: true })
  @prop({ required: false })
  next?: number

  @Field({ nullable: false })
  @prop({ required: true })
  step!: number

  @Field({ nullable: true })
  @prop({ required: false })
  prev?: number

  @Field()
  @prop({ required: true })
  contentMd!: string

  @Field()
  @prop({ required: false })
  contentHtml?: string
}

@ObjectType()
export class Course {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  @prop({ trim: true, required: true })
  title!: string

  @Field(() => [Steps])
  @prop({ required: true })
  steps!: Array<Steps>

  @Field(() => Float)
  @prop({ required: false, default: 0 })
  rating?: number

  @Field(() => Float)
  @prop({ required: false, default: 0 })
  localRate?: number

  @Field(() => ClassRoom)
  @prop({ required: true, ref: ClassRoom })
  classRoom!: RefType<ClassRoom>

  @Field(() => Date)
  createdAt?: Date

  @Field(() => Date)
  updatedAt?: Date
}

export const CourseModel = getModelForClass(Course, {
  schemaOptions: { timestamps: true },
})
