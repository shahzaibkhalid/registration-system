require('dotenv').config()
const express = require('express');
const path = require('path');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
let app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../../../build')));

app.get('/api', (req, res)=> {
  let username = req.query.username;
  MongoClient.connect(process.env.URL, (err, db)=> {
    if(err) throw err;
    db.collection('students').find({'username': username}).toArray((err, result)=> {
        res.send(result);
        db.close();
    })
  })
});

app.post('/api', (req, res)=> {
  let username = req.body.username, password = req.body.password, name = req.body.name;
  MongoClient.connect(process.env.URL, (err, db) => {
    if(err) throw err;
    db.collection('students').insertOne({"username": username, "password": password, "name": name}, (err, result)=> {
      if(err) throw err;
      res.send('Your account is successfully created. Go to home and Sign In.');
      db.close();
    })
  });
})

app.delete('/api', (req, res)=> {
  let username = req.query.username;
  MongoClient.connect(process.env.URL, (err, db)=> {
    if(err) throw err;
    db.collection('students').deleteOne({"username": username}, (err, result)=> {
      if(err) throw err;
      res.send('Your account is successfully deleted.');
      db.close();
    })
  })
})

app.put('/api', (req, res)=> {
  let username = req.body.username, updateName = req.body.updateName;
  MongoClient.connect(process.env.URL, (err, db)=> {
    if(err) throw err;
    db.collection('students').updateOne({"username": username}, {$set: {"name": updateName}}, (err, result)=> {
      res.send('Name is updated.');
      db.close();
    })
  });
});


app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../../build', 'index.html'));
});


app.listen(port, _=> console.log(`The server is listening on port ${port}`));