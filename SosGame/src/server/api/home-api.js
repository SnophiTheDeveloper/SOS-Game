const express = require('express')
const router = express.Router();

const settings = new Map();

function getSettings() {
    return settings.get(0);
}

router.post('/',(req,res)=>{

    const setting= req.body
    settings.set(0,setting)
    res.status(201).json(settings) 
  
  });

router.get('/',(_req,res)=>{

    const setting = getSettings();

  if(!setting){
      res.status(404).send();
      return;
  }

  res.status(200).json(setting);
  
  });

module.exports.getSettings={getSettings};
module.exports.router = router;
