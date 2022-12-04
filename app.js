const express = require('express');
const { userModels } = require('./models/userModels')
const app = express()
const path = require('path')

// const bcrypt = require('bcrypt')
const connection = require('./connection')
const model = require('./models/models')
const { callbackify } = require('util')
const router = express.Router();
// const userModels = require('./models/userModels')

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  const data = await userModels.find({}).exec();
  res.render('index', { user: data || '' })
  console.log(data);
});

app.get('/index', async(req,res) => {
  const data = await userModels.find({}).exec();
  res.render('index', { user: data || '' })
});

app.get('/register', async (req,res) => {
  const data = await userModels.find({}).exec();
  res.render('register', { user: data || '' });
});

app.post('/register', async (req,res) => {
  // const pw = await bcrypt.hash((req.body.pass).toString(), 10)
  userModels.create({
    userName: req.body.name,
    userMail: req.body.mail,
    userPass: req.body.pass
  })
  res.redirect('/')
});

app.get('/login', async (req,res) => {
  res.render('login')
})

app.get('/profile', async (req,res) => {
  res.render('profile')
})

app.post('/login', async(req, res) => {
  const user = await userModels.find({ userName: req.body.userName, userPass: req.body.pass }).exec();
  // const access = await userModels.findOne.compare({ userPass: req.body.userPas})

  if (!user) {
    return res.redirect('/')
  } else {
    // const isValid = await bcrypt.compare(req.body.password, user.password)
    const isValid = await userModels.findOne({ userPass: req.body.pass })
    if (!isValid) {
      console.log('Credentials Failed')
      return res.render('login')
      // return res.get(userModels.userName.findOne({ userName: req.body.name }));
    } else {
      return res.render('index', { user: user })
    }
  }

})

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

const dotenv = require('dotenv');
const envFound = dotenv.config({ path: './config/.env' });
if (envFound.error) {
  throw new Error('File .env not found.');
}

module.exports = {
  port: process.env.PORT || 4000,

  jwtSecretKey: process.env.JWT_SECRET_KEY || '',
};

app.listen(process.env.PORT, () => {
  console.log('http://localhost:4000')
})

