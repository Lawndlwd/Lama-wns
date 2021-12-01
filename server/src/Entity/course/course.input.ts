/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb'
import { InputType, Field, ID } from 'type-graphql'
import { Course } from './course.entity'

@InputType()
export class StepsInput {
  @Field()
  title!: string

  @Field({ nullable: true })
  next?: number

  @Field({ nullable: false })
  step!: number

  @Field({ nullable: true })
  prev?: number

  @Field()
  contentMd!: string

  @Field()
  contentHtml?: string
}

@InputType()
class CourseInput {
  @Field()
  title!: string

  @Field(() => [StepsInput])
  steps!: Array<StepsInput>

  @Field(() => String, { nullable: false })
  classRoom!: ObjectId
}

@InputType()
export class CourseUpdateInput implements Partial<Course> {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  title!: string

  @Field(() => [StepsInput])
  steps!: Array<StepsInput>
}

export default CourseInput
