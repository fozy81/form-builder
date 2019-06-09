// add event listen to save button to save Responses
export function saveResponses(items, formID, saveButton){
  console.log(formID)
  console.log(items)

  console.log(saveButton)
  for  (let i = 0; i < saveButton.length; i++) {
    saveButton[i].addEventListener('click', function (event) {
    event.preventDefault()

    function getResponses() {
      let responses = document.querySelectorAll('.response')
      return responses
    }

    let responses = getResponses()
    console.log(responses[0].id)
    console.log(responses)

    function saveResponse(responses, items) {
      let response_rep = Math.floor(100000000 + Math.random() * 900000000)
      items.forEach(function(item) {
      console.log(item)
      let allowMultipleResponse = []
      for (var i = 0; i < responses.length; i++) {
        console.log(responses)
        console.log(responses[i].previousSibling.innerHTML)
        for (var j = 0; j < item.forms.length; j++) {
          for (var k = 0; k < item.forms[j].questions.length; k++) {
            if (item.forms[j].questions[k].response_id == responses[i].id) {
              item.forms[j].questions[k].response = responses[i].value
              console.log(item.forms[j].questions[k])
            } else if(item.forms[j].questions[k].question == responses[i].previousSibling.innerHTML &&
                allowMultipleResponse.indexOf(responses[i].previousSibling.innerHTML) < 0) {
                allowMultipleResponse.push(responses[i].previousSibling.innerHTML)
                console.log('add new responses for allowMultipleResponse')
                item.forms[j].questions.push({
                  question: item.forms[j].questions[k].question,
                  response_id: responses[i].id,
                  response_type: item.forms[j].questions[k].response_type,
                  required: item.forms[j].questions[k].required,
                  allowMultipleResponse: item.forms[j].questions[k].allowMultipleResponse,
                  unit: item.forms[j].questions[k].unit,
                  response: responses[i].value,
                  response_rep: response_rep
                })
               }
          }
        }
       }
     })
    } // end of save response function!
         saveResponse(responses, items)
         hoodie.store.update(items)
     //  console.log(items[0].forms[0].questions[0].response)
     // console.log(currentform[0].id)
      console.log(formID)
         // location.reload()
         document.querySelector('#' + formID + '').click()
         document.querySelector('#' + formID + '').click()

   })
 } // end of save button event listner!
}
