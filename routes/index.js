var express = require('express');
const { Mongoose } = require('mongoose');
var router = express.Router();
const mongoose = require('mongoose');
const Data = mongoose.model('Data');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Data Tree' });
});

router.get('/insert', function(req,res){
  res.render('insert');
});

router.post('/insert', function(req,res){
  insertRecord(req, res);
});

router.get('/list', function(req,res){
  Data.find((err, docs)=>{
    if(!err){
      res.render('list', {
        list: docs
      });
    }
    else{
      console.log('Error in retrieving node list' + err);
    }
  });
});

router.get('/parent', function(req,res){
  let parent = req.params.id;
  Data.find({parent: parent}, (err, docs)=>{
    if(!err){
      res.render('parent', {
        list: docs
      });
    }
    else{
      console.log('Error in retrieving node list' + err);
    }
  });
});

router.get('/update/:id', (req, res) => {
  Data.findById(req.params.id, (err, doc) =>{
      if(!err){
          res.render('update',{title: 'Update Node', data: doc});
      }
  });   
});



router.post('/update', (req, res)=>{
  updateProduct(req,res);
});

function updateProduct (req,res) {
  Data.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, (err, doc) => {
      if(!err){
          res.redirect('list');
      }else{
          console.log('Error during updating node: ' + err);
      }
  });
}


function insertRecord(req,res){
    var data = new Data();
    data.nodeName = req.body.nodeName;
    data.description = req.body.description;
    data.parent = req.body.parent;
    data.readOnly = req.body.readOnly;
    data.save((err, doc)=> {
      if(!err)
        res.redirect('list');
      else {
        console.log('Error during record insertion : ' + err);
      }
    });
}

router.get('/delete/:id', (req, res) => {
  Data.findByIdAndRemove(req.params.id, (err, doc) => {
      if (!err) {
          res.redirect('/list');
      }
      else { console.log('Error in deleting product :' + err); }
  });
});





module.exports = router;
