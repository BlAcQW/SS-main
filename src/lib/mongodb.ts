
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (!MONGODB_URI) {
    console.error("========================================================================");
    console.error("ERROR: MONGODB_URI is not defined in your environment variables.");
    console.error("Please create a .env.local file in the root of your project and add:");
    console.error("MONGODB_URI=your_mongodb_connection_string");
    console.error("Database connection will be skipped.");
    console.error("========================================================================");
    return null;
  }
  
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    
    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        return mongoose;
      });
    } catch (e) {
        console.error("========================================================================");
        console.error("ERROR: Initial Mongoose connection failed.", e);
        console.error("This is likely due to an incorrect MONGODB_URI or network issue.");
        console.error("========================================================================");
        cached.promise = null;
        return null;
    }
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("========================================================================");
    console.error("ERROR: Failed to connect to MongoDB.", e);
    console.error("Please check your MONGODB_URI and ensure the database is accessible.");
    console.error("========================================================================");
    return null; // Return null instead of throwing to prevent app crash
  }
  
  return cached.conn;
}

export default dbConnect;
