const express = require('express')
const bcrypt = require('bcrypt')
const { userModels } = require('./models/userModels')
const app = express()
const path = require('path')
const connection = require('./connection')
const model = require('./models/models')
const { callbackify } = require('util')
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

app.get('/signup', async (req,res) => {
  const data = await userModels.find({}).exec();
  console.log(data);
  res.render('signup', { user: data || '' });
})

try{userModels.find({}).exec()
  userModels.create({
userName: "Surya",
userMail: "hans@gmail.com",
userPass: "12345"
  }
)} catch (error) {
  if(error){
    res.redirect('/index')
    console.log('Error found, User Cannot be Registered')
  } else{
    res.redirect('/index')
    console.log('Success!')
}
}

app.post('/signup', async(req, res) => {
  const pw = await bcrypt.hash((req.body.userPass).toString(), 10)
  userModels.find({}).exec();
  userModels.create({
    userName: req.body.userName,
    userMail: req.body.userMail,
    userPass: pw,
    });

  res.redirect('/');
  // res.render('/index')
  
  // return Array.object;
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
  const user = await userModels.find({ userName: req.body.userName }).exec();
  Array.from(user).forEach((usr) =>{
  })


  if (!user) {
    return res.redirect('/')
  } else {
    const isValid = await bcrypt.compare(req.body.password, user.password)
    if (!isValid) {
      return res.redirect('/')
    } else {
      return res.render('index', { user })

    }
  }

})


app.listen(5050, () => {
  console.log('http://localhost:5050')
})