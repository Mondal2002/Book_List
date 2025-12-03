import mongoose from "mongoose"
const BookSchema=mongoose.Schema({
    Book_name : String,
    Author: String,
    Published_Year:Number
}

)
const loginSchema=mongoose.Schema({
  loginId: {
    type: String,
    required: true,
    unique: true,   
    trim: true
  },

  password: {
    type: String,    
  },
  IsActive:{
    type:Boolean,
  }
})
const adminSchema=mongoose.Schema({
  adminId: {
    type: String,
    required: true,
    unique: true,   
    trim: true
  },

  password: {
    type: String,    
  },
  IsActive:{
    type:Boolean,
  }
})
export const book=mongoose.model('books',BookSchema);
export const User=mongoose.model('Users',loginSchema);
export const admin=mongoose.model('Admin',adminSchema);