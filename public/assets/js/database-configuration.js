/* global hoodie */
// configure the database with pre-defined values and possibly example froms etc
// first add list of International System of Units

const unitStore = hoodie.store.withIdPrefix('units/')
console.log('Hello from config db')

unitStore.findOrAdd({
  doc: 'International System of Units',
  units: {
    unit: [{
      unitName: 'none',
      unit: 'NA',
      quantityName: 'NA',
      definition: 'No unit selected, usually indicates a categorical measurement e.g high, medium, low or free text'},
    {
      unitName: 'metre',
      unit: 'm',
      quantityName: 'length',
      definition: 'The distance travelled by light in a vacuum in 1/299792458 second.'},
    {
      unitName: 'centimetre',
      unit: 'cm',
      quantityName: 'length',
      definition: '0.01 metres'},
    {
      unitName: 'kilometre',
      unit: 'km',
      quantityName: 'length',
      definition: '1000 metres'},
    {
      unitName: 'kilogram',
      unit: 'kg',
      quantityName: 'mass',
      definition: 'The mass of the International Prototype Kilogram (Le Grand K).'},
    {
      unitName: 'gram',
      unit: 'g',
      quantityName: 'mass',
      definition: '0.001 kilogram'},
    {
      unitName: 'second',
      unit: 's',
      quantityName: 'time',
      definition: 'The duration of 9192631770 periods of the radiation corresponding to the transition between the two hyperfine levels of the ground state of the caesium-133 atom.'},
    {
      unitName: 'kelvin',
      unit: 'k',
      quantityName: 'thermodynamic temperature',
      definition: '1/273.16 of the thermodynamic temperature of the triple point of water'}]
  }, _id: 'formBuilder-units-1'
})
