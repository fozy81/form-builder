import { pageData } from '/assets/js/components/data.js'
import { renderNav } from '/assets/js/components/navbar.js'
import { renderBreadcrumb } from '/assets/js/components/breadcrumb.js'
import { renderPanel } from '/assets/js/components/panels.js'
import { actionMenu } from '/assets/js/components/action-menu.js'
import { addPanel } from '/assets/js/components/add-panel.js'
import { renderForms } from '/assets/js/components/render-forms.js'
import { renderQuestions } from '/assets/js/components/render-questions.js'
/* get data and render page*/
function loadAndRenderItems() {
   pageData().then(render)
 }

loadAndRenderItems()
/* Anytime there is a data change we reload and render the list of items */
hoodie.store.on('change', loadAndRenderItems)
hoodie.store.on('clear', function () {
  render([])
})

function render (items) {

  if (items.length == null) {
    document.body.setAttribute('data-store-state', 'empty')
    return
  }

  document.body.setAttribute('data-store-state', 'not-empty')
  /* we need to select html element to display navbar */
 let nav = document.querySelector('nav')
  /* render navbar */
 renderNav(nav)
 /* we need to select html element to display breadcrumb */
 let breadcrumb = document.querySelector('h2')
 /* render breadcrumbs nav */
 renderBreadcrumb(breadcrumb, items)
 /* we need to select html element to display panels */
 let panels = document.querySelector('#panels')
 let cardType = 'container'
 /* panel/link for adding new forms */
 addPanel(panels, cardType)
  /* render panels */
 let actionMenus = actionMenu(items)
 renderPanel(items, panels, cardType, actionMenus)
 renderForms(items)
 renderQuestions(items)


}
