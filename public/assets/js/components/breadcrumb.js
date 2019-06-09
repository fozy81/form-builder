/* add breadcrumb nav */
export function renderBreadcrumb(breadcrumb, items) {
  var locationHash = window.location.hash.replace('#', '')
  locationHash = locationHash.replace('%20', ' ')
  let project = '<a href="project.html">Projects </a>'

  breadcrumb.innerHTML = project
  console.log(items)

  if(window.location.pathname === '/items.html') {
    let crumb = '| <a href="items.html# ' + locationHash + '">Items</a>'
    breadcrumb.innerHTML += crumb
  }
  if(window.location.pathname === '/form.html') {

    let crumb = '| <a href="items.html#' +  items[1].project_id  +
       '">Items</a> |'  +
    '<a href="form.html#' + locationHash + '">Forms</a>'
    breadcrumb.innerHTML += crumb
  }
return breadcrumb
}
