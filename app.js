const express = require('express')
const app = express()


const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('postgres://contact_book_r445_user:sOqhbXceoHqDX7S34uW2OM7Po6UEY6wm@dpg-cf6sft9gp3jnt5g6h690-a/contact_book_r445');
const { Contact } = require('./models');

const contactBook = [];


const port = 3001


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'))

app.post('/add-contact', (req, res) => {
  console.log(req.body);
  Contact.create({ name: req.body.name, email: req.body.email}).then((result) => res.send(result))
})

app.delete('/delete-contact', (req, res) => {
  const id = req.body.id;
  console.log("We are deleting the contact with id: ", id)
  Contact.destroy({
    where: {
      id: req.body.id
    }
  }).then(res.status(200).send({message: `Contact with ${id} delted`}));
})

app.get('/contact-book', (req, res) => {
  Contact.findAll().then(results => res.send(results));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})