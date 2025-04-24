const { MongoClient } = require('mongodb');
const path = require('path');
const dotenv = require('dotenv');
const os = require('os');

// Load .env from home directory
dotenv.config({ path: path.join(os.homedir(), '.env') });

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