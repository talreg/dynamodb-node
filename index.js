"use strict"
let AWS = require("aws-sdk");
const credentials = {
    accessKeyId: "fakeAccessKey",
    secretAccessKey: "fakeSecretAccessKey",
    region: "fakeRegion",
    endpoint: "http://localhost:15000"
};
const TABLE_NAME="users";

let dynamo = new AWS.DynamoDB.DocumentClient(credentials);
let dynamodb = new AWS.DynamoDB(credentials);
let rand = require("randomstring");

function createUsersTable(callback) {
    let params = {
        TableName: TABLE_NAME,
        KeySchema: [{
            AttributeName: "user_id",
            KeyType: "HASH"
        }, ],
        AttributeDefinitions: [{
            AttributeName: "user_id",
            AttributeType: "S"
        }],
        ProvisionedThroughput: {
            "ReadCapacityUnits": 5,
            "WriteCapacityUnits": 5
        }
    }
    dynamodb.createTable(params, (err, data) => {
        callback(err, data)
    });
}

function addUser(callback) {
    let params = {
        TableName: TABLE_NAME
    };
    let item = {
        user_id: rand.generate(),
        username: "Bick "+rand.generate(7),
        password: rand.generate(10),
        address: {
            home: "123 wrefwre,fwref",
            work: "wre 5whbwergwregwerg"
        }
    }
    params.Item = item;
    dynamo.put(params, callback);
}

function listUsers(callback) {
    dynamo.scan({
        TableName: TABLE_NAME
    }, callback);
}

dynamodb.listTables((err, data) => {
    if (err) {
        console.log("error:" + err);
        return;
    }
    let tableExists = false;
    for (let i = 0; i < data.TableNames.length; i++) {
        if (data.TableNames[i] == TABLE_NAME) {
            tableExists = true;
            console.log("table exists");
            break;
        }
    }
    if (tableExists == false) {
        console.log("table doesn't exists, creating new table.");
        createUsersTable((err, data) => {
            if (err) {
                console.log(err);
                return;
            }
            listUsers((err, data) => {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(data);
            })
        })
    }
    else{
      addUser((err,data)=>{
        if(err){
          console.log(err);
          return ;
        }
      });
      listUsers((err,data)=>{
        console.log(JSON.stringify(data));
      })
    }
})
