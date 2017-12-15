import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Principal from './Principal';
/*import Login from "./login/Login";
import servicoLogin from "./login/ServicoLogin";
*/
class App extends Component {
  /*constructor(props){
        super(props);
        this.state={
            logado:servicoLogin.logado()
        };
    } 
    */
    render() {
        return <Principal/>;
     // return this.state.logado?<Principal/>:<Login onLogin={()=>this.setState({logado:true})} />;
      /*
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
        <ProdutoPagina nome="Carlos" />
        </p>
      </div>
    );*/
  }
}

export default App;
