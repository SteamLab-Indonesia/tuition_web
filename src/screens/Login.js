import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../Projj.css';
import '../users.css';


const styles = theme => ({
  icon: {
      margin: theme.spacing.unit,
      fontSize: 70,
  },
   root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    width: "40%",  
    
  },
  container: {
    display: 'flex',
    flexDirection:'column',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
  button: {
    margin: theme.spacing.unit,
    width: 230,
  },
});

class TextFields extends React.Component {
  state = {
    age: '',
    multiline: '',
    currency: 'EUR',
    amount: '',
    password: '',
    weight: '',
    weightRange: '',
    showPassword: false,
  };

  addMe = () => {
    const db = firebase.firestore();
    db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection('users').add({
      name: this.state.name,
      email: this.state.email,
    });  
    this.setState({
      name: '',
      email: '',
    });
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="surface" class="surface">
      <Grid container justify="center">
        <Paper elevation={1} className={classes.root} >
          
            <Grid item style={{width: "100%"}} container spacing={0} direction="column" alignItems="center">
                <AccountCircleIcon className={classes.icon}/>
                <div class='papert'>STEAMLAB</div>    
              </Grid>

              <Grid item style={{width: "100%"}}>
                  <TextField 
                  label="Name" 
                  className={classes.textField} 
                  value={this.state.name}
                  style={{width: '98%'}} 
                  margin="normal"
                  onChange={this.handleChange('name')}
                  />
                </Grid>

                <Grid direction="column" justify="flex-start" alignItems="flex-start">
                  <TextField
                  className={classes.textField}
                  value={this.state.email}
                  label="Email"   
                  style={{width: '98%'}}
                  margin="normal"
                  onChange={this.handleChange('email')}
                  />
            </Grid>
           
           
            <br/>
            <div> 
              <Button variant="contained" color="secondary" className={classes.button} onClick={this.addMe}>
              Login
              </Button>
            </div>
          
        </Paper>
        </Grid>
      </div>
    )
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);