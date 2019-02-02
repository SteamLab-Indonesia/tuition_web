import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../Projj.css';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button'


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

class TextFields extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root} id="surface">
        <Paper elevation={1} id="inside">
            <form className={classes.container} noValidate autoComplete="off">
                <Typography variant="h5" component="h3" id="papert">
                    New Courses
                </Typography>
                <TextField
                id="standard-name"
                label="Subject"
                className={classes.textField}
                placeholder="Please enter a subject here"
                onChange={this.handleChange('name')}
                margin="normal"
                />
                <TextField
                id="standard-name"
                label="Curriculum"
                className={classes.textField}
                placeholder="Please enter a curriculum"
                onChange={this.handleChange('name')}
                margin="normal"
                />
                <TextField
                id="standard-name"
                label="Level"
                className={classes.textField}
                placeholder="Please select a level"
                onChange={this.handleChange('name')}
                margin="normal"
                />
                <TextField
                id="standard-multiline-static"
                label="Description"
                multiline
                rows="4"
                placeholder="Please enter description here"
                className={classes.textField}
                margin="normal"
                />
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