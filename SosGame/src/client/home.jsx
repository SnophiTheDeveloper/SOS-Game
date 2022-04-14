import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {Dropdown,DropdownButton, Form, Container, Row, Col, Alert} from 'react-bootstrap'

export default class Home extends Component {
  
  constructor(props){
    super(props);
    this.state={
      player1:"",
      player2:"",
      amount:11,
      show:false
    }
  }

  onTextChange = event => {
    this.setState({  [event.target.id]: event.target.value.replace(/[^a-zA-Z]/ig,'')})

    if (event.target.value.length===10) {
      this.setState({ show:true});}
};

  onDropdownChange = (amount) =>{
    this.setState({amount: amount})
  }

  onClickHandle = async() => {
    const url = "/api";


      try {
        await fetch(url, {
          method: "post",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({player1:this.state.player1,
                                player2:this.state.player2,
                                amount:this.state.amount})
      });
      } catch (err) {
          this.setState({ errorMsg: "Error Code " + err });
          return;
      }

  }

  setShow()
  {
    this.setState({ show:false});
  }

  render() {
    var amount=this.state.amount
    const amounts = [11,10,9,8,7,6,5,4]
    
    return (
		<div>
        <h4>{this.state.show ? <Alert variant="danger" className='alert fade show' onClose={() => this.setShow()} dismissible> 
        <Alert.Heading>Max Characters Reached(10)</Alert.Heading>
        </Alert>:false}</h4>
        <Form >
        <br/>
        <Container className='justify-content-center align-items-center'>
          <Form.Group>
            <Row>
              <Col>
                <Form.Label  type="text" ><h2>Player 1</h2></Form.Label>
                <Form.Control size="lg" id='player1' maxLength="10" placeholder="Enter a nickname" 
                            value={this.state.player1} onChange={this.onTextChange}/>
              </Col>
              <Col>
                <Form.Label  type="text" ><h2>Player 2</h2></Form.Label>
                <Form.Control size="lg" id='player2' maxLength="10" placeholder="Enter a nickname"
                              value={this.state.player2} onChange={this.onTextChange} />
              </Col>
            </Row>
            <br/>
            <DropdownButton id="dropdown-basic-button" title={amount+"x"+amount}>
            {amounts.map((i)=><Dropdown.Item id="amount" onClick={()=>this.onDropdownChange(i)}>{i+"x"+i}</Dropdown.Item>)}
            </DropdownButton>
              <br/>
          </Form.Group>
          <Link size="lg" className='btn btn-outline-dark' onClick={(e)=>this.onClickHandle(e)} to={'/sos'} >Start Game</Link>
          </Container>
        </Form>

		</div>

)
  }
}

