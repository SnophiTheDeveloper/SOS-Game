import { HashRouter } from "react-router-dom";
import ReactDOM from "react-dom";
import {Route, Routes} from "react-router";
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react'
import Home from './home'
import Games from './game'

class App extends React.Component {

   render(){
	  return(
	  <HashRouter>
            <div>
                <Routes>
                    <Route exact path='/sos'  element={<Games/>}/>
                    <Route exact path='/' element={<Home/>}/>
                    <Route path="*" element={<div> <h2>Page not found: 404</h2></div>}/>
                </Routes>
            </div>
        </HashRouter>);
 }
	
  
}

ReactDOM.render(<App />, document.getElementById("root"));
