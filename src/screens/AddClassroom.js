import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../Projj.css';
import { Typography } from '@material-ui/core';
import {addClassroom} from '../libs/Classroom'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';

const styles = theme => ({
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
  input: {
    display: 'none',
  },
});


class AddClassroom extends React.Component {

  handleClickOpen1 = () => {
    this.setState({ open1: true });
  };

  handleClose1 = () => {
    this.setState({ open1: false });
  };

  handleClickOpen2 = () => {
    this.setState({ open2: true });
  };

  handleClose2 = () => {
    this.setState({ open2: false });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  state = {
    name: '',
    capacity: '',
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root} id="surface" class="surface">
        <Paper elevation={1} id="inside">
            <form className={classes.container} noValidate autoComplete="off">
                <Typography variant="h5" component="h3" id="papert">
                    Add Classroom
                </Typography>
                <br/>
                <br/>
                <TextField
                  className={classes.textField}
                  value={this.state.name}
                  label="Name"   
                  style={{width: '96%'}}
                  margin="normal"
                  onChange={this.handleChange('name')}
                >
                </TextField>

                <TextField
                label="Capacity"
                className={classes.textField}
                value={this.state.capacity}
                onChange={this.handleChange('capacity')}
                margin="normal"
                >
                </TextField>
                <br />
                <br/>
                <br />
                <div>
                  <Button variant="contained" color="secondary" className={classes.button} component={ Link } onClick={addClassroom} to="/classroom">save</Button>
                  <Button variant="outlined" className={classes.button} component={ Link } to="/classroom">cancel</Button>
                </div>
                
            </form>
        </Paper>
        </div>
    );
  }
}

AddClassroom.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(AddClassroom);