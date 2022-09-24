const VISITS = 'visits'

const express = require('express')
const redis = require('redis')


const app = express()
const client = redis.createClient()
client.set(VISITS, 0)

app.get('/', (req, res) => {
    client.get(VISITS, (err, visits) => {
        res.send('Number of visits is ' + visits)
        client.set(VISITS, +(visits+1))
    })
})

app.listen(8080, console.log('Listening 8080'))