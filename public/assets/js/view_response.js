
var formNumber = document.getElementById('idform').innerHTML
console.log(formNumber)
var formResponses = hoodie.store.find(formNumber)
console.log(formResponses)
// // query documents with prefix 'response'
// const responsesStore = hoodie.store.withIdPrefix('response/')
/**
 * With hoodie we're storing our data locally and it will stick around next time you reload.
 * This means each time the page loads we need to find any previous notes that we have stored.
 */
// function loadAndRenderItems () {
//   hoodie.store.find(uuid).then(render)
// }
//
// /* render items initially on page load */
// loadAndRenderItems()
//
// /**
//  * Anytime there is a data change we reload and render the list of items
//  */
// hoodie.store.on('change', loadAndRenderItems)
// hoodie.store.on('clear', function () {
//   render([])
// })
//
// function orderByCreatedAt (item1, item2) {
//   var timeA = +new Date(item1.hoodie.createdAt)
//   var timeB = +new Date(item2.hoodie.createdAt)
//   return timeA < timeB ? 1 : -1
// }
//
// function render (items) {
//   if (items.length === 0) {
//     document.body.setAttribute('data-store-state', 'empty')
//     return
//   }
//
//   document.body.setAttribute('data-store-state', 'not-empty')
//   var count = 0
//   var total = items.length
//   var totalCount = 0
//   $itemsList.innerHTML = items
//
//     // .sort(items.createdAt)
//     .sort(orderByCreatedAt)
//     .map(function (item) {
//       totalCount++
//       if (typeof item.response !== 'undefined') {
//         count++
//         var tableRow = ''
//         for (var i = 0; i < item.response.length; i++) {
//         var timeDate = new Date(item.hoodie.createdAt)
//         var formId = item._id.slice(-7)
//                   tableRow += '<tr><td>' + item.question[i] +
//                      '</td><td>' + item.response[i] +
//                      '</td><td>' + item.formName +
//                      '</td><td>' + timeDate +
//                      '</td><td>' + formId +
//                      '</td></tr>'
//         }
//
//         if (count === 1) {
//           var tableHead = '<table>' +
//                           '<tr><th>Question</th>' +
//                           '<th>Response</th>' +
//                           '<th>Form Title</th>' +
//                           '<th>Created</th>' +
//                           '<th>Form Number</th></tr>'
//           tableRow = tableHead + tableRow
//         }
//
//         if (totalCount === total) {
//           var tableFoot = '</table>'
//           tableRow = tableRow + tableFoot
//         }
//
//         return tableRow
//       } else { // if no responses in database return empty
//       }
//     }).join('')
// }
//
 /* global hoodie */
