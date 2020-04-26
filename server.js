const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
var url = require('url');
const helmet = require('helmet');
const fs = require('fs');
var cookieParser = require('cookie-parser')    //for cookie parsing
var csrf = require('csurf')    //csrf module
var csrfProtection = csrf({ cookie: true })

const app = express();
const port = process.env.PORT || 3000;

const db = require("./db");
const dbName = "CD-Shop";
const collectionName = "AlbumStudio";

var mongodb = require('mongodb');
var ObjectId = mongodb.ObjectID;

app.use(cookieParser());
// EJS view template engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

db.initialize(dbName, collectionName, function(dbCollection) { // successCallback
    // get all items
    app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    dbCollection.find().toArray(function(err, result) {
        if (err) throw err;
        console.log(JSON.stringify(result));
        res.render('index', {contents:JSON.stringify(result)});
       
  
    });
});
   

    app.post("/add", csrfProtection, (request, response) => {
    const item = request.body;
    dbCollection.insertOne(item, (error, result) => { // callback of insertOne
        if (error) throw error;
        // return updated list
        dbCollection.find().toArray((_error, _result) => { // callback of find
            if (_error) throw _error;
            
        });
    });

      response.redirect('/');

});
var updatepath;

app.get('/update/:id', csrfProtection,(req, res) => {
  const edit_postId = req.params.id;
  console.log(req.params.id);
  // FIND POST BY ID
  var content = {};
  var urlpath = url.parse(req.url,true).query;

 
    updatepath = urlpath.studioname;
     dbCollection.findOne({ _id: new ObjectId(edit_postId) }, (error, result) => {
        if (error) throw error;
        // return item
       
        
          res.render('edit',{ csrfToken: req.csrfToken(),content : result});

    }); 
    
  console.log(content);
  
});

app.post('/update/:id', csrfProtection, (req, res) => {
   const itemId = req.params.id;
    const item = req.body;
    console.log("Editing item: ", itemId, " to be ", item);

    dbCollection.updateOne({  _id: new ObjectId(itemId)  }, { $set: item }, (error, result) => {
        if (error) throw error;
        // send back entire updated list, to make sure frontend data is up-to-date
        dbCollection.find().toArray(function(_error, _result) {
            if (_error) throw _error;
            res.redirect('/');
        });
    });
 

  
});


}, function(err) { // failureCallback
    throw (err);
});



app.get('/delete/:id', (req, res) => {
  var rawdata = fs.readFileSync('CD-Data.json');
  var student = JSON.parse(rawdata);
  var urlname = url.parse(req.url,true).query;

  if(urlname.studioname == 1) 
    findAndRemove(student.AlbumStudio,'title',req.params.id);
  else 
    findAndRemove(student.RemixAlbum,'title',req.params.id);

  let data = JSON.stringify(student);
  fs.writeFileSync('CD-Data.json', data);
  res.redirect('/');
});



app.get('/add', csrfProtection,(req, res) => {
  var data = url.parse(req.url,true).query;
  updatepath = data.studioname;
  res.render('add',{ csrfToken: req.csrfToken() });
});

/*app.post('/add', csrfProtection,(req, res) => {
  var addcontent = {title:'',artist:'',country:'',label:'',year:''};

  addcontent.title = req.body.title;
  addcontent.artist = req.body.artist;
  addcontent.country = req.body.country;
  addcontent.label = req.body.label;
  addcontent.year = req.body.year;

  var rawdata = fs.readFileSync('CD-Data.json');
  var student = JSON.parse(rawdata);

  if(updatepath == 1)
    student.AlbumStudio.unshift(addcontent);
  else 
    student.RemixAlbum.unshift(addcontent);

  let data = JSON.stringify(student);
  fs.writeFileSync('CD-Data.json', data);
  res.redirect('/');
});
*/
app.listen(port, error => {
  if (error) throw error;
  console.log('Server running on port ' + port);
});



