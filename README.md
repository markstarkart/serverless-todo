# serverless-todo
this is a Serverless ToDo List application.
The front end client is a React SPA hosted on Amazon S3
The backend consists of Amazon API Gateway, AWS Lambda, and Amazon DynamoDB

You can Add, Select, Edit and Delete Tasks from Todo List
You can check a task complete and then the Task will goto a Completed Tasks List. The Completed Tasks are only the most recent task and the completed tasks in this list will eventually expire.

To install this application you must have NodeJS 12.x, Docker, AWS CLI, and AWS SAM CLI installed on your local Dev environment.

You need and AWS Account, and a user with S3, 
You need to set up an S3 bucket for hosting static web sites. A sample bucket policy is included in the root of this repo, that need to be added to the bucket.

After you download the repo locally,
add your S3 bucket name to client/package.json
  "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "deploy": "aws s3 sync build/ s3://<YOUR_BUCKET_NAME>",
      "test": "react-scripts test",
      "eject": "react-scripts eject",
      "s3": "npm run build && npm run deploy"
    },
Save the file. 
Return to the Root file.
Run npm install.
Run npm run deploy
When prompted in the SAM deploy use default values by pressing enter. 
Use the default value except for:

	getAllItemsFunction may not have authorization defined, Is this okay? [y/N]: y
	getByIdFunction may not have authorization defined, Is this okay? [y/N]: y
	putItemFunction may not have authorization defined, Is this okay? [y/N]: y
	putItemFunction may not have authorization defined, Is this okay? [y/N]: y
	deleteItemFunction may not have authorization defined, Is this okay? [y/N]: y
	Save arguments to configuration file [Y/n]: y
  
Answer Yes for these prompts.

To run locally, goto client folder and run npm run start.
To see you static website, goto your S3 bucket Properties Tab and get your endpoint.

The drawing below illustrates the the functionality of the app.

![Alt text](/todoViews.jpg?raw=true "ToDoList App")
