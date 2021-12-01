/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/return-await */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
// eslint-disable-next-line max-classes-per-file
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware,
} from 'type-graphql'
import { hash, compare } from 'bcryptjs'
import { UserModel, User } from '../Entity/user/user.entity'
import { IContext, isAuth } from '../middlewares/auth.middleware'
import { createAccessToken, createRevreshToken } from '../utils/auth'
import { UserInput, UserLoginInput } from '../Entity/user/user.input'

@ObjectType()
class LoginResponse {
  @Field()
  accessToken!: string
}
@ObjectType()
class RigesterResponse {
  @Field()
  accessToken!: string

  @Field()
  Ok!: boolean

  @Field()
  message!: string
}
@ObjectType()
class ILAMA_Response {
  @Field()
  ok!: boolean

  @Field()
  message!: string

  @Field()
  user!: User
}

@Resolver(() => User)
export class UserResolver {
  @Query(() => User, { nullable: true })
  @UseMiddleware(isAuth)
  async getUser(@Ctx() { payload }: IContext): Promise<User | null> {
    const id = payload!.user._id
    const user = await UserModel.findById(id)
    return user
  }

  @Mutation(() => RigesterResponse)
  async Register(
    @Arg('data') data: UserInput,
    @Ctx() ctx: IContext
  ): Promise<RigesterResponse> {
    const hashedPassword = await hash(data.password, 13)
    const isUser = await UserModel.findOne({ email: data.email })
    const isName = await UserModel.findOne({ name: data.name })

    if (isUser) {
      throw new Error('email exist')
    }

    if (isName) {
      throw new Error('username exist')
    }
    try {
      const user = await new UserModel({
        name: data.name,
        email: data.email,
        password: hashedPassword,
      })
      user.save()
      ctx.res.cookie('jid', createRevreshToken(user), {
        httpOnly: true,
      })

      return {
        accessToken: createAccessToken(user),
        Ok: true,
        message: 'seccessfully created',
      }
    } catch (err) {
      console.log(err)
      return {
        accessToken: '',
        Ok: false,
        message: `${err}`,
      }
    }
  }

  @Mutation(() => ILAMA_Response)
  @UseMiddleware(isAuth)
  async UpdateUser(
    @Ctx() { payload }: IContext,
    @Arg('name') name?: string,
    @Arg('email') email?: string
  ): Promise<ILAMA_Response> {
    if (!payload) {
      throw new Error('Not authenticated')
    }
    const id = payload.user._id
    try {
      const user = await UserModel.findById(id)
      if (!user) throw new Error('user NotFound')
      if (email) {
        const isEmailExist = await UserModel.findOne({ email })
        if (isEmailExist) {
          throw new Error('Email already exist')
        }
        user.email = email
      }
      if (name) {
        const isNameExist = await UserModel.findOne({ name })
        if (isNameExist) {
          throw new Error('username already exist')
        }
        user.name = name
      }
      await user.save()
      return { ok: true, message: 'update seccessfully', user }
    } catch (err) {
      console.log(err)
      return { ok: false, message: `${err}`, user: {} as User }
    }
  }

  @Mutation(() => RigesterResponse)
  async Login(
    @Arg('data') data: UserLoginInput,
    @Ctx() { res }: IContext
  ): Promise<RigesterResponse> {
    const user = await UserModel.findOne({ email: data.email })
    if (!user) {
      throw new Error('Could not find user')
    }
    console.log(user)

    const verify = await compare(data.password, user.password)

    if (!verify) {
      throw new Error('Bad password')
    }
    res.cookie('jid', createRevreshToken(user), {
      httpOnly: true,
    })

    return {
      accessToken: createAccessToken(user),
      Ok: true,
      message: 'seccessfully created',
    }
  }
}
