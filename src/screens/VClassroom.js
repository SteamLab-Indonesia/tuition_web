import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../Projj.css';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { getClassDetails } from '../libs/Classroom';
import { setClassDetails } from '../libs/Classroom';
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

class VClassroom extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  state = {
    name: 'none',
    capacity: 'none',
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleSave = () => {
    setClassDetails(this.props.match.params.id, this.state.name, this.state.capacity)
    // this.setState({open: false})
  }

  componentDidMount = () => {
    //console.log(this.props);
    const id_num = this.props.match.params.id;
    //console.log(this.props.match.params);
    getClassDetails(id_num).then((classData) => {
      // data from firebase docs[0].data
      if (classData)
      {
        this.setState({
          name: classData.name,
          capacity: classData.capacity,
        })
      }
    })
  }

  render() {
    const { classes } = this.props;

    return (
        <div className={classes.root} id="surface" class="surface" >
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
                <Button onClick={this.handleSave} variant="contained" color="secondary" component={Link} to="/classroom" autoFocus>
                  Save
                </Button>
                <Button onClick={this.handleClose} autoFocus>
                  back
                </Button>
              </DialogActions>
            </Dialog>
          </div>
          <Paper elevation={1} id="inside" style={{paddingBottom:50,paddingTop:50}}>
              <form className={classes.container} noValidate autoComplete="off" >
                  <Typography variant="h5" component="h3" id="papert">
                      View Classroom
                  </Typography>
                  <br/>
                  <br/>
                  <TextField
                  label="Name"
                  className={classes.textField}
                  value={this.state.name}
                  onChange={this.handleChange('name')}
                  margin="normal"
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
                  <br/>
                  <div>
                    <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleClickOpen}>save</Button>
                    <Button variant="outlined" className={classes.button} component={Link} to="/classroom">cancel</Button>
                  </div>
                  {/* onClick={this.handleSave} */}
              </form>
          </Paper>
        </div>
    );
  }
}

VClassroom.propTypes = {
  classes: PropTypes.object.isRequired,
};



export default withStyles(styles)(VClassroom);