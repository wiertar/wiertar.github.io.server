const express = require('express');
const app = express();
const cors = require('cors')
const helmet = require('helmet');
const mongodb = require('mongodb');

const port = process.env.PORT || 5000;

const dbUser = process.env.dbUser;
const dbPassword = process.env.dbPassword;

if (dbUser === undefined || dbPassword === undefined) {
    console.warn('dbUser or dbPassword is not set.');
}

app.use(cors());
app.use(helmet());

const loadData = async () => {
    const client = await mongodb.MongoClient.connect(
        `mongodb://${dbUser}:${dbPassword}@ds123783.mlab.com:23783/portfolio-site`, 
        {useNewUrlParser: true}
    );
    const skills = await client.db('portfolio-site').collection('skills');
    const skillsRes = await skills.find({}).toArray();
    
    const projects = await client.db('portfolio-site').collection('projects');
    const projectsRes = await projects.find({}).toArray();

    return {
        skillsRes,
        projectsRes
    }
};

const corsOptions = {
    origin: 'https://wiertar.github.io',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.get('/', cors(corsOptions), async (req, res) => {
    const data = await loadData();
    res.send(await data);
});


app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});