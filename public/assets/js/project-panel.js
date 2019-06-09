


function panels(data) {
let pathname = window.location.pathname
let panel = newPanel(pathname)
panel += panels(pathname, data)

// panel for adding new projects, items, forms
function newPanel(pathname) {
  if(pathname === '/project') {
    let newPanel = '<div><table><tr><td><a href="add_project.html' +
                   '">Create new project...</td></tr></table></div>'
    return newPanel
  }
}

function panelMenu(data, pathname) {
  let panelMenu = []
  for (var i = 0; i < data.length; i++) {
     panelMenu.push('<div class="dropdown">' +
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
}
// create an option menu for panels
function panel(data, pathname) {
// for each project return a html object
for (var i = 0; i < projects.length; i++) {
 projectPanels +=
  '<div><table><tr><td>' +
  '<a href="item.html#' +
  projects[i].project_id +
  '"><div class="projectcard"><b>' +
  projects[i].project_name + '</b><br>' +
  projects[i].project_desc + '<br>' +
  projects[i].start_date + '</div></td></a>' +
  '<td><div class="dropdown">' + projectActionMenu[i] +
  '</div></td></tr></table></div>'
  }
 }
}
