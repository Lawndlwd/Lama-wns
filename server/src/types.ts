import { Ref } from '@typegoose/typegoose'
import { Types } from 'mongoose'

export type RefType<T> = Ref<T | (Types.ObjectId & { _id: Types.ObjectId })>
// export type Ref<
//   R,
//   T extends RefType = R extends { _id?: RefType }
//     ? R['_id']
//     : mongoose.Types.ObjectId
// > = R | T
