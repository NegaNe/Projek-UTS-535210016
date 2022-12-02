const { name } = require('ejs');
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  userName: String,
  userMail: String,
  userPass: String
})


const userModels = mongoose.model('user', userSchema)
  
userModels();
userSchema;

// console.log(userModels());
// console.log(userSchema);
// module.exports = mongoose.model("user", userSchema);
console.log('userModels is On')


// module.exports = mongoose.model("user", userSchema);
module.exports = {
  userModels
}

