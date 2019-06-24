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
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import { Link } from 'react-router-dom'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import {GENDER, getUserDetails, setUserDetails} from '../libs/User';
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

const gender = [
  {
    value: GENDER.MALE,
    label: 'Male',
  },
  {
    value: GENDER.FEMALE,
    label: 'Female',
  },
];

class VUser extends React.Component {
  state = {
    password: '',
    showPassword: false,
  };

  componentDidMount = () => {
    //console.log(this.props);
    const id_num = this.props.match.params.id;
    //console.log(this.props.match.params);
    getUserDetails(id_num).then((userData) => {
      // data from firebase docs[0].data
      if (userData)
      {
        this.setState({
          name: userData.name,
          username: userData.username,
          password: userData.password,
          birthday: userData.birthday,
          gender : userData.gender,
          email: userData.email,
          phone: userData.phone,
          address: userData.address,
          school: userData.school,
          archive : userData.archive,
        })
      }
    })
  }

  handleSave = () => {
    setUserDetails(
      this.props.match.params.id, 
      this.state.name, 
      this.state.username, 
      this.state.password,
      this.state.birthday,
      this.state.gender,
      this.state.email,
      this.state.phone,
      this.state.address,
      this.state.school,
      this.state.archive
      )
  };

  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
      });
  };

  handleClickOpen = () => {
    this.setState ({open: true})
  };

  handleClickClose = () => {
    this.setState ({open: false})
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root} id="surface" class="surface">
        <div>
          <Dialog
              open={this.state.open}
              onClose={this.handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">{"Save Changes?"}</DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you want to keep this changes?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.handleSave} variant="contained" color="secondary" component={Link} to="/users" autoFocus>
                  Save
                </Button>
                <Button onClick={this.handleClickClose} autoFocus>
                  back
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        <Paper elevation={1} id="inside">
          <form className={classes.container} noValidate autoComplete="on">
            <Grid container spacing={0} direction="column" justify="center" alignItems="center">
              <Grid item>
                <AccountCircleIcon className={classes.icon}/>
                <div class='papert'>User Details</div>    
              </Grid>

              <Grid item style={{width: "100%"}}>
                <Grid direction="row" justify="flex-start" alignItems="center">
                  <TextField 
                  className={classes.textField} 
                  value={this.state.name}
                  label="Name" 
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{width: '47%'}} 
                  margin="normal"
                  onChange={this.handleChange('name')}
                  />

                  <TextField
                  className={classes.textField}
                  value={this.state.username}
                  label="Username"   
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{width: '47%'}}
                  margin="normal"
                  onChange={this.handleChange('username')}
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
                  onChange={this.handleChange('birthday')}
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
                    onChange={this.handleChange('gender')}
                    SelectProps={{
                      MenuProps: {
                        className: classes.menu,
                      },
                    }}
                  >
                    {gender.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </TextField>

                  <TextField
                  className={classes.textField}
                  value={this.state.email}
                  label="Email"   
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{width: '96%'}}
                  margin="normal"
                  onChange={this.handleChange('email')}
                  />

                  <TextField
                  className={classes.textField}
                  value={this.state.phone}
                  label="Phone Number"   
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{width: '96%'}}
                  margin="normal"
                  onChange={this.handleChange('phone')}
                  />

                  <TextField
                  className={classes.textField}
                  value={this.state.address}
                  label="Address"   
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{width: '96%'}}
                  margin="normal"
                  onChange={this.handleChange('address')}
                  />

                  <TextField
                  className={classes.textField}
                  value={this.state.school}
                  label="School"   
                  InputLabelProps={{
                    shrink: true,
                  }}
                  style={{width: '96%'}}
                  margin="normal"
                  onChange={this.handleChange('school')}
                  />    
                </Grid>
              </Grid>
            </Grid>
            <br/>
            <div> 
              <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpen} >
              save
              </Button>
              <Button variant="outlined" className={classes.button} component={Link} to="/users">cancel</Button>
            </div>
          </form>
        </Paper>
      </div>
    )
  }
}

VUser.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(VUser);