/* eslint-disable no-underscore-dangle */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { sign } from 'jsonwebtoken'
import { User } from '../Entity/user/user.entity'

export const createRevreshToken = (user: User): string => {
  return sign({ user }, process.env.REFRESH_TOKEN!, {
    expiresIn: '7d',
  })
}

export const createAccessToken = (user: User): string => {
  return sign({ user }, process.env.ACCESS_TOKEN!)
}
