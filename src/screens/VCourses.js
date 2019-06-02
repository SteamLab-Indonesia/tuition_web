import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../Projj.css';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import firebase from 'firebase';
import { getCoursesDetails } from '../libs/Courses';
import { setCoursesDetails } from '../libs/Courses';
import { Link } from "react-router-dom";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

class VCourses extends React.Component {

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

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    setCoursesDetails(this.props.match.params.id, this.state.subject, this.state.curriculum, this.state.level)
    // this.setState({open: false})
  }

  componentDidMount = () => {
    //console.log(this.props);
    const id_num = this.props.match.params.id;
    //console.log(this.props.match.params);
    getCoursesDetails(id_num).then((courseData) => {
      // data from firebase docs[0].data
      if (courseData)
      {
        this.setState({
          subject: courseData.subject,
          curriculum: courseData.curriculum,
          level: courseData.level,
        })
      }
    })
  }

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
                <Button onClick={this.handleSave} variant="contained" color="secondary" component={Link} to="/courses" autoFocus>
                  Save
                </Button>
                <Button onClick={this.handleClose} autoFocus>
                  back
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Paper elevation={1} id="inside">
              <form className={classes.container} noValidate autoComplete="off" onSubmit={this.addCourses}>
                  <Typography variant="h5" component="h3" id="papert">
                      View Courses
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
                  label="Level"
                  className={classes.textField}
                  value={this.state.level}
                  //placeholder="Please select a level"
                  onChange={this.handleChange('level')}
                  margin="normal"
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu,
                    },
                  }}
                  helperText="Please select your level"
                  margin="normal"
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
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpen}>save</Button>
                    <Button variant="outlined" className={classes.button} component={Link} to="/courses">cancel</Button>
                  </div>
                  {/* onClick={this.handleSave} */}
              </form>
          </Paper>
        </div>
    );
  }
}

VCourses.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(VCourses);