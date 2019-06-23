import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import VisibilityIcon from '@material-ui/icons/Visibility';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import ArchiveIcon from '@material-ui/icons/Archive';
import IconButton from '@material-ui/core/IconButton';
import { getCourses } from '../libs/Courses';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade } from '@material-ui/core/styles/colorManipulator';
import BookIcon from '@material-ui/icons/Book';
import { Tooltip } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const actionsStyles = theme => ({
  root: {
    flexShrink: 0,
    color: theme.palette.text.secondary,
    marginLeft: theme.spacing.unit * 2.5,
  },
});

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    flexGrow: 1,
  },
  paper: {
    
  },
  // search: {
  //   alignItems: 'flex-end',
  // },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit,
      width: 'auto',
    },
  },
  input: {
    marginLeft: 8,
    flex: 1,
  },
  iconButton: {
    padding: 7,
  },
  table: {
    minWidth: 700,
  },
  card: {
    minWidth: 275,
    height: '900px',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  searchIcon: {
    width: theme.spacing.unit * 9,
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});



// getOrganization((org_list) =>{
//   this.setState({organization:org_list});
// });

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

class MCourses extends Component{
  constructor(props){
    super(props);
    this.state = {
      courses: [],
      searchResult:[],
      page: 0,
      rowsPerPage: 10,
      search: "",
      open: false,
    }
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  BtnClick = () => {
    //console.log('==================> BTN CLICK');
    console.log(this.state.search);
    if(this.state.search != ""){
      let searchResult = this.state.courses.filter((item) => {
        console.log(item.data.subject);
        return item.data.subject.toLowerCase() == this.state.search.toLowerCase();
      });
      if (!searchResult || searchResult.length == 0)
      {
        this.setState({searchResult: this.state.courses, open: true, search: ''});        
      }
      else
      {
        this.setState({searchResult, search: ''});
      }      
    }
    else
    {
      this.setState({searchResult: this.state.courses});
    }
  }

  componentDidMount() {
    //window.location.reload()
    getCourses((cou_list) => {
      this.setState({
        courses: cou_list
      })
    });
  }

  render(){
    const { classes } = this.props;
    const { courses, rowsPerPage, page, searchResult } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, courses.length - page * rowsPerPage);
    let courseList = (searchResult.length > 0 ? searchResult : courses);
    console.log(courses);

    console.log('re-render');
  return (
    <div id="msurface" class="surface">
      <div>
        
        <Dialog
            open={this.state.open}
            onClose={this.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"NOT FOUND!"}</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Try to search again..
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleClose} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Dialog>
      </div>
        <Card className={classes.card} style={{paddingTop: '10px',paddingRight: '30px',paddingLeft: '30px'}}>
            <CardContent>
                <div className={classes.root} style={{paddingTop: '30px',paddingRight: '30px',paddingLeft: '30px',paddingBottom: '30px'}}>
                    <Grid container spacing={24}>
                        <Grid item lg={5}>
                          <Typography variant="h5" component="h3" id="papert">Courses</Typography>
                        </Grid>
                        <Grid 
                          container
                          justify="flex-end"
                          item lg={5}   
                        >   
                          <Paper className={classes.paper} style={{width: '65%', height:"1cm"}}>                       
                          <InputBase 
                            className={classes.input} 
                            placeholder="Search Course..." 
                            value={this.state.search}
                            onChange={(e) => {this.setState({search: e.target.value})}}
                          />
                          <IconButton className={classes.iconButton} aria-label="Search" onClick={this.BtnClick}>
                            <SearchIcon />
                          </IconButton>
                          </Paper>
                        </Grid>
                        <Grid container item lg={2} justify="flex-end" style={{marginRight: 0}}>
                          <Button style={{height: '1cm'}} variant="contained" color="secondary" className={classes.button} component={Link} to="/addcourses">add courses</Button>
                        </Grid>
                    </Grid>
                </div>
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell style={{width: '5%'}}>No.</TableCell>
                        <TableCell style={{width: '30%'}} align="left">Subject</TableCell>
                        <TableCell style={{width: '20%'}} align="left">Curriculum</TableCell>
                        <TableCell style={{width: '25%'}} align="center">Level</TableCell>
                        <TableCell style={{width: '20%'}} align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      courseList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index)=>(
                        <TableRow>
                          <TableCell>{page * 10 + index + 1}</TableCell>
                          <TableCell align="left">{item.data.subject}</TableCell>
                          <TableCell align="left">{item.data.curriculum}</TableCell>
                          <TableCell align="center">{item.data.level}</TableCell>
                          <TableCell align="left">
                        <div>
                        <Tooltip title='view'>
                          <IconButton aria-label="Delete" className={classes.margin} component={Link} to={"viewcourses/"+item.id}>
                            <VisibilityIcon className={classes.icon} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='archive'>
                          <IconButton aria-label="Delete" className={classes.margin}>
                            <ArchiveIcon className={classes.icon} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='lesson'>
                          <IconButton aria-label="Delete" className={classes.margin} component={Link} to={'lesson/'+item.id}>
                            <BookIcon className={classes.icon} />
                          </IconButton>
                        </Tooltip>
                        </div>
                        </TableCell>
                        </TableRow>
                      ))
                    }
                    {emptyRows > 0 && (
                      <TableRow style={{ height: 48 * emptyRows }}>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                    </TableBody>
                    <TableFooter>
                      <TableRow>
                        <TablePagination
                          rowsPerPageOptions={[10]}
                          colSpan={8}
                          count={courses.length}
                          rowsPerPage={rowsPerPage}
                          page={page}
                          SelectProps={{
                            native: true,
                          }}
                          onChangePage={this.handleChangePage}
                          onChangeRowsPerPage={this.handleChangeRowsPerPage}
                          ActionsComponent={TablePaginationActionsWrapped}
                        />
                      </TableRow>
                    </TableFooter>
                </Table>
                </Paper>
            </CardContent>
        </Card>
    </div>
  );
  }
  
}

// SimpleTable.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

export default withStyles(styles)(MCourses);