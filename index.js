const express = require('express');
const Users = require('./data/db.js')

const server = express();

 server.get('/', (req, res) => {
   res.send('Hello World');
 });

 server.get('/api/users', (req, res)=> {
   Users.find()
   .then(users => {
     res.status(200).json(users);
   })
   .catch(err => {
     console.log(err);
     res
     .status(500).json( { errorMessage: "The users information could not be retrieved." })
   })
 })

 server.get('/api/users/:id', (req, res) => {
   const id = req.params.id;
   Users.findById(id) 
   .then(user => {
     if (user) {
      res.status(200).json(user);
     }
     else {
       res.status(404).json({ message: "The user with the specified ID does not exist." 
       })

     }
     
   })
   .catch(err => {
     console.log(err);
     res.status(500).json( { errorMessage: "The user information could not be retrieved." } )
   })
 })

server.post('/api/users', (req, res) => {
  const userData = req.body;
  Users.insert(userData)
  .then(user => {
    res.status(201).json(hub);
  })
  .catch(error => {
    console.log(error);
    res.status(400).json( { errorMessage: "Please provide name and bio for the user." } )
  });
});

 server.delete('/api/users/:id', (req, res) => {
   const id = req.params.id;
   Users.remove(id)
   .then(deleted => {
     res.status(200). json(deleted);
   })
   .catch(error => {
     console.log(error);
     res.status(404).json( { message: "The user with the specified ID does not exist." }
     )
   })
 })

 server.listen(8000, () => console.log('API Running on port 8000'));

