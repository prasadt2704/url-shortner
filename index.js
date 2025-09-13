const express = require("express");
const routes = require("./routes/index");
const {connectToMongoDB} = require("./config");

const app = express();
const PORT = 8000;

connectToMongoDB().then(() => console.log("MongoDb connected"));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server Starterd at ${PORT}`);
})