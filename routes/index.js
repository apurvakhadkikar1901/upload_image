if (process.env.NODE_ENV !== 'production') {
  require('dotenv').load();
}

const
      express = require('express')
    , router = express.Router()
    , azureStorage = require('azure-storage')
    , blobService = azureStorage.createBlobService()
    , containerName = 'thumbnails'
    , config = require('../config')
;

router.get('/', (req, res, next) => {

  blobService.listBlobsSegmented(containerName, null, (err, data) => {

    let viewData;

    if (err) {

      viewData = {
        title: 'Error',
        viewName: 'error',
        message: 'There was an error contacting the blob storage container.',
        error: err
      };
      
      res.status(500);

    } else {

      viewData = {
        title: 'Home',
        viewName: 'imageuploder',
        accountName: config.getStorageAccountName(),
        containerName: containerName
      };

      if (data.entries.length) {
        viewData.thumbnails = data.entries;
      }
      
    }

    res.render(viewData.viewName, viewData);
  });

});
router.get('/imageuploder',(req,res)=>{
  console.log(req.query);
  res.render('imageuploder',{userid:req.query.userid,orgname:req.query.Orgname});
})
router.get('/docuploder',(req,res)=>{
  console.log(req.query);
  res.render('docuploder',{userid:req.query.userid,orgname:req.query.Orgname});
})
router.get('/pdfuploder',(req,res)=>{
  console.log(req.query);
  res.render('pdfuploder',{userid:req.query.userid,orgname:req.query.Orgname});
})
router.get('/videouploder',(req,res)=>{
  console.log(req.query);
  res.render('videouploder',{userid:req.query.userid,orgname:req.query.Orgname});
})

module.exports = router;