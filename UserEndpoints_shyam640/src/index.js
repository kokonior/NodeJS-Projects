const express = require('express');
require('./db/mongoose');
const authmiddleware = require('./middleware/authmiddleware');
const User = require('./model/usermodel');

const app = new express();

const port = process.env.PORT;

app.use(express.json());

// Creating user
app.post('/users',async (req,res) => {
   const user = new User(req.body);
   try{
      await user.save();
      const token = await user.generateAuthToken();
      console.log(user);
      console.log(token);
      res.status(201).send({user,token});
   }catch(e){
      res.status(400).send(e);
   }
});

// Logging in user
app.post('/users/login',async (req,res) => {
   try{
      const user = await User.findByCredentials(req.body.email , req.body.password);
      const token = await user.generateAuthToken();
      res.send({user,token});
   }catch(e){
      res.status(400).send();
   }
});

// Updating user details
app.patch('/users/me',authmiddleware,async (req,res) => {
   const updates = Object.keys(req.body);
   const allowedUpdates = ['name','email','password','age'];
   const isValidOperation = updates.every((update) => allowedUpdates.includes(update));
   if(!isValidOperation){
      return res.status(400).send({error : 'Invalid Update !'});
   }
   try{
      updates.forEach((update) => req.user[update] = req.body[update]);
      await req.user.save();
      res.send(req.user);
   }catch(e){
      res.status(400).send(e);
   }
});


// Deleting user
app.delete('/users/me',authmiddleware,async (req,res) => {
   try{
      req.user.remove();
      res.send(user);
   }catch(e){
      res.status(500).send(e);
   }
});

// 
app.post('/users/logout',authmiddleware,async (req,res) => {
   try{
      req.user.tokens = req.user.tokens.filter((token) => {
         return token.token !== req.token;
      });
      await req.user.save();
      res.send();
   }catch(e){
      res.status(500).send();
   }
});


app.post('/users/logoutAll',authmiddleware, async (req,res) => {
   try{
      req.user.tokens = [];
      await req.user.save();
      res.send();
   }catch(e){
      res.status(500).send();
   }
});

app.listen(port, () => {
   console.log('Server running on port ' + port);
});