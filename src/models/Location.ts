import mongoose, { Schema, Document } from 'mongoose';

export interface ILocation extends Document {
  name: string;
  address: string;
  city: string;
  state: string;
  country: string;
  zipCode: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const LocationSchema = new Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },
  address: { 
    type: String, 
    required: true 
  },
  city: { 
    type: String, 
    required: true 
  },
  state: { 
    type: String, 
    required: true 
  },
  country: { 
    type: String, 
    required: true 
  },
  zipCode: { 
    type: String, 
    required: true 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  }
}, {
  timestamps: true
});

export const Location = mongoose.model<ILocation>('Location', LocationSchema);