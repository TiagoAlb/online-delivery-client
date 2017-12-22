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

export default class UsuarioItem extends React.Component {
        
        constructor(props){
            super(props);
            this.state={
                usuario:this.props.usuario
            }
            
        }
        
        componentWillReceiveProps(proximoEstado){
            this.setState({usuario:proximoEstado.usuario});
            
        }
        
        setNome(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.usuario.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setCpf(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.usuario.cpf=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setEmail(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.usuario.email=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setLogin(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.usuario.login=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setSenha(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.usuario.novaSenha=valor;
                            return anterior;
                            }
                    );
            
        }
  
        confirmar(){
            if(this.state.usuario.nome&&
                  this.state.usuario.cpf&&
                      this.state.usuario.email&&
                        this.state.usuario.login&&
                          this.state.usuario.novaSenha){
                    if(this.state.usuario.id){
                        this.props.editar(this.state.usuario.id, this.state.usuario);
                    }
                    else {
                        this.props.inserir(this.state.usuario);
                        }
                    } else {
                        alert("Preencha todos os campos!");
                    }   
            
        }
        
        
        render(){
            return <Dialog open={this.props.abrir}>
            <DialogTitle>{this.state.usuario.id?`Editar cadastro ${this.state.usuario.nome}`:"Novo Usuario"}</DialogTitle>
            <DialogContent>
            
            <TextField label="Nome"
                value={this.state.usuario.nome}
                onChange={(evento)=>this.setNome(evento.target.value)}  /><br/><br/>
            <TextField label="CPF"
                value={this.state.usuario.cpf}
                onChange={(evento)=>this.setCpf(evento.target.value)}  /><br/><br/>
            <TextField label="Email"
                value={this.state.usuario.email}
                onChange={(evento)=>this.setEmail(evento.target.value)}  /><br/><br/>
            <TextField label="Login"
                value={this.state.usuario.login}
                onChange={(evento)=>this.setLogin(evento.target.value)}  /><br/><br/>
            <TextField label="Senha"
                value={this.state.usuario.senha}
                onChange={(evento)=>this.setSenha(evento.target.value)} 
                type="password"/>
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