import { renderNav } from '/assets/js/components/navbar.js'
import { renderBreadcrumb } from '/assets/js/components/breadcrumb.js'
/* we need to select html element to display list of projects */
var $itemsList = document.querySelector('#project')
/* we need to select html element to display subtitle nav */
//var $subtitle = document.querySelector('#subtitle')
/* make parsing the URL easier - remove '#' */
var locationHash = window.location.hash.replace('#', '')
/* With hoodie we're storing our data locally and it will stick around next
  time you reload. This means each time the page loads we need to find any
  previous data that we have stored. */
function loadAndRenderItems () {
  hoodie.store.findAll(function(project) {
    // if hash includes project return that project
    if (locationHash !== '') {
     return project.project_id === locationHash
   } else {
     return project
   }
  }).then(render)
}
/* render items initially on page load */
loadAndRenderItems()
/* re-render if hash changes */
window.onhashchange = function () {
  locationHash = window.location.hash.replace('#', '')
  loadAndRenderItems()
}
/* Anytime there is a data change we reload and render the list of items */
 hoodie.store.on('change', loadAndRenderItems)
// hoodie.store.on('change', loadAndRenderItems)
hoodie.store.on('clear', function () {
  render([])
})

function render (items) {
  /* if no items in the database then return empty status */
    if (items.length == null) {
      document.body.setAttribute('data-store-state', 'empty')
      return
    }

    let nav = document.querySelector('nav')
     /* render navbar */
    renderNav(nav)
    /* we need to select html element to display breadcrumb */
    let breadcrumb = document.querySelector('h2')
    /* render breadcrumbs nav */
    renderBreadcrumb(breadcrumb)
// get unique projects info
     var projects = items.reduce(function(previous, current) {
       var object = previous.filter(object => object.project_id === current.project_id);
       if (object.length == 0) {
         previous.push(current);
       }
       return previous;
     }, []);

// make menu for each project
  let projectActionMenu = []
  for (var i = 0; i < projects.length; i++) {
     projectActionMenu.push('<div class="dropdown">' +
     '<button onclick="myFunction('+ i + ')" class="dropbtn">...</button>' +
     '<div id="myDropdown' + i + '" class="dropdown-content">' +
       '<a href="#">Details</a>' +
       '<a href="#">Repeat</a>' +
       '<a href="#">Print...</a>' +
       '<a href="#">Archive</a>' +
       '<a href="#">History</a>' +
     '</div>' +
   '</div>')
   }
    let tableRows = '<div><table><tr><td><a href="add_project.html' +
     '">Create new project...</td></tr></table></div>'
    // for each project return a html object
    for (var i = 0; i < projects.length; i++) {
      tableRows += '<div><table><tr><td><a href="items.html#' +
    projects[i].project_id + '"><div class="projectcard"><b>' +
    projects[i].project_name +
    '</b><br>' +  projects[i].project_desc + '<br>'  +
    projects[i].start_date + '</div></td></a>' +
    '<td><div class="dropdown">' + projectActionMenu[i] +
    '</div></td></tr></table></div>'
    }
  //  $subtitle.innerHTML = '<a href="project.html">Projects</a>'
    $itemsList.innerHTML = tableRows
  }

  /* When the user clicks on the button,
  toggle between hiding and showing the dropdown content */
  function myFunction(id) {
      document.getElementById("myDropdown" + id).classList.toggle("show")
   }

  // Close the dropdown menu if the user clicks outside of it
  window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }


/* global hoodie */
