const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();

const authRouter = require("./routes/auth-route");

app.use(express.json());

app.use("/auth", authRouter);

app.listen(3000, () => console.log("Listening on port 3000"));
