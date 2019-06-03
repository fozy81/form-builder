

var locationHash = window.location.hash.replace('#', '')
// display list of available forms
var formList = document.querySelector('#form-list')
const formsStore = hoodie.store.withIdPrefix('form/')

function renderFormList () {
  formsStore.findAll().then(renderList)
}

renderFormList()

function renderList (items) {
  var list = ''
  for (i = 0; i < items.length; i++) {
      list += '<option value=' + items[i].forms[0].form_name_id +
     '> ' + items[i].forms[0].form_name_id + '</option>'
  }

  formList.innerHTML = list
}

// add form to items
var addFormButton = document.querySelector('#add-form')

addFormButton.addEventListener('click', function (event) {
    event.preventDefault()
      hoodie.store.findAll(function(item) {
              console.log(locationHash)
              console.log(item.container_shortlink)
        // if hash includes project return that project
        return item.container_shortlink == locationHash
       }).then(addForm)
     })

function addForm (item) {
   console.log(item)
let form = formsStore.findAll(function(form) {
     // if hash includes project return that project
     console.log('"' + form.forms[0].form_name_id + '"')
     console.log('"' + formList[formList.selectedIndex].textContent + '"')
                  return form.forms[0].form_name_id ==
                  formList[formList.selectedIndex].textContent.trim()
    }).then(function(form){
      console.log(form)
      console.log(item)
          console.log(form[0].forms[0])

      item[0].forms.push(form[0].forms[0])
  hoodie.store.update(item)

})
  }

// add extra questions
var $addQuestion = document.querySelector('#add')
$addQuestion.addEventListener('click', function (event) {
  event.preventDefault()
  var str = document.getElementById('question').innerHTML
  var addQuestion = str + "<button class='remove'>Remove question</button><p>"
  addQuestion = '<div>' + addQuestion + '</div>'
  var div = document.getElementById('form')
  div.insertAdjacentHTML('beforeend', addQuestion)

  var $removeQuestion = document.getElementsByClassName('remove')
  event.preventDefault()

  for (var i = 0; i < $removeQuestion.length; i++) {
    $removeQuestion[i].addEventListener('click', function (event) {
      event.target.parentNode.parentNode.removeChild(event.target.parentNode)
    })
  }
})

var $selectList = document.querySelector('#units')

// render the list/selection of units
function RenderFormSelector () {
  const unitsStore = hoodie.store.withIdPrefix('units/')
  unitsStore.findAll().then(renderSelect)
}

RenderFormSelector()

function renderSelect (items) {
  if (items.length === 0) {
    document.body.setAttribute('data-store-state', 'empty')
    return
  }

  document.body.setAttribute('data-store-state', 'not-empty')

  var unitName = []
  for (var i = 0; i < items[0].units.unit.length; i++) {
    unitName[i] = items[0].units.unit[i].unitName
  }
  var options = ''
  for (i = 0; i < unitName.length; i++) {
    options += '<option value=' + unitName[i] + '> ' + unitName[i] + '</option>'
  }

  $selectList.innerHTML = options
}

// Get values from inputs, add to database, then clear the form:
var $addForm = document.querySelector('form.form-create')
$addForm.addEventListener('submit', function (event) {
  /**
   * By default a form will submit your form data to the page itself,
   * this is useful if you're doing a traditional web app but we want to handle this in JavaScript instead.
   * if we're overriding this behaviour in JavaScript we need to grab the event
   * and prevent it from doing it's default behaviour.
   **/
  event.preventDefault()

  var formName = $addForm.querySelector('[name=form-name]').value
  var formDesc = $addForm.querySelector('[name=form-desc]').value
  var numberOfQuestions = $addForm.querySelectorAll('[name=question]').length
  var response_id = []
  var questions = []
  var required = []
  var unit = []
  var allowMultipleResponse = []
  var response_type = []
  for (var i = 0; i < numberOfQuestions; i++) {
    response_id[i] = Math.floor(100000000 + Math.random() * 900000000)
    questions[i] = $addForm.querySelectorAll('[name=question]')[i].value
    required[i] = $addForm.querySelectorAll('#input-required-1')[i].checked
    allowMultipleResponse[i] = $addForm.querySelectorAll('#input-multi-1')[i].checked
    response_type[i] = $addForm.querySelectorAll('[name=select]')[i].value
    unit[i] = $addForm.querySelectorAll('[name=unit-name]')[i].value
  }
  $addForm.reset()



var formJson = '{"forms": [{"form_name_id": "' + formName + '",' +
                ' "form_desc": "' + formDesc + '",' +
                ' "container_id": "NONE",' +
                ' "questions": [] }]}'
obj = JSON.parse(formJson)
console.log(obj)
for (i = 0; i < questions.length; i++){
 obj.forms[0].questions.push(JSON.parse(
 '{"question": "' + questions[i] + '",' +
 ' "response_id": "' + response_id[i] + '",' +
 ' "response_type": "' + response_type[i] + '",' +
 ' "required": "' + required[i] + '",' +
 ' "allowMultipleResponse": "' + allowMultipleResponse[i] + '",' +
 ' "response_rep": ' + 0 + ',' +
 ' "unit": "' + unit[i] + '"}'
))
}
console.log(obj)
formsStore.add(obj)

// "type": "form"
//       "form": [
//   {
//     "form_name_id": "CPET_TST",
//     "form_shortlink": 11034131,
//     "form_desc": "Chironomid Exuvie Taxa",
//     "questions": [
//       {
//         "question_id": 52717017,
//         "question_shortlink": 52717017,
//         "question":  questions[i],
//         "question_pos": 4,
//         "required": "required",
//         "clamp_low": "",
//         "decimal_places": 2,
//         "round": true,
//         "response_type": "numeric",
//         "displayed": true,
//         "response_created": "02-SEP-18"
//       },
//       "questions" [
//         {
//       "questions": questions[i],
//       "type": type[i],
//       "required": required[i],
//       "allowMultipleResponse": allowMultipleResponse[i],
//       "unit": unit[i]
//     }
//   ]
//
//     }
    // formName: formName,
    // questions: questions,
    // type: type,
    // required: required,
    // allowMultipleResponse: allowMultipleResponse,
    // unit: unit
  //})

  $addForm.classList.add('form-hide')
})
/* global hoodie */
