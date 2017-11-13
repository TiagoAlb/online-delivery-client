/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import EntregadorServico from './EntregadorServico';
import EntregadorLista from './EntregadorLista';
import EntregadorItem from './EntregadorItem';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';

export default class EntregadorPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirEntregadorItem:false,
            entregador:{nome:"teste"}
        }

        this.entregadorServico = new EntregadorServico();
        this.mudarPagina(0);

    }

    novoItem(){
        this.setState({
            exibirEntregadorItem:true,
            entregador:{}
        });
    }

    setPagina(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    mudarPagina(numero) {
        this.paginaAtual=numero;
        this.entregadorServico.listarPaginado(numero,
                (resultado) => {
            console.log(resultado);
            this.setPagina(resultado);
        },
                (erro) => {
            console.log("Erro:");
            console.log(erro);
        }
        );
    }

    render() {

        return  <Grid container  >
            <Grid item sm={0}  md={1} />
            <Grid item sm={12} md={10} >
            <Paper style={{padding:10}}>
            
            <EntregadorLista
            apagar={(entregador) => {
                this.entregadorServico.apagar(entregador.id,
                ()=>{
                    alert("Apagado com sucesso!!!");
                    this.mudarPagina(this.paginaAtual);
                    
                },
                (erro)=>console.log(erro));
                }}
            editar={(entregador) => {this.setState({exibirEntregadorItem:true, entregador:entregador});}  }
            mudaPagina={(numero) => this.mudarPagina(numero)}
            pagina={this.state.pagina} 
            />
            <EntregadorItem 
                cancelar={()=>{this.setState({exibirEntregadorItem:false});}}
                abrir={this.state.exibirProdutoItem}
                inserir ={(entregador)=>{ 
                    this.entregadorServico.inserir(entregador, 
                            (item)=>{
                                alert("Item cadastrado com sucesso!");
                                this.setState({exibirEntregadorItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                editar = {(id,entregador)=>{ 
                    this.entregadorServico.editar(id, entregador, 
                            (item)=>{
                                alert("Item cadastrado com sucesso!");
                                this.setState({exibirEntregadorItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                entregador={this.state.entregador} />
            <Button raised color="primary" onClick={(evento)=>this.novoItem()} >
        Cadastre-se
      </Button>
            </Paper>
            </Grid>
            </Grid>;

    }

}
