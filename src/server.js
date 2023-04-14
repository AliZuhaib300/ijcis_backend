const express = require('express');
const cors = require('cors');
const http = require('http');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const config = require('config');
const appRoot = require('app-root-path');
const responseTime = require('response-time');
const rootLogger = require(appRoot + '/src/logger').rootLogger;
const timeLogger = require(appRoot + '/src/logger').timeLogger;
const commonUtility = require(appRoot + '/src/util/common-util');
const calculateApiTimeUtil = commonUtility.calculateApiTime();
const MONGODB_URL = config.get('datasource.databaseUrl');
const port = process.env.PORT || 8080;
const Api = require('./api');

const app = express();

const corsOpt = {
    origin: '*',
    credentials: true,
};

app.use(cors(corsOpt));
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));
app.use(cookieParser());

app.use('/api', Api);

mongoose.connect(MONGODB_URL, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false, useCreateIndex: true }).then(() => {
    console.log('Database connected to ijcis')
}).catch((err) => {
    console.log('conection error in db', err)
})

app.use(responseTime(async (req, res, time) => {
    const timeTaken = await calculateApiTimeUtil.calculateApiTime(time);
    timeLogger.info(`${req.originalUrl}: ${timeTaken}`);
}))

http.createServer(app).listen(port, function () {
    console.log('server listen on pport 8080');
    rootLogger.info('Http server listening on port ' + 8080);
});

