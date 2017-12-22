/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

import React from 'react';
import UsuarioServico from './UsuarioServico';
import UsuarioLista from './UsuarioLista';
import UsuarioItem from './UsuarioItem';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';

export default class UsuarioPagina extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirUsuarioItem:false,
            usuario:{nome:"teste"}
        }

        this.usuarioServico = new UsuarioServico();
        this.mudarPagina(0);

    }

    novoItem(){
        this.setState({
            exibirUsuarioItem:true,
            usuario:{}
        });
    }

    setPagina(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    mudarPagina(numero) {
        this.paginaAtual=numero;
        this.usuarioServico.listarPaginado(numero,
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
            <Grid item sm={12} md={100} >
            <Paper style={{padding:10}}>
            
            
            <UsuarioItem 
                cancelar={()=>{this.setState({exibirUsuarioItem:false});}}
                abrir={this.state.exibirUsuarioItem}
                inserir ={(usuario)=>{ 
                    this.usuarioServico.inserir(usuario, 
                            (item)=>{
                                alert("Usuario cadastrado com sucesso!");
                                this.setState({exibirUsuarioItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                editar = {(id,usuario)=>{ 
                    this.usuarioServico.editar(id, usuario, 
                            (item)=>{
                                alert("Usuario editado com sucesso!");
                                this.setState({exibirUsuarioItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                usuario={this.state.usuario} />
            <Button raised color="primary" onClick={(evento)=>this.novoItem()} >
        Cadastre-se
      </Button>
            </Paper>
            </Grid>
            </Grid>;

    }

}
