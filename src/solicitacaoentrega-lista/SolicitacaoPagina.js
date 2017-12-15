import React, {Component} from "react";
import ReactDOM from 'react-dom';
import TextField from 'material-ui/TextField';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from 'material-ui/Table';

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
                value: 'selecione'
            };
        this.handleChange = this.handleChange.bind(this);
        this.panToArcDeTriomphe = this.panToArcDeTriomphe.bind(this);
  }
  
        realizaCalculo(value){
         var resposta;
         var service = new window.google.maps.DistanceMatrixService;
         service.getDistanceMatrix({
          origins: ["Paulo Madureira Coelho, Porto Alegre"],
          destinations:[],
          travelMode: [value],
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status) => {
            
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
           resposta = response.rows[0].elements[0].duration.value;
           //console.log(response.rows[0].elements[0].duration.value);
           //console.log(response.rows[0].elements[0].duration.text);          
           this.setCusto(resposta/80);
          }         
           
           
        }); 
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
       
        handleChange(event) {
            this.setState({value: event.target.value});
            console.log(this.state.value);
                //this.realizaCalculo(event.target.value);
            
        }
  
        
        setModoEntrega(valor){
            this.setState(
                    (anterior)=>
                            {       
                       
                                anterior.solicitacao.modoentrega=valor;
                           console.log("aqui");
                            return anterior;
                            }
                    );     
        }
        
  
  render() {
    const mapStyle = {
      width: '100%',
      height: 500,
    }
    
    return <div>
          <button onClick={this.panToArcDeTriomphe}>Go to Arc De Triomphe</button><br/>
     
                
                <TableCell><TextField label="Onde Entregar?"
                    /></TableCell>
                
                <TableCell>
                    <div id="floating-panel">
                    <select id="mode" value={this.state.value} onChange={this.handleChange}>
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
               
                disabled="true"
                />
    </TableCell>
    <TableCell>
    <TextField label="Tempo"
               
                disabled="true"
                />
    </TableCell>
    <TableCell>
    <TextField label="Custo (R$)"
               
                disabled="true"
                />
    </TableCell>
        <div ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    
  }
}
