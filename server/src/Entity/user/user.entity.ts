/* eslint-disable import/no-cycle */
import { ObjectType, Field, ID } from 'type-graphql'
import { Prop, getModelForClass } from '@typegoose/typegoose'
import { ObjectId } from 'mongodb'

@ObjectType()
export class User {
  @Field(() => ID)
  readonly _id!: ObjectId

  @Field()
  @Prop({ trim: true, unique: true, required: true })
  name!: string

  @Field()
  @Prop({ trim: true, unique: true, required: true })
  email!: string

  @Prop({ trim: true, required: true })
  password!: string

  @Field()
  createdAt!: Date

  @Field()
  updatedAt!: Date
}

export const UserModel = getModelForClass(User, {
  schemaOptions: { timestamps: true },
})
