// find results and dislay in div id="results"
import { renderNav } from '/assets/js/components/navbar.js'
var $addForm = document.querySelector('#add_project')
var $subtitle = document.querySelector('#subtitle')
var locationHash = window.location.hash.replace('#', '')

/**
 * With hoodie we're storing our data locally and it will stick around next time you reload.
 * This means each time the page loads we need to find any previous notes that we have stored.
 */
function loadAndRenderItems () {

//  hoodie.store.findAll().then(render)

  hoodie.store.findAll(function(project) {
    console.log(locationHash)

     return project.project_id == locationHash

  }).then(render)

}

/* render items initially on page load */
loadAndRenderItems()



window.onhashchange = function () {
  locationHash = window.location.hash.replace('#', '')
  loadAndRenderItems()
}
/**
 * Anytime there is a data change we reload and render the list of items
 */
hoodie.store.on('change', loadAndRenderItems)
hoodie.store.on('clear', function () {
  render([])
})

function render (items) {

  let nav = document.querySelector('nav')
   /* render navbar */
  renderNav(nav)

    console.log(items)
  // if no hash then load all projects
//  if (locationHash === '') {
      $subtitle.innerHTML = 'Add Entity'
      $addForm.innerHTML = ' <form class="entity-create"><div class="project" id="project_form">' +
       '<div id="Name">' +
        '<label for="input-required-1">Item Description</label>' +
        '<input type="text" name="question" id="item-desc" required>' +
        '<label for="input-required-1">Item Lat</label>' +
        '<input type="number" name="question" id="item-lat">' +
        '<label for="input-required-1">Item Lon</label>' +
        '<input type="number" name="question" id="item-lon">' +
        '</div></div><button id="submit" type="submit">Save Item</button></form>'

    if (items.length === 0) {
      document.body.setAttribute('data-store-state', 'empty')
      return
    }

    document.body.setAttribute('data-store-state', 'not-empty')

//  }
}


function addItem (items){
  console.log('testing2')
  let itemId =  Math.floor(100000000 + Math.random() * 900000000)
  let itemDescription = $addForm.querySelector('#item-desc').value
  let lat = $addForm.querySelector('#item-lat').value
  let lon = $addForm.querySelector('#item-lon').value

  $addForm.querySelector('#item-desc').value = ''
  $addForm.querySelector('#item-lat').value = ''
  $addForm.querySelector('#item-lon').value = ''


if (items[0].item_name != null) {
      hoodie.store.add({
        project: items[0].project,
        project_name: items[0].project_name,
        project_id: items[0].project_id,
        project_shortlink: items[0].project_shortlink,
        item_name: itemId,
        item_shortlink: itemId,
        item_id: itemId,
        container_shortlink: itemId,
        item_desc: itemDescription,
        lat: lat,
        lon: lon,
        forms: []
      })
    }

    if(items[0].item_name == null){
      items[0].item_desc = itemDescription
      items[0].lat = lat
      items[0].lon = lon
      items[0].item_id = itemId
      items[0].item_name = itemId
      items[0].item_shortlink = itemId
      items[0].container_id = itemId
      items[0].container_shortlink = itemId
      items[0].forms = []
      let item = items[0]
      hoodie.store.update(item)
    }
}

$addForm.addEventListener('submit', function (event) {
  /**
   * By default a form will submit your form data to the page itself,
   * this is useful if you're doing a traditional web app but we want to handle this in JavaScript instead.
   * if we're overriding this behaviour in JavaScript we need to grab the event
   * and prevent it from doing it's default behaviour.
**/
  event.preventDefault()
  console.log('testing')
  hoodie.store.findAll(function(project) {
     return project.project_id == locationHash
  }).then(addItem)

  // Get values from inputs, then clear the form




  // hoodie.store.add({
  //   project: 'test',
  //   project_name: 'test',
  //   location_id: locationId,
  //   location_name: locationName
  //   })

})

/* global hoodie */
