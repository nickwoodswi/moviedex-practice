//UUID: e2361bb0-58c7-11ea-8e2d-0242ac130003

require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const MOVIES = require('./movies.json')

console.log(process.env.API_TOKEN)

const app = express()
const port = 3000

app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

app.use(function validateBearerToken(req, res, next) {
    const bearerToken = process.env.API_TOKEN
    const authToken = req.get('Authorization')

    console.log(bearerToken)

    if (!authToken || authToken.split(' ')[1] !== bearerToken) {
        return res.status(401).json({ error: 'Unauthorized request' })
    }
    // not seeing code pause here...
    // move to the next middleware
    next() 
})

app.get('/movie', function handleGetMovie(req, res) {
    let response = MOVIES

    //filter our movies by genre if genre query param is present

    if (req.query.genre) {
        response = response.filter(movie => 
            //case insensitive searching
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
        )
    }

    if (req.query.country) {
        response = response.filter(movie =>
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
        )
    }

    if (req.query.avg_vote) {
        response = response.filter(movie => 
            movie.avg_vote >= req.query.avg_vote
        )
    }

    res.json(response)
})

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${process.env.PORT || port}!`)
})