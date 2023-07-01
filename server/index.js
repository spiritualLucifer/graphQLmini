const express = require("express");
const schema = require("./schema/schema");
const ConnectDB = require("./config/db");
const cors = require( "cors" );
require('dotenv').config();
const  app = express();
const {graphqlHTTP} = require("express-graphql");

//conect to the DB
ConnectDB();
app.use(cors());

app.use("/graphql",graphqlHTTP({
     schema:schema,
     graphiql:true
}))


app.listen(5000,()=>{
    console.log("Your Server running on port 5000");
})