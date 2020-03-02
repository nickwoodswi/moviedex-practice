const express = require('express')
const morgan = require('morgan')

const app = express()
const port = 3000

app.use(morgan('dev'))

app.use((req, res) => {
    res.send('Testing hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})