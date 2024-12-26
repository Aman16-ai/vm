const AWS = require('aws-sdk')

const dynamoDB = new AWS.DynamoDB({
    region: 'ap-south-1',
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey
});

module.exports = dynamoDB