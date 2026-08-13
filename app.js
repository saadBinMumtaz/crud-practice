const express = require('express');
const app = express();
const path = require('path');
const CarModel = require('./models/car');


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.get('/create', (req, res) => {
  res.render('index');
});

app.post('/create', async (req, res) => {
let {name, email, imageurl} = req.body;

let createdCar= await  CarModel.create({name, email, imageurl})
res.redirect('/read');
});

app.get('/read', async (req, res) => {
  let Cars = await CarModel.find();
  res.render('read', { Cars });
});


app.get('/delete/:id', async (req, res) => {
  let Cars = await CarModel.findOneAndDelete({ _id: req.params.id });
  res.redirect('/read');
});

app.get('/edit/:id', async (req, res) => {
  let Car = await CarModel.findOne({ _id: req.params.id });
  res.render('edit', { Car });
});

app.post('/update/:id', async (req, res) => {
  let { name, email, imageurl } = req.body;
  let updatedCar = await CarModel.findOneAndUpdate({ _id: req.params.id }, { name, email, imageurl }, { new: true });
  res.redirect('/read');
});

app.listen(3000);








// const CarModel = require('./Carmodel');


// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// app.get('/create', async (req, res) => {
//    let createdCar = await CarModel.create({
//     name: 'maddie',
//     Carname: 'maddoe',
//     email: 'maddoe@example.com'
//   });
//   res.send('Car created successfully!');
// });

// app.get('/update', async (req, res) => {
//    let updatedCar = await CarModel.findOneAndUpdate({
//    Carname:"johndoe"}, { name: 'Jane Doe' });
  
//   res.send(`Car updated successfully! ${updatedCar}`);
// });

// app.get('/read', async (req, res) => {
//   //  let allCars = await CarModel.findOne({ Carname: 'maddoe' });
//   //  let allCars = await CarModel.find({ Carname: 'maddoe' });
//    let allCars = await CarModel.find();
//   res.send(`All Cars: ${allCars}`);
// });

// app.get('/delete', async (req, res) => {
  
//    let delCars = await CarModel.findOneAndDelete({ Carname: 'maddoe' });
//   res.send(`Deleted Cars: ${delCars}`);
// });

// app.listen(3000);