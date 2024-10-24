
const connectDB = require('./Connections/connect');
const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routers/auth_router');
const detailDriver=require('./routers/driverrouter');
const departments=require('./routers/departments');
const endpoints=require('./routers/endpoints');
const trips = require("./routers/trips")
const cors = require('cors')

const app = express();
dotenv.config();
connectDB();
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cors());
app.use('/auth', authRoutes);
app.use('/user', detailDriver);
app.use('/depart',departments );
app.use('/store', endpoints);
app.use("/trips", trips);
// app.post('/', (req, res) => {
//   console.log(req.body);
//   res.json({a:'Hello, world!'});
// });

app.get("/", (req, res, next) => {
  res.send("Hello world");
})

app.post("/", (req,res)=>{
  res.json({gay:"Sithaarth"});
})


const PORT = 8000 ;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
