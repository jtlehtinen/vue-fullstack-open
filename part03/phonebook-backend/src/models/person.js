import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [1, 'name must not be blank'],
    unique: true,
    trim: true
  },
  number: {
    type: String,
    required: [true, 'number is required'],
    minlength: [1, 'number must not be blank'],
    trim: true
  }
})

personSchema.set('toJSON', {
  transform: (_, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

export const Person = mongoose.model('Person', personSchema)