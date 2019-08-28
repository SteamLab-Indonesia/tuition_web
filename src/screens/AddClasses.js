import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import '../Projj.css';
import { TextField, Paper, Typography, Button, MenuItem } from '@material-ui/core';
import {addClasses} from '../libs/Classes'
import { Link } from 'react-router-dom';
import { getClassroom } from '../libs/Classroom';
import { getTeacher } from '../libs/Teacher';
import { getAcademicYear } from '../libs/AcademicYear';
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
		academic: [],
		students: [],
		homeroom: [],
		classroom: [],
		selectedClassroom: '',
		selectedHomeroom: '',
		selectedAcademic: ''
	}

	componentDidMount = () => {

		getAcademicYear(SessionData.organizationId).then((academicList) => {
			this.setState({
				academic: academicList
			})
		});

		getClassroom((class_list) => {
			this.setState({
				classroom: class_list
			})
		});

		getTeacher().then((teacher_list) => {
			this.setState({
				homeroom: teacher_list
			})
		})
		.catch((err) => {
			console.log(err);
		});		
	}

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};

	saveClasses = () => {
        addClasses(SessionData.organizationId,
			this.state.selectedAcademic,
			this.state.name,
			this.state.selectedHomeroom,
			this.state.students,
			this.state.selectedClassroom,
			this.state.label, 
		); 
		this.props.history.push('/classes');
	}

	render() {
		const { classes } = this.props;
		const {classroom, homeroom, academic} = this.state;
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
						select						
						label="Academic Year"
						className={classes.textField}
						value={this.state.selectedAcademic}
						onChange={this.handleChange('selectedAcademic')}
						margin="normal"
					>
						{
							academic.map((option) => (
							<MenuItem key={option.id} value={option.id}>
								{option.data.name} ({option.data.start} - {option.data.end})
							</MenuItem>
							))
						}
					</TextField>					
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
						select						
						label="Homeroom"
						className={classes.textField}
						value={this.state.selectedHomeroom}
						onChange={this.handleChange('selectedHomeroom')}
						margin="normal"
					>
						{
							homeroom.map((option) => (
							<MenuItem key={option.id} value={option.id}>
								{option.data.name}
							</MenuItem>
							))
						}
					</TextField>					
					<TextField
						select
						label="Classroom"
						className={classes.textField}
						value={this.state.selectedClassroom}
						onChange={this.handleChange('selectedClassroom')}
						margin="normal"
					>
						{
							classroom.map((option) => (
							<MenuItem key={option.id} value={option.id}>
								{option.data.name}
							</MenuItem>
							))
						}
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
						<Button variant="contained" color="secondary" className={classes.button} onClick={this.saveClasses}>save</Button>
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