const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const app =express();
const port =process.env.PORT ||5000;
//use middleware
app.use(cors());
app.use(express.json())

//dbuser1
//RvuAyrlFNqBlRuCG



const uri = "mongodb+srv://dbuser1:RvuAyrlFNqBlRuCG@cluster0.3jrjtso.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('db connected')
  // perform actions on the collection object
  client.close();
});



app.get('/',(req,res)=>{
    res.send('Running my node crud server')
});
app.listen(port,()=>{
    console.log('CRUD server is running');
})
