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
            console.log(window.google.maps);
            this.state={
                solicitacao:this.props.solicitacao
            }
            
        }
        
        componentWillReceiveProps(proximoEstado){
            this.setState({solicitacao:proximoEstado.solicitacao});
            
        }
        
        realizaCalculo(endereco){
            
            
         let service = new window.google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
          origins: ["Greenwich, England"],
          destinations: ['Stockholm, Sweden'],
          travelMode: 'DRIVING',
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
            console.log(response);
            console.log(response.rows[0].elements[0].distance.text);
            console.log(response.rows[0].elements[0].duration.text);
        }
            
    });
            
           /* 
        
          fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=Porto+Alegre+BR&destinations=91790020+BR&mode=car&language=pt-BR&key=AIzaSyAcxRxdo4j1s2JtPpESnkaiTyEo3mFsMoA',{
                method: 'get',
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                headers:{
                'Access-Control-Allow-Origin':'*'
                },
               
            }).then(this._parseJSON)
         */   
        }
        
        _parseJSON(response) {

      //  response.text().then((dados)=>{console.log(dados); } );
            //response.json().then((dados)=>{console.log(dados); } );
        }
        
        setEnderecoUsuario(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.solicitacao.enderecousuario=valor;
                            this.realizaCalculo(anterior);
                            return anterior;
                            }
                    );
            
        }
        
        setCusto(valor){
            this.setState(
                    (anterior)=>
                            {
                            anterior.solicitacao.custo=valor;
                            return anterior;
                            }
                    );
            
        }
  
        confirmar(){
            if(this.state.solicitacao.enderecousuario){
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
            <DialogTitle>{this.state.solicitacao.id?`Editar cadastro ${this.state.solicitacao.enderecousuario}`:"Nova Solicitacao"}</DialogTitle>
            <DialogContent>
            
            <TextField label="Endereco Usuario"
                value={this.state.solicitacao.enderecousuario}
                onChange={(evento)=>this.setEnderecoUsuario(evento.target.value)}/><br/><br/>
            
            <TextField label="Custo (R$)"
                value={this.state.solicitacao.custo}
                disabled="true"
                />
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