/* we need to select html element to display list of projects */
var $itemsList = document.querySelector('#items')
/* we need to select html element to display subtitle nav */
var $subtitle = document.querySelector('#subtitle')
/* make parsing the URL easier - remove '#' */
var locationHash = window.location.hash.replace('#', '')
locationHash = locationHash.replace('%20', ' ')
console.log(locationHash)
/* With hoodie we're storing our data locally and it will stick around next
  time you reload. This means each time the page loads we need to find any
  previous data that we have stored. */
  function loadAndRenderItems () {
    hoodie.store.findAll(function(project) {
      // if hash includes project return that project
         return project.project_id == locationHash
     }).then(render)
  }
  /* render items initially on page load */
  loadAndRenderItems()
  /* re-re-render if hash changes */
  window.onhashchange = function () {
    locationHash = window.location.hash.replace('#', '')
    locationHash = locationHash.replace('%20', ' ')
    loadAndRenderItems()
  }
  /* Anytime there is a data change we reload and render the list of items */
  hoodie.store.on('change', loadAndRenderItems)
  hoodie.store.on('clear', function () {
    render([])
  })

  function render (items) {
    /* if no items in the database then return empty status */
      if (items.length == null) {
        document.body.setAttribute('data-store-state', 'empty')
        return
      }

      var item = items.reduce(function(previous, current) {
        var object = previous.filter(object => object.item_id === current.item_id);
        if (object.length == 0) {
          previous.push(current);
        }
        return previous;
      }, []);

      console.log(item)
      console.log(item.length)

      let tableRows = '<div><table><tr><td><a href="add_item.html#' +
      locationHash + '">Add item</td></tr></table></div>'
      // for each project return a html objects
      let itemActionMenu = []
      //
       console.log(tableRows)
        if(item.length !== 0) {
           console.log(tableRows)
         for (var i = 0; i < item.length; i++) {
          itemActionMenu.push('<div class="dropdown">' +
          '<button onclick="myFunction('+ i +')" class="dropbtn">...</button>' +
          '<div id="myDropdown' + i + '" class="dropdown-content">' +
          '<a href="#">Details</a>' +
          '<a href="#">Replicate</a>' +
          '<a href="#">Print...</a>' +
          '<a href="#">Archive</a>' +
          '<a href="#">History</a>' +
          '<a href="geo:' + item[i].lat + ',' + item[i].lon + '">Mobile Map</a>' +
          '</div></div>')
       }

        for (var i = 0; i < item.length; i++) {
          tableRows += '<div><table><tr><td><div class="projectcard"><a href="form.html#' +
          item[i].item_id + '">' +   item[i].item_name +
          '</a>' + itemActionMenu[i] + '</div><br>' + item[i].item_desc +
          '<div class="dropdown">' + '</div>' + '</td></tr></table></div>'
       }


      $subtitle.innerHTML = '<a  href="project.html" >Projects </a>' +
     '|' + '<a  href="item.html#' +  item[0].project_id + '" > Items</a>'
     console.log(tableRows)
      $itemsList.innerHTML = tableRows
    } else {
      $itemsList.innerHTML = tableRows
      $subtitle.innerHTML = '<a  href="project.html" >Projects </a>' +
     '|' + ' Items'
    }

    }

    /* When the user clicks on the button,
    toggle between hiding and showing the dropdown content */
    function myFunction(id) {
      document.getElementById("myDropdown" + id).classList.toggle("show");
    }

    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
      console.log(event)
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
