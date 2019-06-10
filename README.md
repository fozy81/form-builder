# Welcome
WayOway is your research tool for planning and gathering data.
Create projects, add items and design forms. Then monitor and
update your project as it progresses.

WayOway is built using the Hoodie javascript framework, and provides
a streamlined way to store and update data on and offline
## Requirements
WayOway needs `node >=4`. To see which version you have installed, run
```
node -v
```
## Setup
```
git clone https://github.com/fozy81/wayoway.git
cd wayoway
npm install --production
```
Start server with
```
npm start
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
