export function renderSelectList(listName = 'units') {
 const unitsStore = hoodie.store.withIdPrefix(listName + '/' )
 let selector = document.querySelector('select')
 unitsStore.findAll().then(renderDataList)

function renderDataList(results) {
  let options = ''
  options += '<datalist id="questionlist">'
  let unitName = []
  for (var i = 0; i < results[0].units.unit.length; i++) {
    unitName[i] = results[0].units.unit[i].unitName
  }
  let value = ''
  for (i = 0; i < unitName.length; i++) {
    value += '<option value=' + unitName[i] + '> ' + unitName[i] + '</option>'
  }
  options += value
  options += '</datalist>'
  selector.innerHTML += options
  let saveButton ='<button class="save">Save</button><p></p></div>'
  selector.insertAdjacentHTML('afterend', saveButton)
  }
}
