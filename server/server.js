const env = require('dotenv');
env.config();
const express = require('express');
const app = express();
PORT = process.env.PORT;
const mongoose = require('mongoose');
mongoose.set('strictQuery', true);
mongoose.connect(`${process.env.DBURI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(db => {
    console.log('Connected to the Remote Database')
}).catch(err => {
    console.log(err)
});
require('./models/user');
require("./models/post")
app.use(express.json());
app.use(require('./routes/authen'));
app.use(require('./routes/upPost'))
app.listen(PORT, () => {
    console.log("The Server Has Started\nListening on port :", PORT, `\nTo Access on local Machine ctrl + click on ==> http://localhost:${PORT}/`)
});