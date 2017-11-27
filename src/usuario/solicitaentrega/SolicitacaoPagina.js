import React from 'react';
//import UsuarioServico from './UsuarioServico';
//import UsuarioLista from './UsuarioLista';
//import UsuarioItem from './UsuarioItem';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';

export default class SolicitacaoPagina extends React.Component {
        
        render(){
        return(
        
        <h1>RealizarSolicitacao</h1>
);
}     
/*
        constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirSolicitacaoItem:false,
            solicitacao:{local:"teste"}
        }

        this.solicitacaoServico = new SolicitacaoServico();
        this.mudarPagina(0);

    }

    novoItem(){
        this.setState({
            exibirSolicitacaoItem:true,
            solicitacao:{}
        });
    }

    setPagina(paginaResultado) {
        this.setState({
            pagina: paginaResultado
        });
    }

    mudarPagina(numero) {
        this.paginaAtual=numero;
        this.solicitacaoServico.listarPaginado(numero,
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
            
            <SolicitacaoLista
            apagar={(solicitacao) => {
                this.solicitacaoServico.apagar(solicitacao.id,
                ()=>{
                    alert("Apagado com sucesso!!!");
                    this.mudarPagina(this.paginaAtual);
                    
                },
                (erro)=>console.log(erro));
                }}
            editar={(solicitacao) => {this.setState({exibirSolicitacaoItem:true, solicitacao:solicitacao});}  }
            mudaPagina={(numero) => this.mudarPagina(numero)}
            pagina={this.state.pagina} 
            />
            <USolicitacaoItem 
                cancelar={()=>{this.setState({exibirSolicitacaoItem:false});}}
                abrir={this.state.exibirSolicitacaoItem}
                inserir ={(solicitacao)=>{ 
                    this.solicitacaoServico.inserir(solicitacao, 
                            (item)=>{
                                alert("Solicitacao inserida com sucesso!");
                                this.setState({exibirSolicitacaoItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                editar = {(id,solicitacao)=>{ 
                    this.solicitacaoServico.editar(id, solicitacao, 
                            (item)=>{
                                alert("Solicitacao editada com sucesso!");
                                this.setState({exibirSolicitacaoItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                solicitacao={this.state.solicitacao} />
            <Button raised color="primary" onClick={(evento)=>this.novoItem()} >
        Solicitar Entrega
      </Button>
            </Paper>
            </Grid>
            </Grid>;

    }
   */
}
