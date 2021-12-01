/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb'
import { InputType, Field, ID } from 'type-graphql'
import { ClassRoom } from './class.entity'

@InputType()
class ClassRoomInput implements Partial<ClassRoom> {
  @Field()
  name!: string

  @Field(() => [String], { nullable: true })
  course?: Array<ObjectId>

  @Field(() => [String], { nullable: true })
  tags!: Array<string>

  @Field()
  desc!: string

  @Field()
  image!: string

  @Field(() => [String], { nullable: true })
  members?: Array<ObjectId>

  @Field({ defaultValue: 'PUBLIC' })
  state?: 'PUBLIC' | 'PRIVATE'
}

@InputType()
export class ClassRoomUpdateInput implements Partial<ClassRoom> {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field({ nullable: true })
  name?: string

  @Field(() => [String], { nullable: true })
  tags?: Array<string>

  @Field({ nullable: true })
  desc?: string

  @Field({ nullable: true })
  image?: string

  @Field({ nullable: true })
  rate?: number

  @Field({ defaultValue: 'PUBLIC', nullable: true })
  state?: 'PUBLIC' | 'PRIVATE'

  @Field(() => [String], { nullable: true })
  course?: Array<ObjectId>

  @Field(() => [String], { nullable: true })
  members?: Array<ObjectId>
}

export default ClassRoomInput
