const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const bodyParser = require("body-parser");
const express = require('express') 
require('dotenv').config()
const cors = require('cors')
const app = express() 
app.use(cors()) 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT||3000

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);


// coffestore
// 7tKS93sZkwZH5zMP


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.6plf0.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
 
console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
const coffeeCollection = client.db('coffeeDB').collection('coffee')



// delete 
app.delete('/coffee/:id',async(req,res)=>{
    const id = req.params.id
    const quarry = {_id: new ObjectId(id)}
    const result = await coffeeCollection.deleteOne(quarry)
    res.send(result)
})


// update
app.put('/coffee/:id',async(req,res)=>{
    const id = req.params.id
    const newCoffee = req.body
    const quarry = {_id: new ObjectId(id)}
    // const options = { ordered: true };
    const updateCoffe = {
        $set: {
            name:  newCoffee.name,
       supplier:  newCoffee.supplier,
       categoty:  newCoffee.categoty,
       chef:  newCoffee.chef,
       teste:  newCoffee.teste,
       photo:  newCoffee.photo,
       details:  newCoffee.details,
        },
      };
      const result = await  coffeeCollection.findOne(filter, updateCoffe,);
    res.send(result)
})

  // accept data from client side read data

app.get('/coffee',async(req,res)=>{
    const curser =  coffeeCollection.find()
const result = await curser.toArray()
res.send(result)
})


    // accept data from client side
    app.post('/coffee',async ( req,res) => {
    const newCoffee = req.body
    console.log(newCoffee);
    const result = await coffeeCollection.insertOne(newCoffee,);
    res.send(result)
    
    })

    
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send(' making coiffee server is running  ')
})

app.listen(port, () => {
  console.log(` coffees running server on prt${port}`)
})