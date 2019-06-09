export function actionMenu(items) {
 let actionMenu = []
 for (var i = 0; i < items.length; i++) {
    actionMenu.push('<div class="dropdown">' +
    '<button id="' + i + '" class="dropbtn">...</button>' +
    '<div id="myDropdown ' + i + '" class="dropdown-content">' +
      '<a href="#">Details</a>' +
      '<a href="#">Repeat</a>' +
      '<a href="#">Print...</a>' +
      '<a href="#">Archive</a>' +
      '<a href="#">History</a>' +
     '</div>' +
    '</div>')
    }
  // Close the dropdown menu if the user clicks outside of it
  window.addEventListener('click', function(event) {
    if (!event.target.matches('.dropbtn')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    } else {
        document.getElementById('myDropdown ' + event.target.id).classList.toggle("show")
    }
  })
  return actionMenu
}
