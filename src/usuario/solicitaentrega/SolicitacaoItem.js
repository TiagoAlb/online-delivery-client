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

export default class SolicitacaoItem extends React.Component {
        
        constructor(props){
            super(props);
            this.state={
                solicitacao:this.props.solicitacao
            }
            
        }
        
        componentWillReceiveProps(proximoEstado){
            this.setState({solicitacao:proximoEstado.solicitacao});
            
        }
        
        setNome(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.solicitacao.nome=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setCpf(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.solicitacao.cpf=valor;
                            return anterior;
                            }
                    );
            
        }
        
        setEmail(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.solicitacao.email=valor;
                            return anterior;
                            }
                    );
            
        }
  
        confirmar(){
            if(this.state.solicitacao.nome&&
                  this.state.solicitacao.cpf&&
                      this.state.solicitacao.email){
                    if(this.state.solicitacao.id){
                        this.props.editar(this.state.solicitacao.id, this.state.solicitacao);
                    }
                    else {
                        this.props.inserir(this.state.solicitacao);
                        }
                    } else {
                        alert("Preencha todos os campos!");
                    }
                        
            
            
        }
        
        
        render(){
            return <Dialog open={this.props.abrir}>
            <DialogTitle>{this.state.solicitacao.id?`Editar cadastro ${this.state.solicitacao.nome}`:"Nova Solicitacao"}</DialogTitle>
            <DialogContent>
            
            <TextField label="Nome"
                value={this.state.solicitacao.nome}
                onChange={(evento)=>this.setNome(evento.target.value)}  /><br/><br/>
            <TextField label="CPF"
                value={this.state.usuario.cpf}
                onChange={(evento)=>this.setCpf(evento.target.value)}  /><br/><br/>
            <TextField label="Email"
                value={this.state.usuario.email}
                onChange={(evento)=>this.setEmail(evento.target.value)}  />
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