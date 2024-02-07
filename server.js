// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;
const candidatesRoutes = require('./routes/candidates');
app.use('/candidates', candidatesRoutes);
app.use(express.static('public'));



mongoose.connect('mongodb://localhost/polling-website', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(bodyParser.json());

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
