const express = require("express");
const port = process.env.PORT || 3200;
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const ObjectId = require('mongodb').ObjectId;


// middlware
const cors = require("cors");
app.use(cors());

// body parser
app.use(express.json())


const uri = "mongodb+srv://testing-server:cLeEN8HRe9fGvMMX@cluster0.9hokh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        await client.connect();
        const userCollection = client.db("testi-server-2")?.collection('user');

        app.get('/adduser', async (req, res) => {

            const cursor = userCollection.find({});
            const users = await cursor.toArray();
            // 
            res.json(users)


        })


        app.post("/adduser", async (req, res) => {
            const newUser = req.body
            console.log(req.body);
            const result = await userCollection.insertOne(newUser)
            res.json(result);
        })

        app.delete("/adduser/:id", async (req, res) => {
            const id = req.params.id
            console.log("delete",id)
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query)
            res.send(result);
        })

        // update url
        app.get("/adduser/update/:id", async (req, res) => {
            const id = req.params.id;
            // console.log("hit update");

            const query = { _id: ObjectId(id) }
            const user = await userCollection.findOne(query)
            res.json(user)

        })
        //  upsert ||  rename user method 
        app.put("/update/:id", async (req, res) => {
            const updateUser = req.body
            const id = req.params.id
            console.log("this is req body ",id,updateUser);
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
        
            const updateDoc = {
                $set: {
                    name: updateUser.name,
                    email: updateUser.email
                }
            }
            const result = await userCollection.updateOne(filter,updateDoc,options)
            console.log("hit put ", result);
            res.json(result)

        })

    }


    finally {

    }


}
run().catch(err=> console.log(err))






app.get("/", async (req, res) => {
  res.json({Messeage: "Hellow from Crud Server"})  
})
app.get("/test", async (req, res) => {
  res.json({Messeage: "Hellow from Crud Server with test route"})  
})

app.listen(port, () => {
    console.log("Run on PORT", port)
})