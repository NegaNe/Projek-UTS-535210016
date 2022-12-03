const express = require('express')
const bcrypt = require('bcrypt')
const { userModels } = require('./models/userModels')
const app = express()
const path = require('path')
const connection = require('./connection')
const model = require('./models/models')
const { callbackify } = require('util')
const router = express.Router();
// const userModels = require('./models/userModels')

app.use(express.json())
app.use(express.urlencoded({ extended:false }))
app.set('view engine', 'ejs')
// app.use(express.static('public'))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', async (req, res) => {
  const data = await userModels.find({}).exec();
  console.log(data)

  res.render('index', { student: data || '' })
})

app.get('/register', async (req,res) => {
  const data = await userModels.find({}).exec();
  console.log(data);
  res.render('register', { user: data || '' });
})


app.post('/register', async (req,res) => {
  // const pw = await bcrypt.hash((req.body.pass).toString(), 10)
  userModels.create({
    userName: req.body.name,
    userMail: req.body.mail,
    userPass: req.body.pass
  })
  res.redirect('/')
})

app.get('/index', (req,res) => {
  res.render('index')
})

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
      return res.render('index', { user })

    }
  }

})


app.listen(5050, () => {
  console.log('http://localhost:5050')
})