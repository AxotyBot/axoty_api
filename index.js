const MongoClient = require('mongodb').MongoClient
const express = require("express")


const app = express()

const connectionString = require(__dirname + "/config.json").conn_string;

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}).then(client => {
    console.log('Connected to Database')


    app.get("/random", (req, res) => {
        var type = req.query.type
        console.log("Someone requested Axolotl " + type + ".")


        const db = client.db('Development')

        db.collection(type).find().toArray()
            .then(results => {
                var max = results.length
                res.send(results[Math.floor(Math.random() * max)])
            })
            .catch(error => console.error(error))
    })

    app.listen(3000, () => {
        console.log("API Up and running")
    })

})
    .catch(error => console.error(error))

