import React from 'react';
import SolicitacaoServico from './SolicitacaoServico';
//import SolicitacaoListaLista from './SolicitacaoListaLista';
import SolicitacaoItem from './SolicitacaoItem';
import Paper from "material-ui/Paper";
import Button from "material-ui/Button";
import Icon from 'material-ui/Icon';

export default class SolicitacaoPagina extends React.Component {
        
        constructor(props) {
        super(props);

        this.state = {
            pagina: {},
            exibirSolicitacaoListaItem:false,
            solicitacao:{local:"teste"}
        }
        this.solicitacaoServico = new SolicitacaoServico();

    }

    novoItem(){
        this.setState({
            exibirSolicitacaoListaItem:true,
            solicitacao:{}
        });
    }
/*
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
*/
    render() {

        return  <SolicitacaoItem
        
                    inserir ={(solicitacao)=>{ 
                    this.solicitacaoServico.inserir(solicitacao, 
                            (item)=>{
                                
                                alert("Solicitacao inserida com sucesso!");
                                                   
                            },
                            (erro)=>{
                                console.log("Erro!");
                                console.log(erro);
                                }
                            );
                    }}
                          
                solicitacao={this.state.solicitacao} />
            
        

    }
}
