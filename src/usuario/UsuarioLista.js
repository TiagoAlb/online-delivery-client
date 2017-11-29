import React from "react";
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';

import Table, {
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow
} from 'material-ui/Table';



export default class UsuarioLista extends React.Component {

    setPagina(numero) {
        this.props.mudaPagina(numero);
    }

    botoesPagina() {
        let botoes = [<button>&lt;&lt;</button>, <button>&lt;</button>];
        for (let x = 0; x < this.props.pagina.totalPages; x++) {
            let botao = <button 
                onClick={(evento) => {
                                this.setPagina(x);
            }}
                disabled={x == this.props.pagina.number}>{x + 1}</button>;
                botoes.push(botao);
        }
        return botoes;
    }

    botoesUsuario(usuario) {
        let botoes = [];
        if (this.props.editar) {
            let botao = <IconButton onClick={(evento) => {
                                this.props.editar(usuario);
            }} color="primary">
        <Icon>create</Icon>
      </IconButton>
                            /*
                            <button onClick={(evento) => {
                                this.props.editar(usuario);
            }}>
                Editar</button>;*/;
                botoes.push(botao);
        }

        if (this.props.apagar) {
            let botao = 
                    <IconButton onClick={(evento) => {
                                this.props.apagar(usuario);
            }} color="accent">
        <Icon>delete</Icon>
      </IconButton>;
                    /*            
                                
                                <button onClick={(evento) => {
                                this.props.apagar(usuario);
            }}>
                Apagar</button>;*/
                botoes.push(botao);
        }
        return botoes;
    }

    render() {

        if (!this.props.pagina.content) {
            return <div>Vazio!</div>;
        } else {

            return <Table >
    <TableHead>
        <TableRow>
            <TableCell>Nome</TableCell><TableCell>Email</TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {this.props.pagina.content.map((usuario) => {
                                return <TableRow hover="true" key={usuario.id}>
                            <TableCell>{usuario.nome}</TableCell>                     
                            <TableCell>{usuario.email}</TableCell>              
                            <TableCell>
                                {this.botoesUsuario(usuario)}</TableCell>
                        </TableRow>;
        })}        
    </TableBody>
    <TableFooter>
        <TableRow>
        <TablePagination
                  count={this.props.pagina.totalElements}
                  rowsPerPage={this.props.pagina.size}
                  page={this.props.pagina.number}
                  onChangePage={(evento,pagina)=>{this.setPagina(pagina);}}
                  onChangeRowsPerPage={()=>{}}
                  rowsPerPageOptions={[this.props.pagina.size]}
                  labelRowsPerPage=""
                />
        </TableRow>                        
    </TableFooter>
</Table>;
        }
    }
}