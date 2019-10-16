const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));     // bodyParser can parse URl's as well

// middleware for allowing Client on port=4200 to communicate w/ Server on port=3000
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
});

// middleware for POSTing posts
app.post('/api/posts', (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully!'
  });
});

// middleware for GETting posts
app.use('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'wdfk374dsa',
      title: 'First server-side post',
      content: 'This is coming from the server'
    },
    { id: 'vnkl8954v',
      title: 'Second server-side post',
      content: 'This is coming from the server!!'
    }
  ];
  res.status(200).json({
    message: 'Posts fetched successfully!',
    posts: posts
  });
});

module.exports = app;     // export JS file to server
