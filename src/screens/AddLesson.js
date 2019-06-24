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
import { addLesson } from '../libs/Lesson';
import { getCoursesDetails } from '../libs/Courses';
import { getTeacher } from '../libs/Teacher';
import { getClass } from '../libs/Classroom';
import { getCourses } from '../libs/Courses';
import Schedule from '../components/Schedule';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import IconButton from '@material-ui/core/IconButton';

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
  },
});

class TextFields extends React.Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
  constructor(props){
    super(props);
    this.state = {
      teacher: [],
      selectedTeacher: "",
      lesson: '',
      subject: 'none',
      classroom: [],
      selectedClassroom: "",
      courses: [],
      selectedCourses: "",
    }
  }

  componentDidMount = () => {
    const id_num = this.props.match.params.id;
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
    });
    getCourses((cou_list) => {
      this.setState({
        courses: cou_list
      })
    });
    getTeacher((teacher_list) => {
      this.setState({
        teacher: teacher_list
      })
    });
    getClass((class_list) => {
      this.setState({
        classroom: class_list
      })
    });
    this.setState({
      selectedCourses: id_num
    })
  }

  render() {
    const { classes } = this.props;
    const { teacher, classroom, courses, selectedCourses } = this.state;
    console.log(teacher)
    console.log(classroom);
    console.log(selectedCourses);

    return (
      <div className={classes.root} id="surface" class="surface">
        <Paper elevation={1} id="inside">
            <form className={classes.container} noValidate autoComplete="off" onSubmit={this.addCourses}>
                <Typography variant="h5" component="h3" id="papert">
                    New Lesson
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
                  <Typography style={{ fontSize: '20px' }}>Create Schedule </Typography>
                  <IconButton className={classes.iconButton} aria-label="Remove">
                    <RemoveIcon style={{ fontSize: '20px' }} /> 
                  </IconButton>
                  <IconButton className={classes.iconButton} aria-label="Add">
                    <AddIcon style={{ fontSize: '20px' }} /> 
                  </IconButton>
                </div>
                
                <Schedule/>

                
                <br />
                <div>
                  <Button variant="contained" color="secondary" className={classes.button}  onClick={ addLesson }>save</Button>
                  <Button variant="outlined" className={classes.button} component={ Link } to="/courses">cancel</Button>
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