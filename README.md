Aftership Email API Server
=========

A Email Service API that reliably sends email using available email services. Supported services include Sendgrid and Mailgun.

## How it works
This Email Service is designed to hide away from users what services it is using under the hood.

##### Server Lifecycle
1. Check for the supported email services which are correctly configured
2. Choose one of them to use upon user request to send emails
3. If there's network issues, then the server will retry with another email service

## Retry Mechanism

By default, it will retry 3 times for each configured email services.

If there's network error working with one service, it will rotate to the next service and retry.

If the error is something other than network errors, it will not retry.

## Supported Email Services
- Sendgrid
- Mailgun
- Coming Soon..

## Usage

By default, the API service will only enable a service if it is correctly configured on server startup. To enable a new service, you'd have to restart the server.

##### Enable Mailgun
Set `MAILGUN_API_KEY` and `MAILGUN_SENDER_DOMAIN` in your system's env variables.

##### Enable Sendgrid
Set `SENDGRID_API_KEY` in your system's env variables.

## Running Locally

Run `npm start`. See more detail on what it does in package.json.

## Deployment on Heroku

In general, follow the [standard instructions](https://devcenter.heroku.com/articles/deploying-nodejs) on deploying NodeJS app.

In a nutshell, it boils down to:
1. Create a Heroku account
2. Run in terminal:
	```
	heroku login
	heroku create
    git push heroku master
	```

## API Resources

##### Emails Endpoint

| Action        | Required Params | Optional Params | Descriptions  |
| ------------- | :-------------: | :-------------: | ------------- |
| POST&nbsp;/emails  | None | message<br>subject<br>to_address | Sends an email out to recipient with our default from email address |

## Tests

Our tests use [Mocha](https://github.com/mochajs/mocha) (Framework), [Chai](https://github.com/chaijs/chai) (Assertions), and [Nock](https://github.com/node-nock/nock) (HTTP Requests Mock).

Run  `npm test` under the project root. See more detail on what it does in package.json.

## Setup Linting

We follow the airbnb styles with a number of exceptions. Check .eslintrc.yml for more details.

Please check out the [integration docs](https://eslint.org/docs/user-guide/integrations) for setting up eslint in your favorite IDE.

## Contributing

In lieu of a formal style guide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code.

## Future Work
##### More Supported Email Services
One can simply add a new email service class that abstracts the interaction with the specific 3rd party, and add it to the list of senders in the `ReliableEmailService` class.

##### ES6 Transpilation
Currently, we are transpiling es6 in production environment in runtime. This has some performance hit, but is unnoticeable for our simple API.

We should move away from this in the future if this API becomes more performance critical or grows larger, and change it to transpile before starting the server. Here's [one way](https://github.com/babel/example-node-server#getting-ready-for-production-use) to do it.

##### More endpoints (backed by DB)
Provide other endpoints, including GET /emails (backed by DB), so that user can see what emails they have already sent out. We'll have to update our POST /emails to actually store the sent emails in a database.

##### Introduce API Versioning

A public API service should always be versioned so that users who rely on it doesn't encounter breaking changes when we make incompatible API change in the future.
