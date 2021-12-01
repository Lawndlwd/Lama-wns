/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */
import { InputType, Field, ID } from 'type-graphql'
import { User } from './user.entity'

@InputType()
export class UserInput implements Partial<User> {
  @Field(() => String)
  name!: string

  @Field()
  email!: string

  @Field()
  password!: string
}

@InputType()
export class UserLoginInput implements Partial<User> {
  @Field()
  email!: string

  @Field()
  password!: string
}
