const games = new Map();
const {getSettings} = require('../api/home-api')
async function createGame() {
    
    const click = await createBoxes();
        
    const game={
              click,
              player1:0,
              player2:0,
              turn:true,
              value:0};
    games.set(0,game);
    return game;
}

function createBoxes()
    { const setting = getSettings.getSettings();
      const amount = setting.amount
      const box=[]
      for (let index = 0; index < amount*amount; index++)      
      {
        box.push(" ")
      }
      return box;
    }

function checkIsThere(value,game)
    {   
        const click = game.click
        const length = Math.pow(click.length,0.5)
        const numbers=[-length-1,-length,-length+1,-length+10]

      numbers.map(item => {

        if(click[value]==="S")
          { 
            
            if((click[+value+item+item] === click[value] && click[+value+item] === "O")
              ||(click[+value-item-item] === click[value] && click[+value-item] === "O"))
            {
              game.turn ? game.player1++ : game.player2++;
            }
          
          }
        else
          {
            
            if(click[+value-item] === "S" && click[+value+item] === "S")
            {
              game.turn ? game.player1++ : game.player2++;
            }
          }
          
      })

      return game
    }

function getGame() {
        return games.get(0);
    }
    
module.exports = {getGame,createGame,checkIsThere};