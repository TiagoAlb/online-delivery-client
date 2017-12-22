/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from "react";
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import Button  from 'material-ui/Button';
import TextField from 'material-ui/TextField';

export default class EntregadorItem extends React.Component {
        
        constructor(props){
            super(props);
            this.state={
                entregador:this.props.entregador
            }
            
        }
        
        componentWillReceiveProps(proximoEstado){
            this.setState({entregador:proximoEstado.entregador});
            
        }
        
        setNome(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.entregador.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setCpf(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.entregador.cpf=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setRg(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.entregador.rg=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setEmail(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.entregador.email=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setCnh(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.entregador.cnh=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setCrlv(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.entregador.crlv=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setLogin(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.entregador.login=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setSenha(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.entregador.novaSenha=valor;
                            return anterior;
                            }
                    );
            
        }
  
        confirmar(){
            if(this.state.entregador.nome&&
                  this.state.entregador.cpf&&
                    this.state.entregador.rg&&
                      this.state.entregador.email&&
                        this.state.entregador.cnh&&
                          this.state.entregador.crlv&&
                            this.state.entregador.login&&
                                this.state.entregador.novaSenha){
                    if(this.state.entregador.id){
                        this.props.editar(this.state.entregador.id, this.state.entregador);
                    }
                    else {
                        this.props.inserir(this.state.entregador);
                        }
                    } else {
                        alert("Preencha todos os campos!");
                    }
                        
            
            
        }
        
        
        render(){
            return <Dialog open={this.props.abrir}>
            <DialogTitle>{this.state.entregador.id?`Editar cadastro ${this.state.entregador.nome}`:"Novo Entregador"}</DialogTitle>
            <DialogContent>
            
            <TextField label="Nome"
                value={this.state.entregador.nome}
                onChange={(evento)=>this.setNome(evento.target.value)}  /><br/><br/>
            <TextField label="CPF"
                value={this.state.entregador.cpf}
                onChange={(evento)=>this.setCpf(evento.target.value)}  /><br/><br/>
            <TextField label="RG"
                value={this.state.entregador.rg}
                onChange={(evento)=>this.setRg(evento.target.value)}  /><br/><br/>
            <TextField label="Email"
                value={this.state.entregador.email}
                onChange={(evento)=>this.setEmail(evento.target.value)}  /><br/><br/>
            <TextField label="CNH"
                value={this.state.entregador.cnh}
                onChange={(evento)=>this.setCnh(evento.target.value)}  /><br/><br/>
            <TextField label="CRLV"
                value={this.state.entregador.crlv}
                onChange={(evento)=>this.setCrlv(evento.target.value)}  /><br/><br/>
            <TextField label="Login"
                value={this.state.entregador.login}
                onChange={(evento)=>this.setLogin(evento.target.value)}  /><br/><br/>
            <TextField label="Senha"
                value={this.state.entregador.novaSenha}
                onChange={(evento)=>this.setSenha(evento.target.value)}  
                type="password"/><br/><br/>
            
            </DialogContent>
            
             <DialogActions>
            <Button onClick={()=>{this.props.cancelar()}} color="primary">
              Cancelar
            </Button>
            <Button onClick={(evento)=>{this.confirmar()}} color="primary">
              Confirmar
            </Button>
          </DialogActions>
            </Dialog>;
            
        }
} 