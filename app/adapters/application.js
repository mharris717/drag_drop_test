var db = new PouchDB('http://localhost:5984/carddb');
//var db = new PouchDB("carddb");
console.log(db.adapter);

export default EmberPouch.Adapter.extend({
  db: db
});