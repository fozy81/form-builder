/* global hoodie alert */
 module.exports = createOrAppend

 function createOrAppend (docs, storePrefix = '', preexistingdocs = '') {
   const prefixStore = hoodie.store.withIdPrefix(storePrefix)
   let timeDate = new Date().toLocaleString()
   docs.enteredBy = []
   docs.enteredAt = []
   docs.responses.map(function (response) {
     docs.enteredBy.push('Tim')
     docs.enteredAt.push(timeDate)
   })
   if (docs._id !== undefined) {
     var existing = JSON.parse(JSON.stringify(preexistingdocs))
     delete existing.history
     preexistingdocs.history[preexistingdocs.version - 1] = existing
       // delete docs_id because string and mapping below needs array. The doc_id stays the
       // same (we are appending data to an existing document)
     delete docs._id
       // map keys from new appendments to document and add to existing document. If there are new keys
       // because of a change in form structure, these will also be added in the 'else' statement.
     Object.keys(docs).map(function (key) {
       if (Object.keys(preexistingdocs).indexOf(key) >= 0) {
         preexistingdocs[key] = preexistingdocs[key].concat(docs[key])
       } else {
         preexistingdocs[key] = docs[key]
       }
     })
     preexistingdocs.version += 1
     return prefixStore.updateOrAdd(preexistingdocs._id, preexistingdocs).catch(function (error) {
       alert(error)
     })
   } else {
     docs.version = 1
     docs.history = []
     docs.history.push(JSON.parse(JSON.stringify(docs)))
     delete docs.history[0].history
     return prefixStore.add(docs).catch(function (error) {
       alert(error)
     })
   }
 }

 // module.exports = updateResponse
 function updateResponse (preexistingdocs, responses, responseIndexes, storePrefix = 'response/') {
   const prefixStore = hoodie.store.withIdPrefix(storePrefix)
  // const prefixStore = hoodie.store.withIdPrefix(storePrefix)
   if (responseIndexes.length !== responses.length) {
     alert('Document update failed. All updates to responses must have index value i.e. specify which response are you trying to update')
   }
   var count = 0
   responseIndexes.map(function (index) {
     preexistingdocs.responses[index] = responses[count]
     count += 1
   })
   var existing = JSON.parse(JSON.stringify(preexistingdocs))
   delete existing.history
   preexistingdocs.history[preexistingdocs.version - 1] = existing
   preexistingdocs.version += 1
   return prefixStore.updateOrAdd(preexistingdocs._id, preexistingdocs).catch(function (error) {
     alert(error)
   })
 }


 function removeResponse (preexistingdocs, responses, responseIndexes, storePrefix = 'response/') {
   const prefixStore = hoodie.store.withIdPrefix(storePrefix)
  // const prefixStore = hoodie.store.withIdPrefix(storePrefix)
   if (responseIndexes.length !== responses.length) {
     alert('Document delete failed. All deletions to responses must have index value i.e. specify which response are you trying to delete')
   }
   Object.keys(preexistingdocs).map(function (key) {
     responseIndexes.map(function (index) {
       preexistingdocs[key].splice(index, 1)
     })
   })
   var existing = JSON.parse(JSON.stringify(preexistingdocs))
   delete existing.history
   preexistingdocs.history[preexistingdocs.version - 1] = existing
   preexistingdocs.version += 1
   return prefixStore.updateOrAdd(preexistingdocs._id, preexistingdocs).catch(function (error) {
     alert(error)
   })
 }
