const express = require("express");
const router = express.Router();

class weixinWebApi {
    constructor(){
        
    }
}
router.get('/test',function(req, res, next){
    res.sendFile('test.html',{ root: __dirname })
})
module.exports = router