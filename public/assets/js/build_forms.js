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
  var numberOfQuestions = $addForm.querySelectorAll('[name=question]').length
  var questions = []
  var required = []
  var unit = []
  var allowMultipleResponse = []
  var type = []
  for (var i = 0; i < numberOfQuestions; i++) {
    questions[i] = $addForm.querySelectorAll('[name=question]')[i].value
    required[i] = $addForm.querySelectorAll('#input-required-1')[i].checked
    allowMultipleResponse[i] = $addForm.querySelectorAll('#input-multi-1')[i].checked
    type[i] = $addForm.querySelectorAll('[name=select]')[i].value
    unit[i] = $addForm.querySelectorAll('[name=unit-name]')[i].value
  }
  $addForm.reset()

  const formsStore = hoodie.store.withIdPrefix('form/')

  formsStore.add({
    formName: formName,
    questions: questions,
    type: type,
    required: required,
    allowMultipleResponse: allowMultipleResponse,
    unit: unit
  })

  $addForm.classList.add('form-hide')
})
/* global hoodie */
