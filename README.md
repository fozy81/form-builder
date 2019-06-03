<<<<<<< HEAD
# form-builder

> Demo Hoodie app


Form builder is a simple Hoodie app, meant to be a starting point to play and build
with Hoodie.

## Requirements

Tracker needs `node >=4`. To see which version you have installed, run
```
node -v
```

## Setup

```
git clone https://github.com/fozy81/form-builder.git
cd form-builder
npm install --production
```

Start server with

```
npm start
```

### Optional: Setup email for password reset

If you want to use the password reset feature, you must configure an email account
to send out notification, like a Google Mail account. Edit the `.hoodierc` file,
the options are passed to [nodemailer.createTransport()](https://github.com/nodemailer/nodemailer-smtp-transport#usage)

```
cp .hoodierc-example .hoodierc
```

## Deployment

You can find a detailed instruction [here](deployment.md).

## Contribute

`form-builder` is work in progress. The goal is to have a simple
application with very clear and easy to understand HTML / CSS / JS code which
ideally uses no 3rd party code at all, besides the Hoodie client.

If you want to contribute to the frontend assets, you can simply open
the project folder and edit the files in
the [public/](public/) folder.

## Tests

Install devDependencies by running `npm install` without `--production`

```
npm install
```

Then run tests with

```
npm test
```

## Need help or want to help?

It’s best to join our [chat](http://hood.ie/chat/).

## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
=======
# hapi-app
Created with [hoodie](https://github.com/hoodiehq)
>>>>>>> 97517dc52680e18f6f5dd88aefb5a6ff0bc903d7
