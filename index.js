const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors');
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ne473.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




async function run() {
    try {
        await client.connect();
        const database = client.db('hacks');
        const userData = database.collection('users');
        const adminData = database.collection('admin');


        // Post User Data
        app.post('/users', async (req, res) => {
            const user = req.body
            const result = await userData.insertOne(user);
            res.json(result);
        });

        // Get User Data
        app.get('/users', async (req, res) => {
            const allFinding = userData.find({});
            const result = await allFinding.toArray();
            res.send(result);
        });

        // Get Users 
        app.get('/admin', async (req, res) => {
            const adminFind = adminData.find({});
            const result = await adminFind.toArray();
            res.send(result);
        })

        // Delete Users
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const result = await adminData.deleteOne(query)
            res.json(result)
        })






    } finally {
        // Ensures that the client will close when you finish/error
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hallo world')
});

app.listen(port, () => {
    console.log('Running Server', { port });
});