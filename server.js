const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();

const handleError = require("./middlewares/error")
const notFound = require("./middlewares/notFound");
const emailRoute = require("./route/send-email-route");


app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5174',
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
    credentials: true,
}));
app.use(bodyParser.json());
app.use("/send-email", emailRoute);

app.use(handleError);
app.use('*', notFound);

app.listen(process.env.PORT, () => console.log("Listening on port 3001"));
