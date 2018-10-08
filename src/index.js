const express = require('express');
const app = express();
const helmet = require('helmet');
const port = process.env.PORT || 5000;

app.use(helmet());

app.get('/api/content', function (req, res) {
    res.send('hello world');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});