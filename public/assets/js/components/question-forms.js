import { renderResponse } from '/assets/js/components/render-response.js'
export function questionForms(formRows) {
  // Count unique questions in form.
  // If number of unique questions is lower than total questions
  // then multiple responses present.
  // If at least one responses not null, then any new reponses will require
  // a freshly generated response_id (uuid).
  // The first set of response(s) already has a response_id generated when first
  // added to the item. Although the response(s) initially are empty ("").
 formRows[0].questionsUnique = []
 for (let i = 0; i < formRows[0].questions.length; i++) {
  if(formRows[0].questionsUnique.indexOf(formRows[0].questions[i].question) < 0) {
     formRows[0].questionsUnique.push(formRows[0].questions[i].question)
   }
 }
  // store question html
 formRows[0].questionHtml = ''
 let questionhtml = ''
 // sort by question position
  formRows[0].questions.sort(function(a, b) {
   return a.question_pos - b.question_pos
  })

 for (let i = 0; i < formRows[0].questions.length; i++) {
   let response = formRows[0].questions[i].response
   if (response == null) {
     response = ''
   }
   let response_id = formRows[0].questions[i].response_id
     // depending if question allows mulitple responses may need new uuid
   if(formRows[0].questions.length != formRows[0].questionsUnique.length) {
     response = ''
     response_id = Math.floor(100000000 + Math.random() * 900000000)
   }
    if(i < formRows[0].questionsUnique.length){
        questionhtml += questionInput(formRows, i, response, response_id)
    }
  }

function saveButton(questions) {
 questions += '<button class="save">Save</button><p></p></div>'
 return questions
}

questionhtml = saveButton(questionhtml)
for (let i = 0; i < formRows[0].questions.length; i++) {
  // previously entered multi response - display in table
 if (i === formRows[0].questionsUnique.length + 1) {
   questionhtml += renderResponse(formRows)
 }
}
return questionhtml

  function questionInput(formRows, i, response, response_id) {
    let questions = ''
    let inputType = 'input'
    if(formRows[0].questions[i].response_type == 'select') {
          inputType = 'select' // if drop down selector input type
    }
    questions += '<div class="questions">' +
    '<label for="input-title">' + formRows[0].questions[i].question +
    '</label>' + '<' +
    inputType +' id="' + response_id +
    '" value= "' + response +
    '" list="questionlist' +
    '" class="response" type=' +
    formRows[0].questions[i].response_type +
    ' name="question" id="input-title" data-form="' + formRows[0].form_name_id + '">'
    if (formRows[0].questions[i].unit != 'none') {
       questions += '<h4  id="units">Units: ' +
       formRows[0].questions[i].unit + '</h4>'
    }
     questions += '<p></p>'
     return questions
   }
}
