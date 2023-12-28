import mongoose from 'mongoose';

async function connectToDb() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.DATABASE_URL}/${process.env.DATABASE_NAME}`
    );
    console.log(
      `Mongodb connected, host: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error('Error connecting to database: ', error);
    throw new Error(error);
  }
}

export default connectToDb;
