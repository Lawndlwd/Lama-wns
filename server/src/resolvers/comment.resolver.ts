/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {
  Mutation,
  Arg,
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
  FieldResolver,
  Root,
} from 'type-graphql'
import { sendSSE, sendSSEToAll } from '../sse/sseManager'
import { CourseModel } from '../Entity/course/course.entity'
import { Comment, CommentModel } from '../Entity/comments/comment.entity'
import { IContext, isAuth } from '../middlewares/auth.middleware'
import CommentInput, {
  CommentUpdateInput,
} from '../Entity/comments/comment.input'
import { IdeleteResponse } from './course.resolver'
import { User, UserModel } from '../Entity/user/user.entity'

@Resolver(() => Comment)
class CommentResolver {
  @Query(() => [Comment])
  async getComments(
    @Arg('step') step: string,
    @Arg('course') course: string
  ): Promise<Comment[]> {
    const comments = CommentModel.find({ course, step, parent: null })
    if (!comments) return []
    return comments
  }

  @Query(() => [Comment])
  async getChildComments(@Arg('id') id: string): Promise<Comment[]> {
    const comments = CommentModel.find({ parent: id })
    if (!comments) return []
    return comments
  }

  @Query(() => Comment)
  async getOneComment(@Arg('id') id: string): Promise<Comment | null> {
    const comment = CommentModel.findById(id)
    if (!comment) return null
    return comment
  }

  @Mutation(() => Comment)
  @UseMiddleware(isAuth)
  async createComment(
    @Ctx() ctx: IContext,
    @Arg('data') data: CommentInput
  ): Promise<Comment | null> {
    const { user } = ctx.payload!
    const course = await CourseModel.findById(data.course)
    if (!course) throw new Error('course not found')

    const comment = await new CommentModel({ ...data, commenter: user._id })
    console.log(comment)
    await comment.save()
    if (data.content.includes('@')) {
      const name = data.content.split('@')[1].split(' ')[0]
      const mention = await UserModel.findOne({ name })
      console.log(mention, name)
      if (mention) {
        sendSSE(mention._id.toString(), {
          type: 'commentReply',
          message: comment,
        })
      }
    }

    course.save()
    return comment
  }

  @FieldResolver()
  async commenter(@Root() comment: Comment): Promise<User> {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return (await UserModel.findById(comment.commenter))!
  }

  @Mutation(() => Comment)
  async updateComment(
    @Arg('data') data: CommentUpdateInput
  ): Promise<Comment | null> {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      data._id,
      data,
      {
        new: true,
      }
    )
    return updatedComment
  }

  @Mutation(() => IdeleteResponse)
  async deleteComment(@Arg('id') id: string): Promise<IdeleteResponse> {
    const comment = CommentModel.findById(id)
    const deletedComment = await comment.deleteOne()
    return deletedComment
  }
}

export default CommentResolver
