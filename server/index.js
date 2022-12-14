const express = require('express');
const colors = require('colors');
const cors = require('cors');
require('dotenv').config();
const schema = require('./schema/schema');
const {graphqlHTTP} = require('express-graphql');
const connectDb = require('./config/db');


const port = process.env.PORT || 5000;
const app = express();
app.use(cors());
connectDb();

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV === 'development'
}));

app.listen(port,console.log(`Server started on port ${port}`));