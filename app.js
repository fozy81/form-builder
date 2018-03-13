const Path = require('path')
const Hapi = require('hapi')
const Hoek = require('hoek')
//const Inert = require('inert')
var hoodie = require('hoodie').register
var PouchDB = require('pouchdb-core')
  .plugin(require('pouchdb-mapreduce'))
  .plugin(require('pouchdb-adapter-memory'))

var server = new Hapi.Server()
server.connection({
  host: 'localhost',
  port: 8000
})

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'public/templates'
    })
})

server.route({
    method: 'GET',
    path: '/public/{file*}',
    handler: function (request, reply) {
        reply.file("public/" +request.params.file);
    }
})

server.route({
  method: 'GET',
  path: '/',
  handler: (request, reply) => {
    reply.view('index')
  }
})

server.route({
  method: 'GET',
  path: '/sw.js',
  handler: (request, reply) => {
      reply.file('sw.js');
  }
})

server.route({
  method: 'GET',
  path: '/build_forms.html',
  handler: (request, reply) => {
    reply.view('build_forms')
  }
})

server.route({
  method: 'GET',
  path: '/view_responses.html',
  handler: (request, reply) => {
    reply.view('view_responses')
  }
})

 server.route({
   method: 'GET',
   path: '/view_response.html/{uuid*}',
   handler: (request, reply) => {
    var data = {
            uuid: request.params.uuid
          }
    return  reply.view('view_response', data)
   }
 })

server.route({
  method: 'GET',
  path: '/enter_responses.html',
  handler: (request, reply) => {
    reply.view('enter_responses')
  }
})

server.route({
  method: 'GET',
  path: '/account.html',
  handler: (request, reply) => {
    reply.view('account')
  }
})

server.register({
  register: hoodie,
  options: { // pass options here
    inMemory: true,
    public: 'dist',
    PouchDB: PouchDB
  }
}, function (error) {
  if (error) {
    throw error
  }

  server.start(function (error) {
    if (error) {
      throw error
    }

    console.log(('Server running at:', server.info.uri))
  })
})
