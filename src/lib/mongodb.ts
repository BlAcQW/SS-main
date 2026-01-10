import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

// Extend global type for mongoose caching
declare global {
  // eslint-disable-next-line no-var
  var mongoose: {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
  } | undefined;
}

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
  
  // Check if we have an active connection
  if (cached.conn && mongoose.connection.readyState === 1) {
    return cached.conn;
  }

  // If connection is connecting (readyState === 2), wait for existing promise
  if (cached.promise && mongoose.connection.readyState === 2) {
    try {
      cached.conn = await cached.promise;
      return cached.conn;
    } catch (e) {
      cached.promise = null;
      cached.conn = null;
    }
  }

  // Reset if disconnected or error state
  if (mongoose.connection.readyState === 0 || mongoose.connection.readyState === 3) {
    cached.promise = null;
    cached.conn = null;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 10000, // 10 second timeout for server selection
      socketTimeoutMS: 45000, // 45 second timeout for operations
      connectTimeoutMS: 10000, // 10 second connection timeout
      maxPoolSize: 10, // Maintain up to 10 socket connections
      minPoolSize: 1, // Maintain at least 1 socket connection
      retryWrites: true,
      retryReads: true,
    };
    
    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
        console.log('MongoDB connected successfully');
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
    cached.conn = null;
    console.error("========================================================================");
    console.error("ERROR: Failed to connect to MongoDB.", e);
    console.error("Please check your MONGODB_URI and ensure the database is accessible.");
    console.error("========================================================================");
    return null; // Return null instead of throwing to prevent app crash
  }
  
  return cached.conn;
}

export default dbConnect;
