dynamodb json format on nodejs example
==================

Requirements
--------
* nodejs version 4.4 - free from https://nodejs.org/en/

Installing
---------
Run `npm install` in the cloned directory.


downloading the local version of amazon dynamodb from aws:
---------
* zip: http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.zip
* tar: http://dynamodb-local.s3-website-us-west-2.amazonaws.com/dynamodb_local_latest.tar.gz

Running dynamo locally:
---------
You will need java installed. Then just run `java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb -port 15000`.
This will run dynamo on port 15000. The default is 8000. On Windows 10 the server was not working well for some reason.

Resources:
--------
http://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB.html - nodejs dynamo sdk
