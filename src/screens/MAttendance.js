import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Switch from '@material-ui/core/Switch';
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { getStudent } from '../libs/Student';
import { TableFooter } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';

const styles = theme => ({
    root: {
      width: '100%',
      marginTop: theme.spacing.unit * 3,
    },
    table: {
      minWidth: 500,
      overflowX: 'auto',
      flexGrow: 1,    
    },
    card: {
      minWidth: 275,
      height: window.innerHeight
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    input: {
      marginLeft: 8,
      flex: 1,
      
    },
    iconButton: {
      padding: 7,
    },
  });

const actionsStyles = theme => ({
root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
},
});

class TablePaginationActions extends React.Component {
handleFirstPageButtonClick = event => {
    this.props.onChangePage(event, 0);
};

handleBackButtonClick = event => {
    this.props.onChangePage(event, this.props.page - 1);
};

handleNextButtonClick = event => {
    this.props.onChangePage(event, this.props.page + 1);
};

handleLastPageButtonClick = event => {
    this.props.onChangePage(
    event,
    Math.max(0, Math.ceil(this.props.count / this.props.rowsPerPage) - 1),
    );
};

render() {
    const { classes, count, page, rowsPerPage, theme } = this.props;

    return (
    <div className={classes.root}>
        <IconButton
        onClick={this.handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="First Page"
        >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
        onClick={this.handleBackButtonClick}
        disabled={page === 0}
        aria-label="Previous Page"
        >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
        </IconButton>
        <IconButton
        onClick={this.handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Next Page"
        >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
        </IconButton>
        <IconButton
        onClick={this.handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Last Page"
        >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
    </div>
    );
}
}

TablePaginationActions.propTypes = {
classes: PropTypes.object.isRequired,
count: PropTypes.number.isRequired,
onChangePage: PropTypes.func.isRequired,
page: PropTypes.number.isRequired,
rowsPerPage: PropTypes.number.isRequired,
theme: PropTypes.object.isRequired,
};

const TablePaginationActionsWrapped = withStyles(actionsStyles, { withTheme: true })(
TablePaginationActions,
);
class MAttendance extends Component  {
    constructor(props){
        super(props);
        this.state = {
            student: [],
            page: 0,
            rowsPerPage:5,
            search:'',
            searchResult:[]
        };
    }

    state = {
        checkedA: true,
        checkedB: true,
      };
    
    handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
    };

    componentDidMount(){
        getStudent().then((student_list) => {
            console.log(student_list);
            this.setState({       
                student: student_list
            })
        })
        .catch((err) => {
            console.log(err);
        })
    }

    BtnClick = () => {
        if(this.state.search !== ""){
            let searchResult = this.state.student.filter((item) => {
            return item.data.name.toLowerCase() === this.state.search.toLowerCase();
          });
          if (!searchResult || searchResult.length === 0){
            this.setState({searchResult: this.state.student, open: true, search:''});        
          }
          else{
            this.setState({searchResult, search:''})
          }
          this.setState({searchResult});
        }
        else
        {
          this.setState({searchResult: this.state.student});
        }
    }

    render(){
        const { classes } = this.props;
        const { student, rowsPerPage, page, searchResult } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, student.length - page * rowsPerPage);
        let studentList = (searchResult.length > 0 ? searchResult : student);
        console.log(this.state.checkedB)
        return (
            <div id="msurface" className="surface">
            <Card className={classes.card} style={{paddingTop: '10px'}}>
                <CardContent>
                    <Grid container spacing={24}>
                        <Grid item xs={8}>
                            <Typography variant="h5" component="h3" style={{paddingLeft:10}}>
                                Attendance
                            </Typography>
                            <br/>
                        </Grid>

                        <Grid item xs={3}>
                            <Paper style={{width:'100%',marginTop:10}}>
                                <InputBase 
                                className={classes.input} 
                                value={this.state.search}
                                placeholder="Search Staff..."
                                onChange={(e) => {this.setState({search: e.target.value})}}
                                />
                                <IconButton 
                                className={classes.iconButton} 
                                aria-label="Search" 
                                onClick={this.BtnClick} 
                                style={{marginLeft:20}}
                                >
                                <SearchIcon />
                                </IconButton>
                            </Paper>   
                         </Grid>

                            <Typography style={{paddingLeft:30,color:"grey",fontSize:20}}>
                                Courses :
                                    <TextField 
                                        placeholder=" Select the course"
                                        style={{paddingLeft:10,paddingBottom:10}}
                                    >
                                            
                                    </TextField>
                                <br/>
                                Teacher :
                                    <TextField 
                                        placeholder=" Enter your name"
                                        style={{paddingLeft:10,paddingBottom:10}}
                                    >
                                            
                                    </TextField>
                                <br/>
                                Lesson :
                                    <TextField 
                                        placeholder=" Select the lesson"
                                        style={{paddingLeft:10,paddingBottom:10}}
                                    >
                                            
                                    </TextField>
                                <br/>
                                Date :
                                    <TextField 
                                        placeholder=" Select the date"
                                        style={{paddingLeft:10,paddingBottom:40}}
                                    >
                                            
                                    </TextField>
                                <br/>
                            </Typography>
                            <Paper className={classes.root} style={{width:"96%",marginLeft:18}}>
                                <Table className={classes.table}>
                                    <TableBody>
                                        <TableRow>
                                            <TableCell align="center" style={{width:"10%"}}>No.</TableCell>
                                            <TableCell align="center" >Name</TableCell>
                                            <TableCell align="center" >Status</TableCell>                    
                                            <TableCell align="center" >Note</TableCell>
                                        </TableRow>
                                        {studentList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index) => (
                                            <TableRow>
                                                <TableCell>{ page * 10 + index +1}</TableCell>
                                                <TableCell align="center">{item.data.name}</TableCell>
                                            </TableRow>
                                        ))}
                                        
                                    </TableBody>
                                    <TableFooter>
                                        <TableRow>
                                            <TablePagination
                                                rowsPerPageOptions={[10]}
                                                colSpan={9}
                                                count={student.length}
                                                rowsPerPage={rowsPerPage}
                                                page={page}
                                                SelectProps={{
                                                native: true,
                                                }}
                                                onChangePage={this.handleChangePage}
                                                ActionsComponent={TablePaginationActionsWrapped}
                                                onChangeRowsPerPage={this.handleChangeRowsPerPage}                 
                                            />
                                        </TableRow>
                                    </TableFooter>
                                </Table> 
                            </Paper>
                        
                    </Grid>
                </CardContent>
            </Card>
            </div>
        );
    }
}

MAttendance.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MAttendance);

