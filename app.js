const express = require('express');
const app = express();
const routes = require('./routes/routes') 
var busboy = require('connect-busboy'); //middleware for form/file upload
const AWS = require('aws-sdk');
var path = require('path'); //used for file path
var fs = require('fs-extra');

const s3 = new AWS.S3({apiVersion: '2006-03-01'});

const PORT = process.env.PORT ? process.env.PORT : 3000;

// parse post data middleware
app.use(express.json())
app.use(express.static('public'));
app.use(busboy());


// Home
app.get('/', (req, res) => {
  res.status(200).send('Hello Fabrix')
});


app.use('/api/v1/3dmodels',routes)


app.get('/file-name/:fileName', (req, res) => {
  let fileName = req.params.fileName;
  console.log(fileName);
  let s3Stream = s3.getObject({Bucket: "3d-models-bucket", Key: fileName}).createReadStream();
  s3Stream.pipe(res)
});


app.listen(PORT, () => {
  console.log(`Listening on server ${PORT}...`)
})


