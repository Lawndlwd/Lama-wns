/* eslint-disable max-classes-per-file */
import { ObjectId } from 'mongodb'
import { InputType, Field, ID } from 'type-graphql'
import { Comment } from './comment.entity'

@InputType()
class CommentInput implements Partial<Comment> {
  @Field()
  content!: string

  @Field()
  step!: string

  @Field(() => String, { nullable: true })
  parent?: ObjectId

  @Field(() => String, { nullable: false })
  course!: ObjectId

  @Field(() => String, { nullable: false })
  classRoom!: ObjectId
}

@InputType()
export class CommentUpdateInput implements Partial<Comment> {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  content!: string
}

export default CommentInput
