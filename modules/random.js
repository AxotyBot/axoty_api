exports.random = function (req, res, client) {
    const db = client.db('Development')
    db.collection('data').find().toArray()
        .then(results => {
            var max = results.length
            res.send(results[Math.floor(Math.random() * max)])
        })
        .catch(error => console.error(error))
}