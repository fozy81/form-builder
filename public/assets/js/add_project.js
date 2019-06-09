// find results and dislay in div id="results"
import { renderNav } from '/assets/js/components/navbar.js'
var $addForm = document.querySelector('#add_project')
var $subtitle = document.querySelector('#subtitle')
var locationHash = window.location.hash.replace('#', '')
/**
 * With hoodie we're storing our data locally and it will stick around next time you reload.
 * This means each time the page loads we need to find any previous notes that we have stored.
 */
function loadAndRenderItems () {
 render()
}
/* render items initially on page load */
loadAndRenderItems()

window.onhashchange = function () {
  locationHash = window.location.hash.replace('#', '')
  loadAndRenderItems()
}

function render() {
  let nav = document.querySelector('nav')
   /* render navbar */
  renderNav(nav)

        $subtitle.innerHTML = 'Add Project'
      $addForm.innerHTML = ' <form class="project-create"><div class="project" id="project_form">' +
       '<div id="Name">' +
        '<label for="input-question-1">Name</label>' +
        '<input type="text" name="question" id="project" required>' +
        '<label for="input-required-1">Description</label>' +
        '<input type="text" name="question" id="project-name" required>' +
        '</div></div>' +
        '<button id="submit" type="submit">Save Project</button>' +
        '<a href="project.html">' +
        '<button  id="cancel" type="submit">Cancel</button></a></form>'
  }

$addForm.addEventListener('submit', function (event) {
  /**
   * By default a form will submit your form data to the page itself,
   * this is useful if you're doing a traditional web app but we want to handle this in JavaScript instead.
   * if we're overriding this behaviour in JavaScript we need to grab the event
   * and prevent it from doing it's default behaviour.
**/
  event.preventDefault()
  // Get values from inputs, then clear the form
   var project = $addForm.querySelector('#project').value
   var projectName = $addForm.querySelector('#project-name').value
   var projectId = Math.floor(100000000 + Math.random() * 900000000)
  hoodie.store.add({project_desc: project,
    project_name: projectName,
    project_id: projectId,
    project_shortlink: projectId

    })

  location.assign("project.html#" + project)
})
/* global hoodie */
