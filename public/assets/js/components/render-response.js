export function renderResponse(formRows) {
 let responseTable = ''
  for (let i = 0; i < formRows[0].questions.length; i++) {
   let response_id = formRows[0].questions[i].response_id
   let response = formRows[0].questions[i].response
   responseTable += '<div>' + formRows[0].questions[i].question + ': ' + response  + '</div>'
  }
 return responseTable
}
