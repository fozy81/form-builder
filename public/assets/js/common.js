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
  //
  // hoodie.connectionStatus.startChecking({interval: 3000})
  //   .on('disconnect', showOfflineNotification)
  //
  //   hoodie.connectionStatus.startChecking({interval: 3000})
  //     .on('ready', showReadyNotification)
  //
  //   hoodie.connectionStatus.startChecking({interval: 3000})
  //       .on('ok', showOkNotification)
