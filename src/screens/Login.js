import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import '../Projj.css';
import '../users.css';
import { userLogin, User } from '../libs/User';
import Spinner from '../components/Spinner';

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

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false
  };

  login = () => {

    let new_user = new User({
      email: this.state.email,
      password: this.state.password,
    });

    userLogin(new_user).then((user) => {
      this.setState({loading: false});
      if (user)
      {
        this.props.history.push('/dashboard');
      }
      else
      {
        alert('User Not Found');
      }
    })
    .catch((error) => {
      this.setState({loading: false});
      alert(error.message);
    })

    this.setState({      
      email: '',    
      password: '',
      loading: true
    });
  }

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={["surface",classes.root]} id="surface">
      <Grid container justify="center" >
      <div style={{alignItems:"flex-end",justify:"flex-end"}}> <Spinner open={this.state.loading}/></div> 
        <Paper elevation={1} className={classes.root} style={{paddingBottom:"50px"}} >
          
            <Grid item style={{width: "100%"}} container spacing={0} direction="column" alignItems="center">
                <AccountCircleIcon className={classes.icon}/>
                <div className='papert'>STEAMLAB</div>    
            </Grid>

            <Grid item style={{width: "100%"}}>
                <TextField 
                label="Email" 
                className={classes.textField} 
                value={this.state.email}
                style={{width: '98%'}} 
                margin="normal"
                onChange={this.handleChange('email')}
                />
              </Grid>

              <Grid>
                <FormControl style={{width:'100%'}} className={classNames(classes.margin, classes.textField)}>
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    style={{width: '96%'}}
                    onChange={this.handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          onClick={this.handleClickShowPassword}
                        >
                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    } />
                </FormControl>
              </Grid>
            <br/>
            <div> 
              <Button variant="contained" color="secondary" className={classes.button} onClick={this.login}>
                Login
              </Button>
            </div>
        </Paper>
        </Grid>
      </div>
    );
  
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);