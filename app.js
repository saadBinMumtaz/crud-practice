const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/create', (req, res) => {
  res.render('index');
});

app.post('/create', async (req, res) => {
let {name, email, imageurl} = req.body;

let createdUser= await  userModel.create({name, email, imageurl})
res.redirect('/read');
});

app.get('/read', async (req, res) => {
  let users = await userModel.find();
  res.render('read', { users });
});


app.get('/delete/:id', async (req, res) => {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect('/read');
});

app.get('/edit/:id', async (req, res) => {
  let user = await userModel.findOne({ _id: req.params.id });
  res.render('edit', { user });
});

app.post('/update/:id', async (req, res) => {
  let { name, email, imageurl } = req.body;
  let updatedUser = await userModel.findOneAndUpdate({ _id: req.params.id }, { name, email, imageurl }, { new: true });
  res.redirect('/read');
});

app.listen(3000);








// const userModel = require('./usermodel');


// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.get('/create', async (req, res) => {
//    let createdUser = await userModel.create({
//     name: 'maddie',
//     username: 'maddoe',
//     email: 'maddoe@example.com'
//   });
//   res.send('User created successfully!');
// });

// app.get('/update', async (req, res) => {
//    let updatedUser = await userModel.findOneAndUpdate({
//    username:"johndoe"}, { name: 'Jane Doe' });
  
//   res.send(`User updated successfully! ${updatedUser}`);
// });

// app.get('/read', async (req, res) => {
//   //  let allUsers = await userModel.findOne({ username: 'maddoe' });
//   //  let allUsers = await userModel.find({ username: 'maddoe' });
//    let allUsers = await userModel.find();
//   res.send(`All users: ${allUsers}`);
// });

// app.get('/delete', async (req, res) => {
  
//    let delUsers = await userModel.findOneAndDelete({ username: 'maddoe' });
//   res.send(`Deleted users: ${delUsers}`);
// });

// app.listen(3000);