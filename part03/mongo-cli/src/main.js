import dotenv from 'dotenv'
import mongoose from 'mongoose'

dotenv.config({ quiet: true })

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  number: { type: String, required: true },
})

const Person = mongoose.model('Person', personSchema)

async function runList() {
  const persons = await Person.find({})

  console.log('Phonebook:')
  for (const person of persons) {
    console.log(`  ${person.name} ${person.number}`)
  }
}

async function runCreate(name, number) {
  if (!name) throw new Error('name is required')
  if (!number) throw new Error('number is required')

  const person = new Person({ name, number })
  await person.save()
}

async function run (args) {
  const MONGODB_URI = process.env.MONGODB_URI

  if (!MONGODB_URI) {
    console.error('MONGODB_URI environment variable is not defined')
    return process.exit(1)
  }

  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect(MONGODB_URI)

    if (args.length === 0) {
      await runList()
    } else {
      const [name, number] = args
      await runCreate(name, number)
    }
  } catch (error) {
    console.error(error.message)
  } finally {
    await mongoose.connection.close()
  }
}

run(process.argv.slice(2))
