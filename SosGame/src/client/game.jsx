import React, { Component } from 'react'
import { Button, Container, Row, Col, Spinner}  from 'react-bootstrap';
import { Link } from 'react-router-dom'
export default class Game extends Component {
    constructor(props) {
        super(props); 

        this.state = {
        errorMsg: null,
        game:null,
        players:null
      };

    } 
    
    componentDidMount() {
      this.startNewGame();
      }

    startNewGame = async () => {
      const url = "/api/games";

      let response;

      try {
          response = await fetch(url, {
              method: "post"
          });
      } catch (err) {
          this.setState({ errorMsg: "Error Code: " + err });
          return;
      }

      if (response.status !== 201) {
          this.setState({
              errorMsg: "Error Code: " + response.status
          });
          return;
      }
      const players = await this.getPlayers();
      const gameJson = await response.json();
      
      this.setState({ game: gameJson, errorMsg: null, players:players});
  };

      
      getPlayers = async () => {
        const url = "/api";

        let response;

        try {
              response = await fetch(url, {
                  method: "get"
              });
          } 
        catch (err) {
              this.setState({ errorMsg: "Error Code: " + err });
              return;
          }
      
      const players = response.json();
      return players
      }

    Sos = async (eventid) => {
      const click=this.state.game.click
      const url = "/api/games/ongoing";
      let response;

      document.addEventListener('contextmenu', 
      event => event.preventDefault());
      
      if (eventid.nativeEvent.which === 1 && click[eventid.target.value]!=="O" ) {
        click[eventid.target.value]="S";
      }
      if (eventid.nativeEvent.which === 3 && click[eventid.target.value]!=="S" ) {
        click[eventid.target.value]="O";
      }
      try {
        response = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ answer: click[eventid.target.value],
                                    index:eventid.target.value})
        });
    } catch (err) {
        this.setState({ errorMsg: "Error Code: " + err });
        return;
    }
    const gameJson = await response.json();
    this.setState(prev=>({ game: gameJson, errorMsg: null, players:prev.players }));
    }
    
    render() {
      if(!this.state.game && !this.state.players){
        return <h1>Loading...</h1>}
           return (
       <>
       <Row className='row align-items-center justify-content-center'>
        <Col className='col-3' xs={{ order: 'first' }}>
          <h2>{this.state.players.player1}</h2>
          <h1>{this.state.game.player1}</h1>
          <h4>{this.state.game.turn ? <Spinner animation="border" variant="danger" /> : <Spinner animation="grow" variant="dark" />}</h4>
        </Col>
        <Col className='col-3' xs={{ order: 'last' }}>
          <h2>{this.state.players.player2}</h2>
          <h1>{this.state.game.player2}</h1>
          <h4>{this.state.game.turn ? <Spinner animation="grow" variant="dark" /> : <Spinner animation="border" variant="danger" />}</h4>
        </Col>
      
        <Col className='d-flex' xs="auto">
          <Container className='justify-content-center'>
          {Array.from({length: this.state.players.amount}).map((_e2) =>
          (<Row><Col className='d-flex'>
             {Array.from({ length: this.state.players.amount }).map((_e1) => 
             (<Button 
                 onClick={(eventid)=>this.Sos(eventid)}
                 onContextMenu={(eventid)=>this.Sos(eventid)}
                 style={{minHeight: '58.5px',minWidth: '58.46px',threshold:1}}
                 value={this.state.game.value++} 
                 className='text-center justify-content-center' size="lg"
                 variant='outline-danger'>
                 {this.state.game.click[this.state.game.value-1]}</Button>))}
                 </Col></Row>
             ))}
          </Container>
        </Col>
       </Row>
       <br/>
       <Row className='align-items-center justify-content-center'>
         <Col>
            <Button size="md" onClick={()=>this.startNewGame()}>Reset Game</Button>
            <Link size="lg" className='btn btn-outline-dark' to={'/'} >Main Page</Link>
         </Col>
       </Row>
</>
      
        
    )
  }
}

