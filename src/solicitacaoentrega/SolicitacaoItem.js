import React, {Component} from "react";
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';
import Button  from 'material-ui/Button';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from 'material-ui/Table';

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const ARC_DE_TRIOMPHE_POSITION = {
  lat: 48.873947,
  lng: 2.295038
};

const EIFFEL_TOWER_POSITION = {
  lat: 48.858608,
  lng: 2.294471
};

export default class SolicitacaoPagina extends React.Component {
  constructor(props) {

    super(props);
    this.state={
                solicitacao:this.props.solicitacao,
            };
            
        this.panToArcDeTriomphe = this.panToArcDeTriomphe.bind(this);
  }
  
        realizaCalculo(){
         var service = new window.google.maps.DistanceMatrixService;
         service.getDistanceMatrix({
          origins: ["Paulo Madureira Coelho, Porto Alegre"],
          destinations:[this.state.solicitacao.enderecousuario],
          travelMode: [this.state.solicitacao.modoentrega],
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status) => {
            
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
           
           this.setDistancia(response.rows[0].elements[0].distance.text);
           this.setTempo(response.rows[0].elements[0].duration.text);      
           this.setCusto(response.rows[0].elements[0].duration.value/80);
          }         
                
        }); 
        }     
        
        componentWillReceiveProps(proximoEstado){
            this.setState({solicitacao:proximoEstado.solicitacao});
            
        }
       
  
  componentDidMount() {
    this.map = new window.google.maps.Map(this.refs.map, {
      center: EIFFEL_TOWER_POSITION,
      zoom: 16
    });
  }
  
  panToArcDeTriomphe() {
    console.log(this)
    this.map.panTo(ARC_DE_TRIOMPHE_POSITION);
  }
       
        setModoEntrega(valor) {
            this.setState(
                    (anterior)=>
                            {                       
                            anterior.solicitacao.modoentrega=valor;
                            if(valor!='selecione'&&this.state.solicitacao.enderecousuario!=null){
                                this.realizaCalculo();
                            }
                            return anterior;
                            }
                    );
            
        }
  
        
        setEnderecoUsuario(valor){                     
            this.setState(
                    (anterior)=>
                            {                                                       
                            anterior.solicitacao.enderecousuario=valor;
                            
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
        
        setDistancia(valor){
            this.setState(
                    (anterior)=>
                            {       
                       
                                anterior.solicitacao.distancia=valor;
                           
                            return anterior;
                            }
                    );     
        }
        
        setTempo(valor){
            this.setState(
                    (anterior)=>
                            {       
                       
                                anterior.solicitacao.tempo=valor;
                           
                            return anterior;
                            }
                    );     
        }
        
        confirmar(){
            if(this.state.solicitacao.enderecousuario&&this.state.solicitacao.modoentrega!='selecione'){
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
        
        
  
  render() {
    const mapStyle = {
      width: '100%',
      height: 500,
    }
    
    return <div>
                <TableCell>
                <TextField label="Onde Entregar?"
                  value={this.state.solicitacao.enderecousuario}
                  onChange={(evento)=>this.setEnderecoUsuario(evento.target.value)}
                  />
                </TableCell>
                <TableCell>
                    <div id="floating-panel">
                    <select id="mode" value={this.state.solicitacao.modoentrega} onChange={(evento)=>this.setModoEntrega(evento.target.value)}>
                        <option value="selecione">SELECIONE O MODO DE ENVIO</option>
                        <option value="DRIVING">CARRO</option>
                        <option value="WALKING">A PÉ</option>
                        <option value="BICYCLING">MOTO</option>
                        <option value="TRANSIT">ÔNIBUS</option>                     
                    </select>
                    
                    </div>
                </TableCell>
                <TableCell>
    <TextField label="Distancia"
                value={this.state.solicitacao.distancia}
               disabled="true"
                />
    </TableCell>
    <TableCell>
    <TextField label="Tempo"
               value={this.state.solicitacao.tempo}
                disabled="true"
                />
    </TableCell>
    <TableCell>
    <TextField label="Custo (R$)"
                value={this.state.solicitacao.custo}
                disabled="true"
                />
    </TableCell>
    <TableCell>
        <Button onClick={(evento)=>{this.confirmar()}} color="primary">
              Confirmar
        </Button>
        </TableCell>
        <div ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    
  }
}
