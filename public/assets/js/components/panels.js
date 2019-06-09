export function renderPanel(items, panels, cardType, actionMenus) {
   // for each item return a html 'panel'
  let startDate = ''
  let pageLink = ''

   for (var i = 0; i < items.length; i++) {
     if(cardType === 'project') {
       startDate = items[i].start_date
       pageLink = 'item'
     }

     if(cardType === 'item') {
       startDate = items[i].start_date
       pageLink = 'form'
     }

     if(cardType === 'form') {
       startDate = ''
       pageLink = 'form'
       let locationHash = window.location.hash.replace('#', '')
       locationHash = locationHash.replace('%20', ' ')
       let hash = locationHash.substring(0, locationHash.lastIndexOf('/'));
       if (hash.length === 0) {
        hash = locationHash
       }
       items[i].id = hash + '/' + items[i].id
     }

     if(cardType === 'container') {
       startDate = ''
       pageLink = 'form'
       let locationHash = window.location.hash.replace('#', '')
       locationHash = locationHash.replace('%20', ' ')
       let hash = locationHash.substring(0, locationHash.lastIndexOf('/'));
       if (hash.length === 0) {
        hash = locationHash
       }
       items[i].id = hash + '/' + items[i].id
     }

     panels.innerHTML += '<div class="panel' + cardType + '"><table><tr><td ' +
      'class="'+ cardType + '"><div><a id="' +  items[i].title + '" class="' + cardType +
       'link" href="' + pageLink + '.html#' +
     items[i].id + '">' + items[i].title +
     '</a>' + actionMenus[i] + '</div><br>' + items[i].desc +
     '<br>' + startDate + '<div class="dropdown">' + '</div><br>' +
      '</td></tr></table></div>'
    }
   return panels
 }
