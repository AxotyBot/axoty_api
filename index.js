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
        var ip = req.ip

        var reobj = { date: new Date(), ip: req.ip }

        const db = client.db('Public')

        console.log("[REQ] Someone requested Axolotl " + type + ". " + "His IP Adress is: " + ip)
        db.collection('api').insertOne(reobj, function (err, res) {
            if (err) throw err;
            console.log("Saved REQ to database");
            return
        });


        db.collection(type).find().toArray()
            .then(results => {
                var max = results.length
                res.send(results[Math.floor(Math.random() * max)])
                return
            })
            .catch(error => console.error(error))

    })

    app.get("/user", (req, res) => {
        const Mongo = require("mongodb")

        const dbo = client.db('Public')
        var id = req.query.id

        dbo.collection("users").find({ "_id": id.toString() }).toArray(function (err, result) {
            if (err) throw err
            res.send(result)
            return
        })

    })
    app.listen(3000, () => {
        console.log("API Up and running")
    })

})
    .catch(error => console.error(error))

