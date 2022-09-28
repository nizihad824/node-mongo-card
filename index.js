const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
// const ObjectId = require('mongodb').ObjectId;
const ObjectID = require('mongodb').ObjectId

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

async function run(){
    try{
        await client.connect();
        const userCollection = client.db('foodExpress').collection('user');

        //get User
        app.get('/user',async(req,res)=>{
            const query={};
            const cursor =userCollection.find(query);
            const users =await cursor.toArray();
            res.send(users);

        })
        app.get('/user/:id',async(req,res)=>{
            const id =req.params.id;
            const query ={_id:ObjectID(id)};
            const result= await userCollection.findOne(query);
            res.send(result)
        })






        // POST user: add a new user

        app.post('/user',async(req,res) =>{
            const newUser=req.body;
            console.log('adding new user',newUser);
            const result =await userCollection.insertOne(newUser)
            res.send(result)
        });

        //delete a user

        app.delete('/user/:id',async(req,res) =>{
            const id =req.params.id;
            const query ={_id : ObjectID(id)};
            const result =await userCollection.deleteOne(query);
            res.send(result)
        })
    }
    finally{

    }

}
run().catch(console.dir)


/* client.connect(err => {
  const collection = client.db("test").collection("devices");
  console.log('db connected')
  // perform actions on the collection object
  client.close(); */




app.get('/',(req,res)=>{
    res.send('Running my node crud server')
});
app.listen(port,()=>{
    console.log('CRUD server is running');
})
