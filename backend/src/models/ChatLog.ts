import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDeviceInfo {
  deviceType: string; // 'Mobile' | 'Tablet' | 'Desktop' | 'Unknown'
  os: string;         // 'Android' | 'iOS' | 'Windows' | 'macOS' | 'Linux' | etc.
  browser: string;    // 'Chrome' | 'Safari' | 'Edge' | 'Firefox' | etc.
  mobileModel: string;// 'iPhone', 'SM-S918B', etc.
  isMobile: boolean;
  screenResolution?: string;
  language?: string;
  timezone?: string;
  userAgent: string;
}

export interface INetworkInfo {
  ip: string;
  origin?: string;
  referer?: string;
}

export interface IChatLog {
  question: string;
  answer: string;
  model: string;
  deviceInfo: IDeviceInfo;
  networkInfo: INetworkInfo;
  durationMs: number;
  status: 'success' | 'error';
  errorMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

const ChatLogSchema = new Schema<IChatLog>(
  {
    question: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    answer: {
      type: String,
      default: '',
    },
    model: {
      type: String,
      default: 'unknown',
    },
    deviceInfo: {
      deviceType: { type: String, default: 'Unknown' },
      os: { type: String, default: 'Unknown' },
      browser: { type: String, default: 'Unknown' },
      mobileModel: { type: String, default: 'Unknown Device' },
      isMobile: { type: Boolean, default: false },
      screenResolution: { type: String, default: '' },
      language: { type: String, default: '' },
      timezone: { type: String, default: '' },
      userAgent: { type: String, default: '' },
    },
    networkInfo: {
      ip: { type: String, default: 'Unknown' },
      origin: { type: String, default: '' },
      referer: { type: String, default: '' },
    },
    durationMs: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: ['success', 'error'],
      default: 'success',
      index: true,
    },
    errorMessage: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
    collection: 'chat_logs',
  }
);

// Prevent re-compilation of model in dev / hot reloading environments
export const ChatLog: Model<IChatLog> =
  mongoose.models.ChatLog || mongoose.model<IChatLog>('ChatLog', ChatLogSchema);

export default ChatLog;
