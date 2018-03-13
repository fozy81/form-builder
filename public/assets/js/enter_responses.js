// const save = require('./save-form.js')

var $selectList = document.querySelector('#select-form')
var $itemsList = document.querySelector('#form_id')

/**
 * With hoodie we're storing our data locally and it will stick around next time you reload.
 * This means each time the page loads we need to find any previous notes that we have stored.
 */

// render the form selector first
function RenderFormSelector () {
  const formsStore = hoodie.store.withIdPrefix('form/')
  formsStore.findAll().then(renderSelect)
}

RenderFormSelector()

    // render the form as selected from the menu
function loadAndRenderItems () {
  const formsStore = hoodie.store.withIdPrefix('form/')
  formsStore.findAll().then(render)
}

/* render items initially on page load */
loadAndRenderItems()

/**
 * Anytime there is a data change we reload and render the list of items
 */
// hoodie.store.on('change', loadAndRenderItems)
hoodie.store.on('clear', function () {
  render([])
})

function renderSelect (items) {
  if (items.length === 0) {
    document.body.setAttribute('data-store-state', 'empty')
    return
  }

  document.body.setAttribute('data-store-state', 'not-empty')

  $selectList.innerHTML = items

  var formNames = items.map(function (item) {
    return item.formName
  })

  let unique = [...new Set(formNames)]

  var options = ''
  for (var i = 0; i < unique.length; i++) {
    options += '<option value=' + unique[i] + '> ' + unique[i] + '</option>'
  }

  $selectList.innerHTML = options

  $selectList.addEventListener('click', function (event) {
    event.preventDefault()
    loadAndRenderItems()
  })
}

// render response submission form
function render (items) {
  if (items.length === 0) {
    document.body.setAttribute('data-store-state', 'empty')
    return
  }

  document.body.setAttribute('data-store-state', 'not-empty')

  $itemsList.innerHTML = items
    .map(function (item) {
      var selectedForm = $selectList.options[$selectList.selectedIndex].text
      var required = ''
      if (typeof item.questions !== 'undefined' && item.formName === selectedForm) {
        var question = ''
        if (item.required === 'on') {
          required = 'required'
        }

        for (var i = 0; i < item.questions.length; i++) {
          if (item.allowMultipleResponse[i] === true | id === '') {
            // check if response required
            if (item.required[i] === true) {
              required = 'required'
            }
            question += '<label for="input-title">' + item.questions[i] + '</label>' +
               '<input type=' + item.type[i] + ' name="question" id="input-title" ' +
                required + '><h4>Units: <span id="units">' + item.unit[i] + '</span></h4><p></p>'
          // check if input field multiple Responses
          //   if (item.allow_multiple_resulResponset[i] === true)
          } else {
            question += ''
          }
        }
        if (question === '') {
          return 'Thanks!'
        }

        var form = '<h2 name="form-name" data-id="' + item._id + '">' + item.formName +
         '</h2><p></p>' + '<div class="form-title">' +
           question + '<button id="submit" type="submit">Save</button>'

        return form
      }
    }).join('')
}

let id = ''
let $addResponse = document.querySelector('form.form-create')

// form submit
$addResponse.addEventListener('submit', function (event) {
    /**
     * By default a form will submit your form data to the page itself,
     * this is useful if you're doing a traditional web app but we want to handle this in JavaScript instead.
     * if we're overriding this  behaviour in JavaScript we need to grab the event
     * and prevent it from doing it's default behaviour.
  **/
  event.preventDefault()

// Get values from inputs
  let doc = {}
  let numberOfQuestions = $addResponse.querySelectorAll('[name=question]').length
  doc.formName = [document.getElementById('select-form').value]
  doc.responses = []
  doc.questions = []
  doc.units = []
  // doc.history = []
  doc.types = []
  for (var i = 0; i < numberOfQuestions; i++) {
    doc.responses[i] = $addResponse.querySelectorAll('[name=question]')[i].value
    doc.questions[i] = $addResponse.querySelectorAll('label')[i].innerHTML
    doc.units[i] = $addResponse.querySelectorAll('#units')[i].innerHTML
    doc.types[i] = $addResponse.querySelectorAll('input')[i].getAttribute('type')
  }
     // $addResponse.innerHTML = 'Thank you! Your response has been saved'
     /**
     * There is an option to allow updates to submitted respones. To allow you
     * to keep track of all changes to responses, we save previous revisions to the 'version'
     * value in the response json. Otherwise if couchdb is reduced/deflated all
     * revisions are lost. This is the standard approach in couchdb if full history
     * is required. In the current use case it's unlikely there will be a large amount
     * of changes to responses but this could become a performance issue. A view that doesn't
     * return the version history could help reduce this. Or changes could be saved as an
     * attachment.
     **/

     // if response has already been saved
     // load existing record from database then add new input to existing array
     // save function will add old responses to 'version' array
     // save comes from save-form.js
       let storePrefix = 'response/'
  if (id !== '') {
    doc._id = id
    hoodie.store.find(id).then(function(preexistingdocs) {
    createOrAppend(doc, storePrefix, preexistingdocs).then(
      hoodie.store.find(id).then(function (doc) {
        id = doc._id
        console.log(doc._id)
        loadAndRenderItems()
        hoodie.store.find(id).then(rendertable)
      })
    )
    }
  )
  } else {
    createOrAppend(doc, storePrefix).then(function (doctest) {
      id = doctest._id
  //  loadAndRenderItems()
      hoodie.store.find(id).then(function (doc) {
        id = doc._id
        console.log(doc._id)
        loadAndRenderItems()
        hoodie.store.find(id).then(rendertable)
      })
    })
  }
})

