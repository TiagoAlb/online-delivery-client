import React from 'react';
import SolicitacaoServico from '../solicitacaoentrega/SolicitacaoServico';
import ListarSolicitacoes from './ListarSolicitacoes';
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';

export default class SolicitacaoListaPaginaUsuario extends React.Component {
        
        constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirSolicitacaoListaItem:false,
            solicitacao:{local:"teste"}
        }

        this.solicitacaoServico = new SolicitacaoServico();
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
                       
            <ListarSolicitacoes
            apagar={(solicitacao) => {
                this.solicitacaoServico.apagar(solicitacao.id,
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
           
            </Paper>
            </Grid>
            </Grid>;

    }
}
