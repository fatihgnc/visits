const VISITS = 'visits'
const PORT = 8080

const express = require('express')
const redis = require('redis')

const app = express()
const client = redis.createClient({
    host: 'redis-server',
    port: 6379
})
client.set(VISITS, 0)

app.get('/', (req, res) => {
    client.get(VISITS, (err, visits) => {
        if (err) return res.send({
            success: false,
            error: JSON.stringify(err, null, 2)
        })

        res.send('Number of visits is ' + visits)
        client.set(VISITS, parseInt(visits) + 1)
    })
})

app.listen(PORT, console.log(`Listening on ${PORT}`))