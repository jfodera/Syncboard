const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('mongodb+srv://websciteam1:Monkey1!@cluster0.s4i1y.mongodb.net/')
            .then((client) => {
                dbConnection = client.db('db');
                return cb();
            })
            .catch((err) => {
                console.log(err);
                return cb(err);
            });
    },
    getDb: () => dbConnection
};
