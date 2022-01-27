const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = 8899;
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());


//dbconnection 
const db = "mongodb://localhost:27017/invoice";
const connectDB = async () => {
  try {
    await mongoose.connect(db, { useNewUrlParser: true });
    console.log("MongoDb Connected");
  }
  catch (err) {
    console.log(err.message);
  }
}
connectDB();
//end


const postRoutes = require('./routes/postRoutes');
app.use("/api/posts", postRoutes);
app.listen(PORT, (err) => {
  if (err) throw err;
  console.log(`Work on ${PORT}`);
})