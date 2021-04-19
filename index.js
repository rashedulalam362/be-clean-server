

const express = require('express')
const app = express();
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId
const cors=require('cors');
const bodyParser=require('body-parser')
require('dotenv').config();

const port =process.env.PORT || 5055;
console.log(process.env.DB_USER);
app.use(cors());

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello Working !!!')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hiyqx.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
console.log('err',err);
  const serviceCollection = client.db("cleanerhub").collection("cleanerhub123");
  const reviewCollection=client.db("cleanerhub").collection("reviews");
  const orderCollection=client.db("cleanerhub").collection("orders");
  console.log('db conneted ');
   app.post('/addService',(req,res)=>{

    const newService=req.body;
    console.log('adding new book', newService);
    serviceCollection.insertOne(newService)
    .then(result=>{
      console.log('insertedCount',result.insertedCount);
      res.send(result.insertedCount >0)
    })
  })
 
  app.get('/service/:id', (req, res) => {
    console.log(req.params.id);
    serviceCollection.find({_id:ObjectId(req.params.id)})
    .toArray((err,items)=>{
      res.send(items)
      console.log('from database',items);
    })
  })

  app.get('/services', (req, res) => {
    serviceCollection.find()
    .toArray((err,items)=>{
      res.send(items)
      console.log('from database',items);
    })
  })
  app.get('/reviews', (req, res) => {
    reviewCollection.find()
    .toArray((err,items)=>{
      res.send(items)
      console.log('from database',items);
    })
  })
  
  app.post('/addReview',(req,res)=>{

    const newReview=req.body;
    console.log('adding new book', newReview);
    reviewCollection.insertOne(newReview)
    .then(result=>{
      console.log('insertedCount',result.insertedCount);
      res.send(result.insertedCount >0)
    })
  })
  
  app.post('/addOrder',(req,res)=>{

    const newOrder=req.body;
    console.log('adding new book', newOrder);
    orderCollection.insertOne(newOrder)
    .then(result=>{
      console.log('insertedCount',result.insertedCount);
      res.send(result.insertedCount >0)
    })
  })

 

});



app.listen(process.env.PORT||port)
  
