var express = require('express');
var router = express.Router();



var entries = [];

/* READ all: GET entries listing. */
router.get('/', function(req, res, next) {
 req.db.driver.execQuery(
   "SELECT * FROM entries ; ",
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
   "INSERT INTO entries (slug,body) VALUES (? , ?);",
   [req.body.slug, req.body.body],
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


module.exports = router;
