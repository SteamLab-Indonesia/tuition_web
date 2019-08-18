import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../Projj.css';
import { Typography } from '@material-ui/core';
import {addClasses} from '../libs/Classes'
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import SessionData from '../libs/SessionData';

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

	state = {
		name: '',
        label: '',
        students: [],
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	saveClassroom = () => {
        addClasses(SessionData.organizationId,
                    SessionData.academic,
                    this.state.name,
                    this.state.students,
                    this.state.label, 
                ); 
		this.props.history.push('/classes');
	}

	render() {
		const { classes } = this.props;
		return (
			<div className={classes.root} id="surface" className="surface">
			<Paper elevation={1} id="inside">
				<form className={classes.container} noValidate autoComplete="off">
					<Typography variant="h5" component="h3" id="papert">
						Add Classes
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
					label="Label"
					className={classes.textField}
					value={this.state.label}
					onChange={this.handleChange('label')}
					margin="normal"
					>
					</TextField>
					<br />
					<br/>
					<br />
					<div>
						<Button variant="contained" color="secondary" className={classes.button} onClick={this.saveClassroom}>save</Button>
						<Button variant="outlined" className={classes.button} component={ Link } to="/classes">cancel</Button>
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