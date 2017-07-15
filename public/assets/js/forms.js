// add extra questions
var $addQuestion = document.querySelector('#add');
$addQuestion.addEventListener('click', function (event) {
  event.preventDefault()
var str = document.getElementById("question").innerHTML
var add_question = str + "<button class='remove'>Remove question</button><p>"
add_question = "<div>" + add_question + "</div>";
var div = document.getElementById("form")
div.insertAdjacentHTML('beforeend', add_question)

var $removeQuestion = document.getElementsByClassName('remove');
  event.preventDefault()

for (var i = 0; i < $removeQuestion.length; i++) {
  $removeQuestion[i].addEventListener('click', function (event) {

    event.target.parentNode.parentNode.removeChild(event.target.parentNode);
})
}

})

var $addItemForm = document.querySelector('form.form-create')

$addItemForm.addEventListener('submit', function (event) {
  /**
   * By default a form will submit your form data to the page itself,
   * this is useful if you're doing a traditional web app but we want to handle this in JavaScript instead.
   * if we're overriding this behaviour in JavaScript we need to grab the event
   * and prevent it from doing it's default behaviour.
   **/
  event.preventDefault()

  // Get values from inputs, then clear the form
  var form_name = $addItemForm.querySelector('[name=form-name]').value
  var number_of_questions = $addItemForm.querySelectorAll('[name=question]').length
  var questions = []
  var required = []
  var select = []
  for (var i = 0; i < number_of_questions; i++) {

  questions[i] = $addItemForm.querySelectorAll('[name=question]')[i].value
  required[i] = $addItemForm.querySelectorAll('#input-required-1')[i].checked
  select[i] = $addItemForm.querySelectorAll('[name=select]')[i].value

            }
  $addItemForm.reset()

  hoodie.store.add({form_name: form_name,
    questions: questions,
    select: select,
    required: required
  });

})
