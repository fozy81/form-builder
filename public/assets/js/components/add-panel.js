export function addPanel(panels, cardType){
  // panel for adding new project, item, form etc...
   var locationHash = window.location.hash.replace('#', '')
   locationHash = locationHash.replace('%20', ' ')
   panels.innerHTML +=  '<div><table><tr><td><a href="add_' + cardType + '.html#' +
   locationHash + '">Add item</td></tr></table></div>'
   return panels
  }
  
