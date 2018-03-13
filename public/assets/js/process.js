
$addForm.addEventListener('submit', function (event) {
  /**
   * By default a form will submit your form data to the page itself,
   * this is useful if you're doing a traditional web app but we want to handle this in JavaScript instead.
   * if we're overriding this behaviour in JavaScript we need to grab the event
   * and prevent it from doing it's default behaviour.
   **/
  event.preventDefault()

  // Get values from inputs, then clear the form
  var form_name = $addForm.querySelector('[name=form-name]').value
  var number_of_questions = $addForm.querySelectorAll('[name=question]').length
  var questions = []
  var required = []
  var allow_multiple_result = []
  var select = []
  for (var i = 0; i < number_of_questions; i++) {
    questions[i] = $addForm.querySelectorAll('[name=question]')[i].value
    required[i] = $addForm.querySelectorAll('#input-required-1')[i].checked
    allow_multiple_result[i] = $addForm.querySelectorAll('#input-multi-1')[i].checked
    select[i] = $addForm.querySelectorAll('[name=select]')[i].value
  }
  $addForm.reset()

  const formsStore = hoodie.store.withIdPrefix('form/')

  formsStore.add({form_name: form_name,
    questions: questions,
    select: select,
    required: required,
    allow_multiple_result: allow_multiple_result
  })

  $addForm.classList.add('form-hide')
})
