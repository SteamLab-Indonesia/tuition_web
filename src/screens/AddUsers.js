import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../Projj.css';
import '../users.css'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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

const currencies = [
  {
    value: 'USD',
    label: 'Brunei (+673)',
  },
  {
    value: 'EUR',
    label: 'Myanmar	(+95)',
  },
  {
    value: 'BTC',
    label: 'Cambodia (+855)',  
  },
  {
    value: 'JPY',
    label: 'Indonesia (+62)',
  },
  {
    value: 'JPY',
    label: 'Laos (+856)',
  },
  {
    value: 'JPY',
    label: 'Malaysia (+60)',
  },
  {
    value: 'JPY',
    label: 'Philippines (+63)',
  },
  {
    value: 'JPY',
    label: 'Singapore (+65)',
  },
  {
    value: 'JPY',
    label: 'Thailand (+66)',
  },
  {
    value: 'JPY',
    label: 'Timor-Leste (+670)',
  },
  {
    value: 'JPY',
    label: 'Vietnam (+84)',
  },
];

class TextFields extends React.Component {
  state = {
    age: '',
    multiline: '',
    currency: 'EUR',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root} id="surface" class="surface">
        <Paper elevation={1} id="inside">
            <form className={classes.container} noValidate autoComplete="off">
                <Grid 
                container spacing={0}
                direction="column"
                justify="center"
                alignItems="center">
                    <Grid item>
                        <AccountCircleIcon className={classes.icon}/>
                        <div class='papert'>User Sign Up</div>    
                    </Grid>
                    <Grid item style={{width: "100%"}}>
                        <Grid
                        direction="row"
                        justify="flex-start"
                        alignItems="center">
                            <TextField
                            label="First Name"
                            className={classes.textField}
                            value={this.state.name}
                            style={{width: '47%'}}
                            margin="normal"
                            />
                            <TextField
                            label="Last Name"
                            className={classes.textField}
                            value={this.state.name}
                            style={{width: '47%'}}
                            margin="normal"
                            />
                        </Grid>
                        <Grid
                        direction="column"
                        justify="flex-start"
                        alignItems="flex-start">
                            <TextField
                            className={classes.textField}
                            value={this.state.name}
                            label="Address"   
                            style={{width: '96%'}}
                            margin="normal"
                            />
                            <TextField
                            className={classes.textField}
                            value={this.state.name}
                            label="Email"   
                            style={{width: '96%'}}
                            margin="normal"
                            />
                        </Grid>
                        <Grid
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start">
                            <TextField
                            id="standard-select-currency"
                            select
                            label="Select Country Code"
                            className={classes.textField}
                            style={{width: '23%'}}
                            onChange={this.handleChange('currency')}
                            margin="normal"
                            >
                            {currencies.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>
                            <TextField
                            className={classes.textField}
                            value={this.state.name}
                            label="Enter Your Phone Number"   
                            style={{width: '71%'}}
                            margin="normal"
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <br />
                <div>
                  <Button variant="contained" color="secondary" className={classes.button}>save</Button>
                  <Button variant="outlined" className={classes.button}>cancel</Button>
                </div>
            </form>
        </Paper>
        </div>
    );
  }
}

TextFields.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(TextFields);