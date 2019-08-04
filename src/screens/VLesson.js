import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import '../Projj.css';
import { Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { setLessonDetails } from '../libs/Lesson';
import { getTeacher } from '../libs/Teacher';
import { getClass } from '../libs/Classroom';
import { getCourses } from '../libs/Courses';
import Schedule from '../components/Schedule';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';
import { getLessonDetails } from "../libs/Lesson";

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
  iconButton: {
    padding: 7,
    marginLeft: '10px'
  },
});

class AddLesson extends React.Component {

	handleChange = name => event => {
		this.setState({
			[name]: event.target.value,
		});
	};
	constructor(props){
		super(props);
		this.state = {
      lessonData: [],
			teacher: [],
			selectedTeacher: "",
			lesson: '',
			subject: '',
			classroom: [],
			selectedClassroom: "",
			courses: [],
			selectedCourses: "",
			scheduleList: []
		}
	}

	componentDidMount = () => {
		const id_num = this.props.match.params.id;

		getCourses((cou_list) => {
			this.setState({
				courses: cou_list
			})
		});
		getTeacher().then((teacher_list) => {
			this.setState({
				teacher: teacher_list
			})
		})
		.catch((err) => {
			console.log(err);
		});
		getClass((class_list) => {
			this.setState({
				classroom: class_list
			})
		});

		getLessonDetails(id_num).then((lessonData) => {
			this.setState({
				lessonData,
				lesson: lessonData.data.name,
				scheduleList: lessonData.data.schedule ? lessonData.data.schedule : [],
				selectedCourses: lessonData.data.program ? lessonData.data.program.id : '',
				selectedTeacher: lessonData.data.teacher ? lessonData.data.teacher.id : '',
				selectedClassroom: lessonData.data.classroom ? lessonData.data.classroom.id : ''
			})
		});

		this.setState({
			selectedCourses: id_num
		})
	}

	onAddSchedule = () => {
		let {scheduleList} = this.state;
		let now = new Date();
		scheduleList.push({
			start: now.getHours() + ':00',
			end: now.getHours()+1 + ':00'
		});
		this.setState({scheduleList});
	}

	onRemoveSchedule = (del) => {
		let {scheduleList} = this.state;
		scheduleList.splice(del,1);
		this.setState({scheduleList});
	}

	onUpdateSchedule = (index, day, start, end) => {
		if (index >= 0 && index < this.state.scheduleList.length)
		{
			let scheduleList = this.state.scheduleList;
			scheduleList[index].day = day;
			scheduleList[index].start = start;
      		scheduleList[index].end = end;
			this.setState({scheduleList});
    	}
	}

	saveLesson = () => {
		const id_num = this.props.match.params.id;
		let {lesson, 
				selectedClassroom, 
				selectedCourses, 
				selectedTeacher, 
				scheduleList} = this.state;

		setLessonDetails(id_num, lesson, selectedCourses, selectedTeacher, selectedClassroom, scheduleList)
		.then((doc) => {
			console.log(doc);
		})
		.catch((err) => {
			console.log(err);
		})
	}

	render() {
		const { classes } = this.props;
		const { teacher, classroom, courses } = this.state;
		return (
			<div className={classes.root} id="surface">
			<Paper elevation={1} id="inside">
				<form className={classes.container} noValidate autoComplete="off" onSubmit={this.addCourses}>
					<Typography variant="h5" component="h3" id="papert">
						View Lesson
					</Typography>
					<TextField
						id="standard-name"
						label="Lesson Name"
						value={this.state.lesson}
						className={classes.textField}
						onChange={this.handleChange('lesson')}
						margin="normal"
					/>
					<TextField
						id="standard-name"
						select
						label="Courses"
						className={classes.textField}
						value={this.state.selectedCourses}
						onChange={this.handleChange('selectedCourses')}
						margin="normal"
						SelectProps={{
							MenuProps: {
								className: classes.menu,
							},
						}}
						helperText="Select Course"
					>
						{courses.map(option => (
							<MenuItem key={option.id} value={option.id}>
								{option.data.subject + "_" + option.data.curriculum + "_" + option.data.level}
							</MenuItem>
						))}
					</TextField>
					<TextField
						select
						//id="standard-name"
						label="Classroom"
						className={classes.textField}
						value={this.state.selectedClassroom}
						helperText="Select Classroom"
						onChange={this.handleChange('selectedClassroom')}
						margin="normal"
					>
					{classroom.map((option) => (
						<MenuItem key={option.id} value={option.id}>
						{option.data.name}
						</MenuItem>
					))}
					</TextField>
					<TextField
						select
						//id="standard-name"
						label="Teacher"
						className={classes.textField}
						value={this.state.selectedTeacher}
						helperText="Select Teacher"
						onChange={this.handleChange('selectedTeacher')}
						margin="normal"
					>
					{teacher.map((option) => (
						<MenuItem key={option.id} value={option.id}>
						{option.data.name}
						</MenuItem>
					))}
					</TextField>
					<br />
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<Typography style={{ fontSize: '20px' }}>Schedule </Typography>
						<Fab size="small" color="primary" className={classes.iconButton} aria-label="Add" onClick={this.onAddSchedule}>
						<AddIcon />
						</Fab>
					</div>
					{
						this.state.scheduleList.map((item, index) => {
							return (
								<Schedule key={index} id={index} day={item.day} start={item.start} end={item.end} onUpdate={this.onUpdateSchedule} onRemove={this.onRemoveSchedule}/>
							)
						})
					}
					<br />
					<div style={{display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
						<Typography style={{ fontSize: '20px' }}>Students </Typography>
						<Fab size="small" color="primary" className={classes.iconButton} aria-label="Add" onClick={this.onAddSchedule}>
						<AddIcon />
						</Fab>
					</div>

					<br />					
					<div>
						<Button variant="contained" color="secondary" className={classes.button}  onClick={this.saveLesson}>save</Button>
						<Button variant="outlined" className={classes.button} component={ Link } to="/courses">cancel</Button>
					</div>
					
				</form>
			</Paper>
			</div>
		);
	}
}

AddLesson.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AddLesson);