import { renderNav } from '/assets/js/components/navbar.js'

let nav = document.querySelector('nav')
 /* render navbar */
renderNav(nav)
// find results and dislay in div id="results"
var $itemsList = document.querySelector('#results')

// // query documents with prefix 'response'
// const responsesStore = hoodie.store.withIdPrefix('response/')
/**
 * With hoodie we're storing our data locally and it will stick around next time you reload.
 * This means each time the page loads we need to find any previous notes that we have stored.
 */
function loadAndRenderItems () {
 hoodie.store.findAll().then(render)
}

/* render items initially on page load */
loadAndRenderItems()

/**
 * Anytime there is a data change we reload and render the list of items
 */
hoodie.store.on('change', loadAndRenderItems)
hoodie.store.on('clear', function () {
  render([])
})

function orderByCreatedAt (item1, item2) {
  var timeA = +new Date(item1.hoodie.createdAt)
  var timeB = +new Date(item2.hoodie.createdAt)
  return timeA < timeB ? 1 : -1
}

function render (items) {
  if (items.length === 0) {
    document.body.setAttribute('data-store-state', 'empty')
    return
  }

  console.log(items[15])

  document.body.setAttribute('data-store-state', 'not-empty')
  var count = 0
  var total = items.length
  var totalCount = 0
  $itemsList.innerHTML = items

    // .sort(items.createdAt)
  //  .sort(orderByCreatedAt)
    .map(function (item) {
      var tableRow = ''
      totalCount++

      if (item.doc !== undefined) {
            return tableRow
      }
        else if (item.forms[0] == undefined) {
         return tableRow
      } else if (item.forms[0].questions == undefined ) {
         return tableRow
       } else if (item.forms[0].questions[0].response == undefined ) {
        return tableRow
       } else {
        console.log(item)
        count++
       for (var j = 0; j < item.forms.length; j++) {
        for (var i = 0; i < item.forms[j].questions.length; i++) {
        var timeDate = new Date(item.hoodie.createdAt)
        var formId = item._id.slice(-7)
        var formName =  item.forms[j].form_name_id
                  tableRow += '<tr><td>' + item.forms[j].questions[i].question +
                     '</td><td>' + item.forms[j].questions[i].response +
                     '</td><td>' + formName +
                     '</td><td>' + timeDate +
                     '</td><td>' + formId +
                     '</td></tr>'
        }
      }

        if (count === 1) {
          var tableHead = '<table>' +
                          '<tr><th>Question</th>' +
                          '<th>Response</th>' +
                          '<th>Form Title</th>' +
                          '<th>Created</th>' +
                          '<th>Form ID</th></tr>'
          tableRow = tableHead + tableRow
        }

        if (totalCount === total) {
          var tableFoot = '</table>'
          tableRow = tableRow + tableFoot
        }
        console.log(tableRow)
        return tableRow
      } // else { // if no responses in database return empty
      // }
    }).join('')
}

/* global hoodie */
