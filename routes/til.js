var express = require('express');
var router = express.Router();

// var entries = [
//   {slug:"Entry One", body: "I learned that mips is a terrible language to program in.", created_at: "some date"},
//   {slug:"Entry Two", body: "I learned that astronaut Scott Kelly grew 2 inches while he was in space for a year.", created_at: "some date"}
// ];

var entries = [];

// /* READ all: GET entries listing. */
// router.get('/', function(req, res, next) {
//   res.render('til/index', { title: 'Today I Learned', entries: entries });
// });

/* READ all: GET entries listing. */
router.get('/', function(req, res, next) {
 req.db.driver.execQuery(
   "SELECT * FROM entries;",
   function(err, data){
     if(err){
       console.log(err);
     }
     res.render('til/index', { title: 'Today I Learned', entries: data });
   });
});



/* CREATE entry form: GET /til/new */
router.get('/new', function(req, res, next) {
  res.render('til/new', {title: "Create new entry"});
});

/*CREATE entry: POST /entries/ */
router.post('/', function(req, res, next) {
 req.db.driver.execQuery(
   "INSERT INTO entries (slug,body) VALUES ('" + req.body.slug + "','" + req.body.body + "');",
   function(err, data){
     if(err)
     {
       console.log(err);
     }
   }
 );

 req.db.driver.execQuery(
   "SELECT * FROM entries;",
   function(err, data){
     if(err){
       console.log(err);
     }
     res.render('til/index', { title: 'Today I Learned', entries: data });
   });
});

/* UPDATE entry form: GET /entries/1/edit */
router.get('/:id/edit', function(req, res, next) {

 req.db.driver.execQuery(
 'SELECT * FROM entries WHERE id=' + parseInt(req.params.id) + ';',
 function(err, data){
   if(err)
   {
     console.log(err);
   }

   res.render('til/update',
   {
     title: 'Update an entry',
     entry: data[0]
   });
 });
});

/* UPDATE entry: POST /entries/1 */
router.post('/:id', function(req, res, next) {
 var sqlstring = "UPDATE entries SET slug='" + req.body.slug + "',body='" + req.body.body + "' WHERE id=" + parseInt(req.params.id) + ";";
 console.log(sqlstring);

 req.db.driver.execQuery(
   sqlstring,
   function(err, data){
     if(err)
     {
       console.log(err);
     }
   });

 req.db.driver.execQuery(
   'SELECT * FROM entries WHERE id=' + parseInt(req.params.id) + ';',
   function(err, data){
     if(err)
     {
       console.log(err);
     }
     res.render('til/entry', {title: "a entry", entry: data[0]});
   });
});


/* DELETE entry: GET /entries/1/delete  */
router.get('/:id/delete', function(req, res, next) {
 req.db.driver.execQuery(
   'DElETE FROM entries WHERE id=' + parseInt(req.params.id) + ';',
   function(err, data){
     if(err)
     {
       console.log(err);
     }
   }
 );

 req.db.driver.execQuery(
   "SELECT * FROM entries;",
   function(err, data){
     if(err){
       console.log(err);
     }
     res.render('til/index', { title: 'Today I Learned', entries: data });
   });
});

/* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
/* READ one entry: GET /entries/0 */
router.get('/:id', function(req, res, next) {
 req.db.driver.execQuery(
   'SELECT * FROM entries WHERE id=' + parseInt(req.params.id) + ';',
   function(err, data){
     if(err)
     {
       console.log(err);
     }
     res.render('til/entry', {title: "a entry", entry: data[0]});
   });
});
//
// /*CREATE entry: POST /til/ */
// router.post('/', function(req, res, next) {
//   entries.push(req.body);
//   res.render('til/index', { title: 'Today I Learned', entries: entries });
// });
//
//
//
// /* UPDATE entry form: GET /til/1/edit */
// router.get('/:id/edit', function(req, res, next) {
//   res.render('til/update',
//   {
//     title: 'Update an entry',
//     id: req.params.id,
//     entry: entries[req.params.id]
//   });
// });
//
// /* UPDATE entry: POST /til/1 */
// router.post('/:id', function(req, res, next) {
//   entries[req.params.id] = req.body;
//   res.render('til/index',
//   {
//     title: 'Update an entry',
//     entries: entries
//   });
// });
//
// /* DELETE entry: GET /til/1/delete  */
// router.get('/:id/delete', function(req, res, next) {
//   var id = parseInt(req.params.id);
//   entries = entries.slice(0,id).concat(entries.slice(id+1, entries.length));
//   res.render('til/index', { title: 'Today I Learned', entries: entries });
// });
//
// /* THIS NEEDS TO BE LAST or /new goes here rather than where it should */
// /* READ one entry: GET /entries/0 */
// router.get('/:id', function(req, res, next) {
//   res.render('til/entry', {title: "a entry", id: req.params.id, entry: entries[req.params.id]});
// });

module.exports = router;
