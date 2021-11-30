const express = require('express')
const cors = require('cors')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const ObjectId= require('mongodb').ObjectId
const app = express()
const port =process.env.PORT || 5000


app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.amixw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
      await client.connect();
      const database = client.db("MyPortfolio");
      const Projects = database.collection("Projects");
    
    
      app.get(`/projects`,async(req,res)=>{
          const cursor=Projects.find({})
          const result=await cursor.toArray()
          res.json(result)
      })

        app.get(`/projects/:id`,async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)}
            const result=await Projects.findOne(query)
            res.json(result)
        })
 
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);









app.get('/', (req, res) => {
  res.send('portfolio server start alhamdolillah')
})


app.listen(port, () => {
  console.log(`portfolio server start alhamdolillah`,port)
})