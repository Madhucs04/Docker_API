const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors({
    origin: 'http://localhost:3000'
}));

const containerRoutes = require('./routes/containerRoutes');

app.use(express.json());

app.use('/containers', containerRoutes);

app.use("/", (res, req) => {
    req.send("Welcome to Node API")
});

app.listen(3001);