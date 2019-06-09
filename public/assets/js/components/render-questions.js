import { questionForms } from '/assets/js/components/question-forms.js'
import { renderSelectList } from '/assets/js/components/render-select-list.js'
import { saveResponses } from '/assets/js/components/save-responses.js'
export function renderQuestions(items) {
  window.addEventListener('click', function(event) {
      let formEvent = event.target
       // remove forms if user clicks a second time
      if (formEvent.className === 'formlinkinactive') {
        formEvent.className = 'formlink'
        let forms = document.getElementsByClassName("questions")
        while(forms.length > 0){
         forms[0].parentNode.removeChild(forms[0])
        }
       return
      }
      if (event.target.matches('.formlink')) {
       let formEvent = event.target
       formEvent.className = 'formlinkinactive'
       // prepare form data ready for to render dataForms function
       function dataForms(items) {
        let forms = []
        for (var i = 0; i < items.length; i++) {
          for (var j = 0; j < items[i].forms.length; j++) {
            forms.push(items[i].forms[j])
         }
       }
        items = forms
        for (var i = 0; i < items.length; i++) {
          items[i].id = items[i].form_id
          items[i].title = items[i].form_name_id
          items[i].desc = items[i].form_desc
        }
       return items
      }
    let formItems = dataForms(items)
    // only form data for form selected in addEventListener
    let formRows = formItems.filter(item => item.form_name_id == event.target.innerHTML)
    // generate form
    let questions = questionForms(formRows)

    let formTableData = event.target.offsetParent

    formTableData.insertAdjacentHTML('beforeend', questions)
      let saveButton = document.querySelectorAll('.save')
      let formID = event.target.innerHTML

      saveResponses(items, formID, saveButton)
      renderSelectList()

   }
  })
}
