const mongoose = require('mongoose')

const dbconnectkro =async () => {
  try {
   await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'blog'
   })

   console.log('mongodb connected');
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

module.exports = dbconnectkro
