const express = require('express')
const app = express()

const pgp = require("pg-promise")();
const db = pgp("postgres://postgres:password@localhost:5432/contactbook");
const contactBook = [];


const port = 3000


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { contactBook });
})

app.post('/add-contact', (req, res) => {
  console.log(req.body);
  db.none(`INSERT into contacts (name, email) VALUES ($1, $2);`, [
    req.body.name,
    req.body.email
  ])
  
  res.send({
    message: 'Contact added!',
    user: req.body
  })
})

app.delete('/delete-contact', (req, res) => {
  const id = req.body.id;
  console.log("We are deleting the contact with id: ", id)
  db.result("DELETE from contacts WHERE id = $1", [id]).then((result) => res.send(result));
})

app.get('/contact-book', (req, res) => {
  db.any("SELECT * from contacts").then((contacts) => res.json(contacts));
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})