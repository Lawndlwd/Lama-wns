/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import mongoose from 'mongoose'
import colors from 'colors'

const connectDB = async (): Promise<void> => {
  try {
    const uri = process.env.DB || 'mongodb://mongodb:27017'
    await mongoose.connect(uri, {
      useCreateIndex: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: false,
    })
    // const connect = await mongoose.createConnection(uri, {
    //   user: 'root',
    //   pass: 'example',
    // })
    console.log(colors.bgGreen.black('DB connected'))
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
export default connectDB
