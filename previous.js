const express = require('express')
const port = process.env.PORT || 3200;

const app = express()
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');

// using post method for midlleware  
app.use(cors())

// using for post method require body parser working
app.use(express.json());

// user and password mongoDb
//user:testing - server
// pass:cLeEN8HRe9fGvMMX

const uri = "mongodb+srv://testing-server:cLeEN8HRe9fGvMMX@cluster0.9hokh.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {

        await client.connect();
        const database = client.db("testing_server")
        const userCollection = database.collection("users");

        app.post('/user', async (req, res) => {
            const newUser = req.body;

            console.log("got new user", req.body);
            const result = await userCollection.insertOne(newUser);
            console.log("response", result);
            res.json(result)
            // console.log("added user" ,result);
            //              res.json(result);
        })



    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir)

// const users = [
//     { id: 0, name: "a", type: "letter", role: "small-letter" },
//     { id: 1, name: "b", type: "letter", role: "small-letter" },
//     { id: 2, name: "c", type: "letter", role: "small-letter" },
//     { id: 3, name: "d", type: "letter", role: "small-letter" },
// ]

// app.post("/user", (req, res) => {
//     const newUser = req.body
//     console.log("hit post",newUser);

//     if (newUser?.name) {
//         newUser.id = users.length
//         users.push(newUser)
//     }
//     res.json(users);




// })

app.get('/user', (req, res) => {
    res.send(res)
    console.log("Request for Query ", res);

})

app.listen(port, () => {
    console.log("The Server Runnig on Port", port)
}) 