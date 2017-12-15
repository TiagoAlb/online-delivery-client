import React from 'react';
import SolicitacaoListaServico from './SolicitacaoListaServico';
import SolicitacaoListaLista from './SolicitacaoListaLista';
import SolicitacaoListaItem from './SolicitacaoListaItem';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';

export default class SolicitacaoListaPagina extends React.Component {
        
        constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirSolicitacaoListaItem:false,
            solicitacao:{local:"teste"}
        }

        this.solicitacaoListaServico = new SolicitacaoListaServico();
        this.mudarPagina(0);

    }

    novoItem(){
        this.setState({
            exibirSolicitacaoListaItem:true,
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
        this.solicitacaoListaServico.listarPaginado(numero,
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
            
            <SolicitacaoListaLista
            apagar={(solicitacao) => {
                this.solicitacaoListaServico.apagar(solicitacao.id,
                ()=>{
                    alert("Apagado com sucesso!!!");
                    this.mudarPagina(this.paginaAtual);
                    
                },
                (erro)=>console.log(erro));
                }}
            editar={(solicitacao) => {this.setState({exibirSolicitacaoListaItem:true, solicitacao:solicitacao});}  }
            mudaPagina={(numero) => this.mudarPagina(numero)}
            pagina={this.state.pagina} 
            />
            <SolicitacaoListaItem 
                cancelar={()=>{this.setState({exibirSolicitacaoListaItem:false});}}
                abrir={this.state.exibirSolicitacaoListaItem}
                inserir ={(solicitacao)=>{ 
                    this.solicitacaoListaServico.inserir(solicitacao, 
                            (item)=>{
                                alert("Solicitacao inserida com sucesso!");
                                this.setState({exibirSolicitacaoListaItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                editar = {(id,solicitacao)=>{ 
                    this.solicitacaoListaServico.editar(id, solicitacao, 
                            (item)=>{
                                alert("Solicitacao editada com sucesso!");
                                this.setState({exibirSolicitacaoListaItem:false});
                                this.mudarPagina(this.paginaAtual);
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                solicitacao={this.state.solicitacao} />
            
            </Paper>
            </Grid>
            </Grid>;

    }
}
