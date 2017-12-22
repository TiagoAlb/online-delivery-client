import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Tooltip from 'material-ui/Tooltip';
import TextField from 'material-ui/TextField';

import EntregadorPagina from './entregador/EntregadorPagina';
import UsuarioPagina from './usuario/UsuarioPagina';
import SolicitacaoPagina from './solicitacaoentrega/SolicitacaoPagina';
import SolicitacaoListaPaginaEntregador from './solicitacaoentrega-lista-entregador/SolicitacaoListaPaginaEntregador';
import SolicitacaoListaPaginaUsuario from './solicitacaoentrega-lista-usuario/SolicitacaoListaPaginaUsuario';
import Login from './login/Login';
import servicoLogin from "./login/ServicoLogin";
//import PrincipalUsuario from './usuario/PrincipalUsuario';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100%',
  },
  appFrame: {
    position: 'relative',
    display: 'flex',
    height: '100%',
  },
  appBar: {
    position: 'absolute',
    backgroundColor: '#37474F',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  content: {
    backgroundColor: theme.palette.background.default,
    width: '100%',
    padding: theme.spacing.unit * 3,
    height: 'calc(100% - 56px)',
    marginTop: 56,
    [theme.breakpoints.up('sm')]: {
      height: 'calc(100% - 64px)',
      marginTop: 64,
    },
  },
});

class Principal extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            logado:servicoLogin.logado(),
            botaoLogin: false
        };
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});
    
    estadoBotao(){
        if(this.state.logado){
            return true;
        }else return false;
    }
  
  render(){
      
  const { classes } = this.props;

  return (
    <Router>      
    <div className={classes.root}>
      <div className={classes.appFrame}>
        <AppBar className={classes.appBar}>
          <Toolbar>
          <IconButton className={classes.menuButton} color="contrast" aria-label="Menu" onClick={this.handleToggle}>menu</IconButton>
            <Typography type="title" color="inherit" noWrap>
              Entregas
            </Typography>           
            <Button color="contrast" style={{left:'78%', visibility:this.state.logado?"hidden":""}} href="login">Login</Button>
           
          </Toolbar>
        </AppBar>
        <Drawer 
          onClick={this.handleClose}
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          width={10}
        >
        
<List>
<Link to="entregador"  style={{ textDecoration: 'none' }}>
        <ListItem button>
            <ListItemIcon>
                <Icon style={{marginLeft:'auto', marginRight:'auto'}}>motorcycle</Icon>
            </ListItemIcon>
            <ListItemText primary="Adicionar Entregador" />
        </ListItem>      
        </Link>
         
    <Link to="usuario"  style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Icon style={{marginLeft:'auto', marginRight:'auto'}}>account_circle</Icon>
          </ListItemIcon>
          <ListItemText primary="Cadastrar Usuario" />
        </ListItem>
        </Link>
        
        <Link to=""  style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Icon style={{marginLeft:'auto', marginRight:'auto'}}>date_range</Icon>
          </ListItemIcon>
          <ListItemText primary="Solicitar Entrega" />
        </ListItem>
        </Link>
        
        <Link to="solicitacaoentrega-lista-entregador"  style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Icon style={{marginLeft:'auto', marginRight:'auto'}}>chrome_reader_mode</Icon>
          </ListItemIcon>
          <ListItemText primary="Solicitações Entregador" />
        </ListItem>
        </Link>
        
        <Link to="solicitacaoentrega-lista-usuario"  style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Icon style={{marginLeft:'auto', marginRight:'auto'}}>chrome_reader_mode</Icon>
          </ListItemIcon>
          <ListItemText primary="Solicitações Usuario" />
        </ListItem>
        </Link>
      </List>

        </Drawer>
        <main className={classes.content}>
        <Route path="/entregador" component={EntregadorPagina}/>
        <Route path="/usuario" component={UsuarioPagina}/>
        <Route exact path="/" component={SolicitacaoPagina}/>
        <Route path="/solicitacaoentrega-lista-entregador" component={SolicitacaoListaPaginaEntregador}/>
        <Route path="/solicitacaoentrega-lista-usuario" component={SolicitacaoListaPaginaUsuario}/>
        <Route path="/login" component={Login}/>
        </main>
      </div>
    </div>
    </Router>
  );
}
}

Principal.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Principal);