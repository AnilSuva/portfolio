import mongoose from 'mongoose';

let isConnected = false;

export async function connectDB(): Promise<void> {
  if (isConnected || mongoose.connection.readyState === 1) {
    return;
  }

  const rawUrl = process.env.MONGO_URL || process.env.MONGODB_URI || '';
  const mongoUrl = rawUrl.trim();

  if (!mongoUrl) {
    console.warn('⚠️ [MongoDB] MONGO_URL is not defined in backend/.env. Questions will not be stored.');
    return;
  }

  try {
    await mongoose.connect(mongoUrl, {
      serverSelectionTimeoutMS: 8000,
    });
    isConnected = true;
    console.log(`🍃 [MongoDB] Connected successfully to database: "${mongoose.connection.name || 'chatbot'}"`);
  } catch (error: any) {
    console.error('❌ [MongoDB] Connection error:', error?.message || error);
  }
}

mongoose.connection.on('disconnected', () => {
  isConnected = false;
  console.warn('⚠️ [MongoDB] Disconnected from server');
});

export default connectDB;
