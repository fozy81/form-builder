export function pageData() {
    // return item if project_id equals locationHash
    if (window.location.pathname === '/test.html') {
      function projectData(){
        return  hoodie.store.findAll(function(project) {
         // must have at least project_id
         return project.project_id != null
       })
      }
      // filter items for unique projects_id
      function uniqueProject(items) {
        var projects = items.reduce(function(previous, current) {
        var object = previous.filter(object => object.project_id ===
                                              current.project_id)
            if (object.length === 0) {
              previous.push(current)
            }
           return previous
          }, [])
        return projects
      }
      // count not null responses Vs questions...todo
      function countResponses(items, projects) {
        for (var i = 0; i < projects.length; i++) {
           for (var j = 0; j < items.length; i++) {
            item[j].forms.questions
          }
        }
      }
      // renaming data for panels
      function projectPanels(cards) {
         for (var i = 0; i < cards.length; i++) {
           cards[i].id = cards[i].project_id
           cards[i].title = cards[i].project_name
           cards[i].desc = cards[i].project_desc
      }
       return cards
      }
   return projectData().then(
           function(items){
             return uniqueProject(items)
           }).then(function(items){
              return projectPanels(items)
            })
    }

    if (window.location.pathname === '/items.html') {
      function projectData(){
        var locationHash = window.location.hash.replace('#', '')
        locationHash = locationHash.replace('%20', ' ')
        return  hoodie.store.findAll(function(project) {
         // must have at least project_id
         return project.project_id == locationHash
       })
      }

      // filter items for unique projects_id
      function uniqueItem(items) {
        var projects = items.reduce(function(previous, current) {
        var object = previous.filter(object => object.item_id ===
                                              current.item_id)
            if (object.length === 0) {
              previous.push(current)
            }
           return previous
          }, [])
        return projects
      }
      // item panel info
      function itemPanels(cards) {
         for (var i = 0; i < cards.length; i++) {
           cards[i].id = cards[i].item_id
           cards[i].title = cards[i].item_id
           cards[i].desc = cards[i].item_desc
      }
       return cards
      }
      return projectData().then(
              function(items){
                return uniqueItem(items)
              }).then(function(items){
                 return itemPanels(items)
               })
  }

    if (window.location.pathname === '/form.html') {
      function projectData(){
        var locationHash = window.location.hash.replace('#', '')
        locationHash = locationHash.replace('%20', ' ')
          console.log(locationHash)
        let hash = locationHash.substring(0, locationHash.lastIndexOf('/'));
        console.log(hash.length)
        if(hash.length === 0) {
          hash = locationHash
        }
        return  hoodie.store.findAll(function(project) {
         // must have at least project_id
         return project.item_id == hash
       })
      }
      // item panel info
      function itemPanels(cards) {
         for (var i = 0; i < cards.length; i++) {
           cards[i].id = cards[i].forms[0].container_id
           cards[i].title = cards[i].forms[0].container_id
           cards[i].desc = cards[i].forms[0].container_desc
      }
       return cards
      }
      return projectData()
       .then(function(items){
          return itemPanels(items)
        })
    }
}

/* global hoodie */