// create table of previously entered Responses
function rendertable (items) {
  if (items.length === 0) {
    document.body.setAttribute('data-store-state', 'empty')
    return
  }

  document.body.setAttribute('data-store-state', 'not-empty')

  var count = 1

  if (typeof items.responses !== 'undefined') {
    var tableRow = ''
    var rep = ''
    for (var i = 0; i < items.responses.length; i++) {
      rep = i
      tableRow += '<tr data-id="' + items._id + '" data-rep="' + rep + '" data-type="' + items.types[i] + '"><td>' + escapeHtml(items.questions[i]) + '</td><td>' +
               escapeHtml(items.responses[i]) + '</td>' +
                '<td><a href="#" data-action="edit">Edit</a></td>' +
                            '<td><a href="#" data-action="remove">Delete</a></td>' +
                '</tr>'
    }

    if (count === 1) {
      var tableHead = '<div id="table"><table><tr><th>Question</th><th>Response</th></tr>'
      tableRow = tableHead + tableRow
    }

    if (count === 1) {
      var tableFoot = '</table></div>'
      tableRow = tableRow + tableFoot
    }
    console.log(tableRow)

        //  var $submit = document.querySelector('#submit')
    var $table = document.querySelector('#responses')
          //  console.log( $submit)
    console.log($table)
          //  $submit.insertAdjacentHTML( 'beforeend', tableRow )
    $table.innerHTML = tableRow
  } else { // if no responses in database return empty
    return
  }

  $table = document.querySelector('#table')
// add event listener to allow edit previous results table
  $table.addEventListener('click', function (event) {
    event.preventDefault()

    var action = event.target.dataset.action
    if (!action) {
      return
    }

    let row = event.target.parentNode.parentNode
    let id = row.dataset.id
    let question = row.firstChild.textContent
    let response = row.firstChild.nextSibling.textContent
    let rep = []
    rep = [row.dataset.rep]
    let type = row.dataset.type

    switch (action) {
      case 'edit':
        row.innerHTML = '<td>' + escapeHtml(question) + '</td>' +
                            '<td><input id="response' + rep + '" type="' + type + '" name="response" value="' + escapeHtml(response) + '" data-reset-value="' + escapeHtml(response) + '" autofocus></td>' +

                            '<td><a href="#" data-action="update">Update</a></td><td><a href="#" data-action="cancel">Cancel</a></td>'
        break
      case 'cancel':
        // loadAndRenderItems()
        event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
        hoodie.store.find(id).then(rendertable)
        break

      case 'remove':
        hoodie.store.find(id).then(remove)
        hoodie.store.find(id).then(rendertable)
        function remove (oldDoc) {
          // remove specific 'rep'/replicate of question, response, unit from doc
          oldDoc.responses.splice(rep, 1)
          oldDoc.questions.splice(rep, 1)
          oldDoc.unit.splice(rep, 1)

          if (oldDoc.version !== undefined) {
            // the
            let oldVersion = []
            var old = oldDoc.version
            oldVersion.push(old)

            let newVersion = []
            var newV = oldDoc
            newVersion.push(newV)
            oldVersion.push(newVersion)
            var version = oldVersion

            hoodie.store.update(id, {
              formName: oldDoc.formName,
              questions: oldDoc.questions,
              responses: oldDoc.responses,
              units: oldDoc.unit,
              types: oldDoc.type,
              history: version
            }).then(function (doc) {
              id = doc._id
              console.log(doc._id)
              loadAndRenderItems()
              hoodie.store.find(id).then(rendertable)
            })
          } else {
            version = []
            version.push(oldDoc)
            hoodie.store.update(id, {
              formName: oldDoc.formName,
              questions: oldDoc.questions,
              responses: oldDoc.responses,
              units: oldDoc.units,
              types: oldDoc.types,
              hisotry: oldDoc.hisotry
            }).then(function (doc) {
              id = doc._id
              console.log(doc._id)
              loadAndRenderItems()
              hoodie.store.find(id).then(rendertable)
            })
          }
        }

        break
      case 'update':
        hoodie.store.find(id).then(update)

      //  hoodie.store.find(id).then(rendertable)
      //  event.target.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(event.target.parentNode.parentNode.parentNode.parentNode)
      //  hoodie.store.find(id).then(rendertable)
        function update (oldDoc) {
        // remove specific 'rep'/replicate of question, response, unit from doc
          var responseId = []
          responseId = ['response' + rep]
          var response = []
          response = [document.getElementById(responseId).value]
          //var responseIndexes = []
          //var responses = []

             updateResponse(preexistingdocs = oldDoc, responses = response,
              responseIndexes = rep, storePrefix = 'response/').then(function (doc) {
                     id = doc._id
                     loadAndRenderItems()
                     hoodie.store.find(id).then(rendertable)
                   })
        }
    }
  })
}

function escapeHtml (unsafeHtml) {
  var text = document.createTextNode(unsafeHtml)
  var div = document.createElement('div')
  div.appendChild(text)
  return div.innerHTML
}
/* global hoodie createOrAppend */
