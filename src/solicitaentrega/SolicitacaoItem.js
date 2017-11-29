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
import distancia_maps from './distancia_maps';

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
        
        realizaCalculo(endereco){
            
        var distance = require('./distancia_maps.js');

var origins = ['San Francisco CA', '40.7421,-73.9914'];
var destinations = ['New York NY', 'Montreal', '41.8337329,-87.7321554', 'Honolulu'];

distance.key('AIzaSyAcxRxdo4j1s2JtPpESnkaiTyEo3mFsMoA');
distance.units('imperial');

distance.matrix(origins, destinations, function (err, distances) {

    if (err) {
        return console.log(err);
    }
    if(!distances) {
        return console.log('no distances');
    }
    if (distances.status == 'OK') {
        for (var i=0; i < origins.length; i++) {
            for (var j = 0; j < destinations.length; j++) {
                var origin = distances.origin_addresses[i];
                var destination = distances.destination_addresses[j];
                if (distances.rows[0].elements[j].status == 'OK') {
                    var distance = distances.rows[i].elements[j].distance.text;
                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                } else {
                    console.log(destination + ' is not reachable by land from ' + origin);
                }
            }
        }
    }
});
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