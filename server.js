const mongoose = require('mongoose');
require('dotenv').config();
const app = require('./app');

const port = process.env.PORT || 4000;
// console.log(process.env)
mongoose.connect(process.env.DATABASE_CONNECTION_URL)
    .then(() => {
        console.log('database successfully connected');
        app.listen(port, () => {
            console.log('server listening on port', port)
        })
    })

