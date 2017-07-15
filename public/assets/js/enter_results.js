var $selectList = document.querySelector('#select_form')
var $itemsList = document.querySelector('#form_id')
/**
 * With hoodie we're storing our data locally and it will stick around next time you reload.
 * This means each time the page loads we need to find any previous notes that we have stored.
 */

 function RenderItems () {
   hoodie.store.findAll().then(render_select)
 }

 RenderItems()

function loadAndRenderItems () {
  hoodie.store.findAll().then(render)

}

/* render items initially on page load */
loadAndRenderItems()


/**
 * Anytime there is a data change we reload and render the list of items
 */
hoodie.store.on('change', loadAndRenderItems)
hoodie.store.on('clear', function () {
  render([])
})
        function render_select (items){

         if (items.length === 0) {
           document.body.setAttribute('data-store-state', 'empty')
           return
         }

         document.body.setAttribute('data-store-state', 'not-empty')
  
         $selectList.innerHTML = items
      //    .map(function (item) {

            var form_names =   items.map(function(item){
              return item.form_name;
            })

            let unique = [...new Set(form_names)];

            options = ''
            for (var i = 0; i < unique.length; i++) {
              options += "<option value=" + unique[i] + "> " + unique[i] + "</option>"
            }

            //  return options
            $selectList.innerHTML = options


    //  }).join('')

$selectList.addEventListener('click', function (event) {
   event.preventDefault()
            loadAndRenderItems()
     })
   }



function render (items) {
  if (items.length === 0) {
    document.body.setAttribute('data-store-state', 'empty')
    return
  }


  document.body.setAttribute('data-store-state', 'not-empty')

  $itemsList.innerHTML = items
  //  .sort(orderByCreatedAt)
    .map(function (item) {
/*
      var form_names =   items.map(function(item){
        return item.form_name;
      })

    let unique = [...new Set(form_names)];
        options = ''
        for (var i = 0; i < unique.length; i++) {
          options += "<option value=" + unique[i] + "> " + unique[i] + "</option>"
         }

                 $selectList.innerHTML = options

        $selectList.addEventListener('click', function (event) {
           event.preventDefault()

        })
*/
//function render_form(){


        var selected_form =  $selectList.options[$selectList.selectedIndex].text
//&& item.form_name === selected_form
        if(typeof item.questions != 'undefined' && item.form_name === selected_form ) {
             var question = '';
             if (item.required === "on"){
             var required = 'required'  } else {
             var required = ''
             }

         for (var i = 0; i < item.questions.length; i++) {

           if (item.required[i] === true){
           var required = 'required'  } else {
           var required = ''
           }
       question += '<label for="input-title">' + item.questions[i] + '</label>' +
               '<input type='+  item.select[i]  + ' name="question" id="input-title" ' + required  + '></div><p></p>';
             };
       var form = '<h2 name="form-name" data-id="' + item._id + '">' + item.form_name + '</h2><p></p>' +
           '<div class="form-title">' +
           question +
             '<button id="submit" type="submit">Save</button>';
               return form } else {
                 return  }



       }).join('')

//}

    /*  .map(function (item) {

        return "<option value=" + item.form_name + "> "+ item.form_name + "</option>"
      }).join('')*/
};





var $addForm = document.querySelector('form.form-create')
$addForm.addEventListener('submit', function (event) {
  /**
   * By default a form will submit your form data to the page itself,
   * this is useful if you're doing a traditional web app but we want to handle this in JavaScript instead.
   * if we're overriding this behaviour in JavaScript we need to grab the event
   * and prevent it from doing it's default behaviour.
**/
  event.preventDefault()

  // Get values from inputs, then clear the form
  var form_name = $addForm.querySelector('[name=form-name]').innerHTML
  var number_of_questions = $addForm.querySelectorAll('[name=question]').length

  var response = []
  var question = []
  for (var i = 0; i < number_of_questions; i++) {

  response[i] = $addForm.querySelectorAll('[name=question]')[i].value
  question[i] = $addForm.querySelectorAll('label')[i].innerHTML

}
  $addForm.reset()

  hoodie.store.add({form_name: form_name,
    question: question,
    response: response});
})
