var express = require('express');
var router = express.Router();

/* GET home page. */
var dbb="mongodb+srv://admin:dunghaph13370@cluster0.mna3e.mongodb.net/mydata?retryWrites=true&w=majorityl"
const  mongoose = require('mongoose');
mongoose.connect(dbb).catch(err => {
  console.log("co loi xay ra "+err);
});
router.get('/', function(req, res, next) {
  var data=Img.find({},function (err,data){
    console.log(err)
    res.render('index', { title: 'Express' ,data :data});
  })

});
router.get('/add', function(req, res, next) {
  res.render('add', { title: 'Express' });
});
router.get('/editdata', function(req, res, next) {
  var data=Img.find({},function (err,data){
    console.log(err)
    res.render('editdata', { title: 'Express' ,data :data});
  })
});

// them anh ----------------------------------------------------------------------------------------
// tao khung schema
var imgSchema = new mongoose.Schema({
  tenAnh:'string',
  noiDung: 'string',
  ngaythang: 'string',
  linkAnh : 'string'
})
//lien ket Schema voi mongoDB qua mongoose
var Img = mongoose.model('img',imgSchema);
router.post('/addImg', function(req, res, next) {
  var tenAnh= req.body.tenAnh
  var noiDung = req.body.noiDung
  var ngayThang = req.body.ngayThang
  var linkAnh = req.body.linkAnh

  console.log(tenAnh + noiDung +ngayThang + linkAnh)
  const img = new Img({
    tenAnh:tenAnh,
    noiDung: noiDung,
    ngaythang: ngayThang,
    linkAnh : linkAnh
  })

  img.save(function (err){
    var mess;
    if (err==null){
      mess='Them thanh cong'
    }else {
      mess=err
    }
    console.log(mess)
    res.render('add', { title: 'Express' });
  })

});
//xoa anh------------------------------------------------------------------------------------
router.post('/deleteImg', function(req, res, next) {
  Img.deleteOne({_id:req.body.__id},function (err){
    if (err==null){
      console.log("Xoa thanh cong!")
    }else {
      console.log("Xoa that bai!")

    }
  })
  var data=Img.find({},function (err,data){
    console.log(err)
    res.render('editdata', { title: 'Express' ,data :data});

  })
});
// sua anh---------------------------------------------------------------------------
router.post('/editimg', function(req, res, next) {
  var imgEdit={
    id : req.body.__id,
    tenAnh : req.body.__tenAnh,
    noiDung : req.body.__noiDung,
    ngayThang : req.body.__ngayThang,
    linkAnh : req.body.__linkAnh
  }
  res.render('editimg', { title: 'Express' ,data : imgEdit});
});
router.post('/editimgdone', function(req, res, next) {
  Img.updateOne({_id:req.body.__idEdit},{tenAnh:req.body.__tenAnhEdit,noiDung : req.body.__noiDungEdit,
                                                      ngayThang: req.body.__ngayThangEdit,linkAnh:req.body.__linkAnhEdit},function (err){
    var data=Img.find({},function (err,data){
      console.log(err)
      res.render('editdata', { title: 'Express' ,data :data});
  })  })

});
//get all ====-------------------------------------------------------------
router.get('/getAll', function(req, res, next) {
  Img.find({},function (err,data){
    res.send(data)
  })

});






module.exports = router;
