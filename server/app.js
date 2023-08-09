require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const optimize = require('./optimize/optimize')
const app = express();
app.listen(process.env.PORT,() => {console.log("Listening on PORT 3000")});

const url = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/divideXpert';
mongoose.set('strictQuery', false);
mongoose.connect(url, {  
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {res.send("Home Page")})

const groupsRoutes = require("./routes/group")
app.use("/groups",groupsRoutes);

const userRoutes = require("./routes/user")
app.use("/",userRoutes);

app.post("/transaction",async (req,res) => {
    const transcations = req.body;
    const ans = await optimize(transcations);
    res.status(200).json(ans);
})

app.use("*",(req,res) => {
    res.status(404).json({message:"Page not found"});
})