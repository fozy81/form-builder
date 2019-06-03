// This is the script controlling the ServiceWorker status on the index html page
/* global $ */
  function showState (state) {
    if (state === 'activated') {
      $('.service-worker-status').html('<span class="glyphicon glyphicon-ok-sign connect-status-success" aria-hidden="true"></span> ready')
    } else {
      $('.service-worker-status').text(state)
    }
  }

  if ('serviceWorker' in navigator) {
    // If yes, hoodie will override the default scope of '/' with '.'
    // so that the registration applies to the current directory and
    // everything underneath it.
    navigator.serviceWorker.register('sw.js', {
      scope: '.'
    })
      .then(function (registration) {
        var serviceWorker = registration.installing ||
                            registration.waiting ||
                            registration.active

        if (serviceWorker) {
          showState(serviceWorker.state)
          serviceWorker.addEventListener('statechange', function (e) {
            showState(e.target.state)
          })
        }
      }).catch(function(error) {
        // If you see 'error! :(', something went wrong during registration.
        // The sw.js file might be unavailable or contain a syntax error.
        $('.service-worker-status').text('error! :(')
      })
  } else {
    // If ServiceWorker is not found in navigator,
    // The current browser doesn't support service workers.
    $('.service-worker-status').html('<span class="glyphicon glyphicon-remove-sign connect-status-error" aria-hidden="true"></span> not available :(')
  }
