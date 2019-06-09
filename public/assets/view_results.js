var $itemsList = document.querySelector('#results')
// find results and dislay in div id="results"

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

function render (items) {
  if (items.length === 0) {
    document.body.setAttribute('data-store-state', 'empty')
    return
  }

  document.body.setAttribute('data-store-state', 'not-empty')
  var count = 0
  var total = items.length
  var total_count = 0
  $itemsList.innerHTML = items

  //  .sort(orderByCreatedAt)
    .map(function (item) {
        total_count ++
     if(typeof item.response != 'undefined') {
          count ++
          console.log(count)
          var table_row = ''
          for (var i = 0; i < item.response.length; i++) {
          table_row +=  '<tr><td>' + item.question[i] + '</td><td>' + item.response[i] + '</td><td>' + item.form_name + '</td> </tr>'
          }

          if(count == 1){
            var table_head = '<table><tr><th>Question</th><th>Response</th><th>Form</th></tr>';
             table_row = table_head + table_row
          }

          if (total_count == total){
             var table_foot = '</table>'
             table_row = table_row + table_foot
          }
          console.log(table_row)


          //var table = table_head
          return table_row
          }
     else {
           return  }
}).join('')
}
