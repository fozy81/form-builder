import { renderPanel } from '/assets/js/components/panels.js'
import { actionMenu } from '/assets/js/components/action-menu.js'

export function renderForms(items) {
  // prepare form data ready for renderPanel function
 function dataForms(items) {
  let forms = []
  for (var i = 0; i < items.length; i++) {
   for (var j = 0; j < items[i].forms.length; j++) {
    forms.push(items[i].forms[j])
     }
   }
   items = forms
   for (var i = 0; i < items.length; i++) {
      items[i].id = items[i].container_id
      items[i].title = items[i].form_name_id
      items[i].desc = items[i].form_desc
   }
   return items
 }

  items = dataForms(items)
  console.log(items)
  window.addEventListener('click', function(event) {
    let container = event.target
    // remove forms if user clicks a second time
    if (container.className === 'containerlinkinactive') {
      container.className = 'containerlink'
      let forms = document.getElementsByClassName("panelform")
      while(forms.length > 0){
       forms[0].parentNode.removeChild(forms[0])
     }
     return
   }
   if (event.target.matches('.containerlink')) {
     container.className = 'containerlinkinactive'
     //  display forms using renderPanel dropdownFunction
     let cardType = 'form'
     let containerTableData = event.target.offsetParent
     // only render forms for this container
     console.log(event.target.innerHTML)
     let item = items.filter(item => item.container_id == event.target.innerHTML)
     let actionMenus = actionMenu(item)
     renderPanel(item, containerTableData, cardType, actionMenus)

    }
    return
  })
}
