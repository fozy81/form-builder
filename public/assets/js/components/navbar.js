// Create navbar
export function renderNav(nav) {
   nav.innerHTML =
   '<ul><li>' +
      '<a href="/account.html">' +
       '<span data-hide-if="signed-in">Login/Sign up</span>' +
       '<span data-hide-if="signed-out" data-value="username"></span>' +
      '</a></li>' +
    '<li><a href="/design_forms.html">Design forms</a></li>' +
    '<li><a href="/project.html">Projects</a></li>' +
    '<li><a href="/view_responses.html">View responses</a></li>' +
    '<li><a target=_blank href="https://fozy81.github.io/form-builder/">Help</a></li>' +
    '<li><a href="#">' +
      '<span data-hide-if="status-ready">⛈</span>' +
      '<span data-hide-if="status-off">📡</span>' +
      '</a></li></ul>'
  activeNav(nav)


// Highlight currently active link on Navbar
function activeNav(element) {
  let location = window.location.pathname
  if (location == '/project.html' ||
      location == '/form.html' ||
      location == '/items.html' ||
      location == '/add_item.html' ||
      location == '/add_project.html' ||
      location == '/build_forms.html'
    ) {
       let activeLink = element.querySelector("a[href='/project.html']")
       activeLink.setAttribute("class", "active") } else {
         let activeLink = element.querySelector("a[href='" + location + "']")
         activeLink.setAttribute("class", "active")
       }
     }



/* global hoodie */
function showSignedIn (username) {
  username = username.split('@')[0]
  username = username.split('.')[0]
  username = username.charAt(0).toUpperCase() + username.slice(1)
  username = '📁 ' + username
  document.querySelector('[data-value=username]').textContent = username
  document.body.setAttribute('data-account-state', 'signed-in')
}

function hideSignedIn () {
  document.body.setAttribute('data-account-state', 'signed-out')
}

hoodie.account.on('signin', function (account) {
  showSignedIn(account.username)
})

hoodie.account.on('signout', hideSignedIn)
hoodie.account.get(['session', 'username'], {local: true})
  .then(function (properties) {
    if (properties.session) {
      showSignedIn(properties.username)
    } else {
      hideSignedIn()
    }
  })

  function showOfflineNotification () {
    document.body.setAttribute('connection-status', 'status-off')
    console.log('off')
  }

  function showReadyNotification () {
    document.body.setAttribute('connection-status', 'status-ready')
      console.log('ready')
  }
  //
  // hoodie.connectionStatus.on('disconnect', showOfflineNotification)
  // hoodie.connectionStatus.on('reconnect reset', hideOfflineNotification)

  // hoodie.connectionStatus.startChecking({interval: 30000})
  // .on('ready', showReadyNotification).catch(function(){
  //   showOfflineNotification()
  // })

  hoodie.connectionStatus.check()
  .then(function () {
   showReadyNotification()
 }).catch(function(){
   showOfflineNotification()
 })

}
