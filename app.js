require('dotenv').config();
const express = require("express");
const app = express();

const userRouter = require("./routes/users");
const eventRouter = require("./routes/events");

app.use(express.json());

const PORT = process.env.PORT || 3000;

const logger = (req, res, next) => {
    console.log(`${req.method} Request received on ${req.url}`);
    next();
}

app.use(logger);

app.use(userRouter);
app.use(eventRouter);

app.get("/", (req, res) => {
    res.send("Welcome to task manager!!");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})