import mongoose from 'mongoose'

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'name is required'],
    minlength: [3, 'name must be at least 3 characters long'],
    unique: true,
    trim: true
  },
  number: {
    type: String,
    required: [true, 'number is required'],
    minlength: [8, 'number must be at least 8 characters long'],
    trim: true,
    validate: {
      validator: (value) => {
         return /^\d{2,3}-\d+$/.test(value);
      },
      message: props => `${props.value} is not a valid phone number`
    }
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