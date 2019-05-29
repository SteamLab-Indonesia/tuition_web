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
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import { Link } from "react-router-dom";
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { getUserDetails } from '../libs/User';
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

class UserDetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          user: [],
        }
      }

    componentDidMount() {
        let id_num = this.props.match.params.id
        getUserDetails (id_num)
            .then((status,data)=>{
                console.log('status='+status)
                console.log(data)})
            .catch((error)=>{
                console.log(error)
            })
      }

  render() {
    const { classes } = this.props;
    return (
        <div className={classes.root} id="surface" class="surface" link>
        <Paper elevation={1} id="inside">
          <form className={classes.container} noValidate autoComplete="on">

            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
              <Grid item>
                <AccountCircleIcon className={classes.icon}/>
                <div class='papert'>User Sign Up</div>    
              </Grid>

              <Grid item style={{width: "100%"}}>
                <Grid direction="row" justify="flex-start" alignItems="center">
                  <TextField 
                  label="Name" 
                  className={classes.textField} 
                  value={this.state.name}
                  style={{width: '47%'}} 
                  margin="normal"
                  />

                  <TextField
                  className={classes.textField}
                  value={this.state.username}
                  label="Username"   
                  style={{width: '47%'}}
                  margin="normal"
                  
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

                <Grid direction="column" justify="flex-start" alignItems="flex-start">
                  <TextField
                  className={classes.textField}
                  value={this.state.birthday}   
                  label="Birthday"
                  placeholder= '00/00/0000'
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{width: '46%'}}
                  margin="normal"
                 
                  //variant='outlined'
                  />

                  <TextField
                    id="Gender"
                    select
                    label="Gender"
                    className={classes.textField}
                    value={this.state.gender}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    style={{width: '47%'}}
                    margin="normal"
                   
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                  >
                  </TextField>

                  <TextField
                  className={classes.textField}
                  value={this.state.email}
                  label="Email"   
                  style={{width: '96%'}}
                  margin="normal"
                 
                  />

                  <TextField
                  className={classes.textField}
                  value={this.state.phone}
                  label="Phone Number"   
                  style={{width: '96%'}}
                  margin="normal"
                 
                  />

                  <TextField
                  className={classes.textField}
                  value={this.state.address}
                  label="Address"   
                  style={{width: '96%'}}
                  margin="normal"
                 
                  />

                  <TextField
                  className={classes.textField}
                  value={this.state.school}
                  label="School"   
                  style={{width: '96%'}}
                  margin="normal"
                  
                  />    
                </Grid>
              </Grid>
            </Grid>
            <br/>
            </form>
            </Paper>
            </div>
    )
  }
}

UserDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserDetails);