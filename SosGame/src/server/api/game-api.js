const express = require('express')
const {getGame,createGame,checkIsThere} = require('../components/game');
const router = express.Router();


function getPayload(game){

  return {
    click:game.click,
    player1:game.player1,
    player2:game.player2,
    turn:game.turn,
    value:game.value
  };
}

router.post('/games', async(_req, res) => {
 
  const game= await createGame();
  const payload = getPayload(game);
  res.status(201).json(payload);
});

router.post('/games/ongoing', (req, res) => {

  var game = getGame();
  const dto = req.body;
  const player1 = game.player1;
  const player2 = game.player2;
  if(game.click[dto.index]===" ")
  { 
    game.click[dto.index]=dto.answer
    game = checkIsThere(dto.index,game)
    
    if(player1 !== game.player1 || player2 !== game.player2)
    {
      game.turn = game.turn ? true : false;
    }
    else
    {
      game.turn = game.turn ? false : true;
    }
    const payload = getPayload(game);
    res.status(201).json(payload);
  }
  else
  {
    const payload = getPayload(game);
    res.status(201).json(payload);
  }
  
  
});

module.exports = router;