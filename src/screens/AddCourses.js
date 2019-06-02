import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../Projj.css';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';


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

const subject = [
  {
    value: 'none',
    label: 'Select Subject',
  },
  {
    value: 'Robotic',
    label: 'Robotic',
  },
  {
    value: 'tes',
    label: 'tes',
  },
];

const curriculum = [
  {
    value: 'none',
    label: 'Select Curriculum',
  },
  {
    value: 'Creativity',
    label: 'Creativity',
  },
  {
    value: 'tes',
    label: 'tes',
  },
];

const level = [
  {
    value: 'none',
    label: 'Select Level',
  },
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
];

class AddCourses extends React.Component {

  addCourses = () => {
    const db = firebase.firestore();
      db.settings({
      timestampsInSnapshots: true
    });
    const userRef = db.collection("program").add({
      subject: this.state.subject,
      curriculum: this.state.curriculum,
      level: parseInt(this.state.level),
      description: this.state.description
    });
    this.setState({
      subject: "",
      curriculum: "",
      level: 0,
      description: ""
    });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  state = {
    subject: 'none',
    curriculum: 'none',
    level: 'none',
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root} id="surface" class="surface">
        <Paper elevation={1} id="inside">
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.addCourses}>
                <Typography variant="h5" component="h3" id="papert">
                    New Courses
                </Typography>
                <TextField
                id="standard-name"
                select
                label="Subject"
                className={classes.textField}
                value={this.state.subject}
                onChange={this.handleChange('subject')}
                margin="normal"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your subject"
                margin="normal"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your curriculum"
                margin="normal"
                >
                {subject.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
                <TextField
                select
                //id="standard-name"
                label="Curriculum"
                className={classes.textField}
                value={this.state.curriculum}
                onChange={this.handleChange('curriculum')}
                margin="normal"
                SelectProps={{
                  MenuProps: {
                    className: classes.menu,
                  },
                }}
                helperText="Please select your curriculum"
                margin="normal"
                >
                {curriculum.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
                <TextField
                select
                //id="standard-name"
                label="Level"
                className={classes.textField}
                value={this.state.level}
                //placeholder="Please select a level"
                onChange={this.handleChange('level')}
                margin="normal"
                >
                >
                {level.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
                </TextField>
                <TextField
                id="standard-multiline-static"
                label="Description"
                multiline
                rows="4"
                placeholder="Please enter description here"
                className={classes.textField}
                margin="normal"
                onChange={this.handleChange('description')}
                />
                <br />
                <div>
                  <Button variant="contained" color="secondary" className={classes.button}  onClick={this.addCourses}>save</Button>
                  <Button variant="outlined" className={classes.button}>cancel</Button>
                </div>
                
            </form>
        </Paper>
        </div>
    );
  }
}

AddCourses.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(AddCourses);