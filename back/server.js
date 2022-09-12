const express = require('express')
const cors = require('cors')
const helmet = require('helmet');
const expressSanitizer = require('express-sanitizer');
let DB = require('./config/dbConfig')

const app = express()

app.disable('x-powered-by')
app.use(cors({
    origin: "*",
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: "Origin, X-Requested-With, x-access-token, role, Content, Accept, Content-Type, Authorization"
}))

// Participates in securing the application
app.use(helmet());

// Participates in securing the application
app.use(expressSanitizer());

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Setting up path
const user_path = require('./path/users')
const post_path = require('./path/post')
const comment_path = require('./path/comment')

app.get('/', user_path)
app.get('*', user_path)

app.use('/users', user_path)
app.use('/posts', post_path)
app.use('/comments', comment_path)
// app.use('/pictures', );

DB.sequelize.authenticate()
    .then(() => console.log('Database connection OK'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`This server is running on port ${process.env.SERVER_PORT}.`)
        })
    })
    .catch(err => console.log('Database Error', err))
