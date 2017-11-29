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
import SolicitacaoPagina from './solicitaentrega/SolicitacaoPagina';
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
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    handleClose = () => this.setState({open: false});
    
  
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
            <Button color="contrast" style={{left:'78%'}} href="solicitaentrega">Login</Button>
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
        </ListItem>      
        </Link>
         
        <Link to="usuario"  style={{ textDecoration: 'none' }}>
        <ListItem button>
          <ListItemIcon>
            <Icon style={{marginLeft:'auto', marginRight:'auto'}}>account_circle</Icon>
          </ListItemIcon>
        </ListItem>
        </Link>
      </List>

        </Drawer>
        <main className={classes.content}>
        <Route path="/entregador" component={EntregadorPagina}/>
        <Route path="/usuario" component={UsuarioPagina}/>
        <Route path="/solicitaentrega" component={SolicitacaoPagina}/>
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