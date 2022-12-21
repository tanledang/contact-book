const express = require('express')
const app = express()
const port = 3000
let contactBook = [
];


app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.static('public'))


app.get('/', (req, res) => {
  res.render('index', { contactBook });
})

app.post('/add-contact', (req, res) => {
  console.log(req.body);
  contactBook.push(req.body);
  res.send({
    message: 'Contact added!',
    user: req.body
  })
})

app.delete('/delete-contact', (req, res) => {
  const id = req.body.id;
  const userToDelete = contactBook[id]
  console.log("User to delete:", userToDelete)
  contactBook.splice(id, 1);
  console.log(contactBook)
  res.send({
    message: "User succesfully deleted",
    user: userToDelete
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})