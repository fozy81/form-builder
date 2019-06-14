 // If at any point you want to force pages that use this ServiceWorker to start using a fresh
// cache, then increment the9CACHE_VERSION value. It will kick off the ServiceWorker update
// flow and the old cache will be purged as part of the activate event handler when the
// updated ServiceWorker is activated

var CACHE_VERSION = 2
var CURRENT_CACHE = 'dependencies-cache-v' + CACHE_VERSION
// Files required to make this app work offline
var REQUIRED_FILES = [
  '/',
  'assets/favicon.ico',
  'assets/app.css',
  'assets/hoodie-camp.png',
  'assets/low-profile-dog.png',
  'assets/js/a11y-announce.js',
  'assets/js/account.js',
  'assets/js/add_item.js',
  'assets/js/add_project.js',
  'assets/js/build_forms.js',
  'assets/js/common.js',
  'assets/js/database-configuration.js',
  'assets/js/enter_responses.js',
  'assets/js/enter_results.js',
  'assets/js/form.js',
  'assets/js/forms.js',
  'assets/js/items.js',
  'assets/js/process.js',
  'assets/js/projects.js',
  'assets/js/save-form.js',
  'assets/js/service-worker.js',
  'assets/js/view_response.js',
  'assets/js/view_responses.js',

  'assets/js/components/action-menu.js',
  'assets/js/components/add-panel.js',
  'assets/js/components/breadcrumb.js',
  'assets/js/components/data.js',
  'assets/js/components/navbar.js',
  'assets/js/components/panels.js',
  'assets/js/components/question-forms.js',
  'assets/js/components/render-forms.js',
  'assets/js/components/render-questions.js',
  'assets/js/components/render-response.js',
  'assets/js/components/render-select-list.js',
  'assets/js/components/save-responses.js',

  'assets/vendor/bootstrap/js/bootstrap.js',
  'assets/vendor/bootstrap/js/npm.js',
  'assets/vendor/bootstrap.modalform.js',
  'assets/vendor/bootstrap/css/bootstrap.min.css',
  'assets/vendor/bootstrap/css/bootstrap.min.css.map',
  'assets/vendor/bootstrap/fonts/glyphicons-halflings-regular.woff2',
  'assets/vendor/prism/prism.js',
  'assets/vendor/prism/prism.css',
  'assets/vendor/jquery-2.1.0.min.js',

  'hoodie/client.js',
  'manifest.json',
  'icon_48.png',
  'icon_520.png',

  'about.html',
  'account.html',
  'add_item.html',
  'add_project.html',
  'design_forms.html',
  'forms.html',
  'form.html',
  'index.html',
  'items.html',
  'project.html',
  'view_responses.html',
  'https://fozy81.github.io/form-builder/',
  'https://fozy81.github.io/form-builder/ref/api-guide.html',
  'https://fozy81.github.io/form-builder/ref/developers.html'
]

// 'install' is fired once per ServiceWorker version, this happens
// when the browser sees this version of the ServiceWorker for the first time
self.addEventListener('install', function(event) {
  // All of these logging statements should be visible via the "Inspect" interface
  // for the relevant ServiceWorker accessed via chrome://serviceworker-internals
  console.log('[install] Handling install event. Resources to cache:', REQUIRED_FILES);

  event.waitUntil(
    caches.open(CURRENT_CACHE)
      .then(function(cache) {
        console.log('[install] Cache opened, adding all core components to cache');
        return cache.addAll(REQUIRED_FILES);
      })
      .then(function() {
        console.log('[install] All required resources have been cached!');
        return self.skipWaiting();
      })
      .catch(function(error) {
        console.log('[install] Resources caching failed with error: ', error);
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('[activate] Activating ServiceWorker!');

  event.waitUntil(
    caches.keys()
      .then(function(cacheNames) {
        return Promise.all(
          cacheNames.map(function(cacheName) {
            if (cacheName !== CURRENT_CACHE) {
              // If this cache is name different than our current cache, then delete it
              console.log('[activate] Deleting out of date cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(function() {
        // We immediately claim the ServiceWorker so that the user doesn't need to refresh the page
        // to activate the ServiceWorker
        console.log('[activate] Claiming this ServiceWorker');
        self.clients.claim();
      })
  );
});

// The fetch event happens for the page request with the
// ServiceWorker's scope, and any request made within that
// page
self.addEventListener('fetch', function(event) {
  console.log('[fetch] Handling fetch event for', event.request.url)
  var requestURL = new URL(event.request.url);

  // Handle requests to a particular host specifically
  if (/view_response\.js/.test(requestURL.pathname)) {
    requestURL = new URL('http://localhost:8000/public/assets/js/view_response.js');
    event.respondWith(
      caches.match(requestURL).then(function(response) {
        if (response) {
          console.log('[fetch] Returning from ServiceWorker cache: ', event.request.url);

          return response;
        }
         })

    )

  }
 else if(/view_response\.html/.test(requestURL.pathname)) {
    requestURL = new URL('http://localhost:8000/view_response.html');
    event.respondWith(
      caches.match(requestURL).then(function(response) {
        if (response) {
          console.log('[fetch] Returning from ServiceWorker cache: ', requestURL);
          console.log(event.request.url);
          var captured = /html([^&]+)/.exec(event.request.url)[1]
          console.log(captured);
          var param = captured ? captured : ''
        //  var template = Handlebars.compile(response)
        //  var context = param
        //  var html    = template(param);

          return response;
        }
         })

    )

  }
 else { event.respondWith(
    // caches.match() will look for a cache entry in the ServiceWorker cache.
    // Is there something there that matches the request?
    // Return it!
    // Otherwise return the result from the live server.
    // `fetch` is essentially a "fallback".

    caches.match(event.request)

    .then(function(response) {
        // Cache hit - return the response from the cached version
        if (response) {
          console.log('[fetch] Returning from ServiceWorker cache: ', event.request.url);

          return response;
        }

        console.log('[fetch] No response found in cache. About to fetch from network ', event.request.url);

        return fetch(event.request)
          .catch(function(error) {
            // This catch() will handle exceptions thrown from the fetch() operation.
            // Note that a HTTP error response (e.g. 404) will NOT trigger an exception.
            // It will return a normal response object that has the appropriate error code set.
            console.error('[fetch] Live fetching failed with error:', error);

            throw error;
          });
      })
  )};
});
