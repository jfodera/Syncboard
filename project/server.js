const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const port = 3000;
const groupJson = require('./groups.json');

//need /node for vm
app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'public','index.html'));

});

app.get('/groups/:groupID', (req, res) => {
    //assume we start at 1
    const group = Number(req.params.number);
    const arr = Object.values(groupJson);

    res.status(200).json(arr[group-1]);
});