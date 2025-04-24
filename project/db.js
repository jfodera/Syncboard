const { MongoClient } = require('mongodb');
require('dotenv').config();

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect(process.env.MONGODB_URI)
            .then((client) => {
                //selects database named db from the cluster
                dbConnection = client.db(process.env.DB_NAME);
                return cb();
            })
            .catch((err) => {
                console.log(err);
                return cb(err);
            });
    },
    getDb: () => dbConnection
};
