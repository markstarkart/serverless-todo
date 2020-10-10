// Create clients and set shared const values outside of the handler.

// Create a DocumentClient that represents the query to add an item
const dynamodb = require('aws-sdk/clients/dynamodb');
const docClient = new dynamodb.DocumentClient();

// Get the DynamoDB table name from environment variables
const tableName = process.env.TODO_TABLE;

/**
 * A simple example includes a HTTP post method to add one item to a DynamoDB table.
 */
exports.putItemHandler = async (event) => {
    
  if (event.httpMethod !== 'DELETE'){
      throw new Error(`postMethod only accepts DELETE method, you tried: ${event.httpMethod} method.`);
  }   

    // All log statements are written to CloudWatch
    console.info('received:', event);

    // Get id and task from the body of the request
    const body = JSON.parse(event.body)
    const id = body.id;
    const task = body.task;
    // Creates a new item, or replaces an old item with a new item
    // https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/AWS/DynamoDB/DocumentClient.html#put-property
    const params = {
        TableName : tableName,
        Key: { 
          id: id
          // ,
          // "task": {
          //   S: task
          // }
        }
    };

    const result = await docClient.delete(params).promise();

    const response = {
    statusCode: 200,
    headers: {
        "Access-Control-Allow-Headers" : "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "OPTIONS,DELETE"
    },
    
    body: JSON.stringify(body),
    };

    // All log statements are written to CloudWatch
    console.info(`response from: ${event.path} statusCode: ${response.statusCode} body: ${response.body}`);
    return response;
}
