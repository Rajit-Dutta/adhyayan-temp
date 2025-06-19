// import mongoose from "mongoose";
// import { buffer } from "stream/consumers";

// const MONGODB_URI = process.env.MONGODB_URI!;

// if (!MONGODB_URI) {
//   throw new Error(
//     "Please define the MONGODB_URI environment variable inside .env.local"
//   );
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { connection: null, promise: null };
// }

// export async function connectToDatabase() {
//   if (cached.connection) {
//     return cached.connection;
//   }
//   if (!cached.promise) {
//     const opts = {
//       bufferCommands: false,
//       maxPoolSize: 10,
//     };

//     cached.promise = mongoose
//       .connect(MONGODB_URI, opts)
//       .then(() => mongoose.connection);
//   }

//   try {
//     cached.connection = await cached.promise;
//   } catch (error) {
//     cached.promise = null;
//     throw new Error(`Failed to connect to MongoDB: ${error}`);
//   }

//   return cached.connection;
// }
