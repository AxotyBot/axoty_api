const MongoClient = require('mongodb').MongoClient
const express = require("express")
const wl = require(__dirname + "/config/whitelist.json")

console.log(" █████╗ ██╗  ██╗ ██████╗ ████████╗██╗   ██╗     █████╗ ██████╗ ██╗")
console.log("██╔══██╗╚██╗██╔╝██╔═══██╗╚══██╔══╝╚██╗ ██╔╝    ██╔══██╗██╔══██╗██║")
console.log("███████║ ╚███╔╝ ██║   ██║   ██║    ╚████╔╝     ███████║██████╔╝██║")
console.log("██╔══██║ ██╔██╗ ██║   ██║   ██║     ╚██╔╝      ██╔══██║██╔═══╝ ██║")
console.log("██║  ██║██╔╝ ██╗╚██████╔╝   ██║      ██║       ██║  ██║██║     ██║")
console.log("╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝    ╚═╝      ╚═╝       ╚═╝  ╚═╝╚═╝     ╚═╝")

const app = express()

const connectionString = require(__dirname + "/config.json").conn_string;

MongoClient.connect(connectionString, {
    useUnifiedTopology: true
}).then(client => {
    console.log('[Server] Connected to Database')


    app.get("/random", (req, res) => {
        var type = req.query.type
        var ip = req.ip

        if (type in wl) {
            var reobj = { date: new Date(), ip: ip, type: type }

            const db = client.db('Public')

            console.log("[Server] " + ip + " requested" + type)
            db.collection('api').insertOne(reobj, function (err, res) {
                if (err) throw err;
                console.log("[Server] Saved REQ to database");
                return
            });


            db.collection(type).find().toArray()
                .then(results => {
                    var max = results.length
                    res.send(results[Math.floor(Math.random() * max)])
                    return
                })
                .catch(error => console.error(error))
        } else {
            res.send("Type unavaible")
        }
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
    app.listen(80, () => {
        console.log("[Server] Started API Server UP")

    })

})
    .catch(error => console.error(error))

