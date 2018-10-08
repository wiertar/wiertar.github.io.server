const express = require('express');
const app = express();
const cors = require('cors')
const helmet = require('helmet');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(helmet());

const corsOptions = {
    origin: 'https://wiertar.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/api/content', cors(corsOptions), function (req, res) {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});