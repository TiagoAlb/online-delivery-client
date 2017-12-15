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
                value: '',
                endereco:'',
                custo:'',
                distancia:'',
                tempo:''
            };
            this.enderecoTroca = this.enderecoTroca.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.panToArcDeTriomphe = this.panToArcDeTriomphe.bind(this);
  }
  
  enderecoTroca(event){
      this.setState({endereco: event.target.value});
      console.log(event.target.value)
  }
        realizaCalculo(){
         var resposta;
         var service = new window.google.maps.DistanceMatrixService;
         service.getDistanceMatrix({
          origins: ["Paulo Madureira Coelho, Porto Alegre"],
          destinations:[this.state.endereco],
          travelMode: [this.state.value],
          unitSystem: window.google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, (response, status) => {
            
          if (status !== 'OK') {
            alert('Error was: ' + status);
          } else {
           resposta = response.rows[0].elements[0].duration.value;
           this.state.distancia = response.rows[0].elements[0].distance.text;
           this.state.tempo = response.rows[0].elements[0].duration.text;
           //console.log(response.rows[0].elements[0].duration.text);          
           this.state.custo=resposta/80;
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
            if(this.state.value!='selecione'&&this.state.value!=''&&this.state.endereco!=''){
                this.realizaCalculo();
            }
                //this.realizaCalculo(event.target.value);
            
        }
  
        
        setEnderecoUsuario(valor){                     
            this.setState(
                    (anterior)=>
                            {                                                       
                            anterior.solicitacao.enderecousuario=valor;
                            
                            this.realizaCalculo();
                            return anterior;
                            }
                    );
        }
        
        setCusto(valor){
            this.setState(
                    (anterior)=>
                            {       
                       
                                this.state.custo=valor;
                           
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
                <TableCell>
                <TextField label="Onde Entregar?"
                  value={this.state.endereco}
                  onChange={this.enderecoTroca}
                  />
                </TableCell>
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
                value={this.state.distancia}
               disabled="true"
                />
    </TableCell>
    <TableCell>
    <TextField label="Tempo"
               value={this.state.tempo}
                disabled="true"
                />
    </TableCell>
    <TableCell>
    <TextField label="Custo (R$)"
                value={this.state.custo}
                disabled="true"
                />
    </TableCell>
        <div ref="map" style={mapStyle}>I should be a map!</div>
      </div>
    
  }
}
