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
import ArchiveIcon from '@material-ui/icons/Archive';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { Tooltip } from '@material-ui/core';
import { getLessons } from '../libs/Lesson';

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

class VLesson extends Component{
  constructor(props){
    super(props);
    this.state = {
      lesson: [],
      searchResult:[],
      page: 0,
      rowsPerPage: 10,
      search: "",
      open: false,
      id_num: null
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

  componentDidMount() {
    const id_num = this.props.match.params.id;
    getLessons(id_num).then((lesson) => {
      this.setState({lesson});
    })
    this.setState({ id_num });
  }

  render(){
    const { classes } = this.props;
    const { lesson,id_num , rowsPerPage, page } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, lesson.length - page * rowsPerPage);
    console.log(lesson);

    console.log('re-render');
  return (
    <div id="msurface" class="surface">
        <Card className={classes.card} style={{paddingTop: '10px',paddingRight: '30px',paddingLeft: '30px'}}>
            <CardContent>
                <div className={classes.root} style={{paddingTop: '30px',paddingRight: '30px',paddingLeft: '30px',paddingBottom: '30px'}}>
                    <Grid container spacing={24}>
                        <Grid item lg={10}>
                          <Typography variant="h5" component="h3" id="papert">Lesson</Typography>
                        </Grid>
                        <Grid container item lg={2} justify="flex-end" style={{marginRight: 0}}>
                          <Button style={{height: '1cm'}} variant="contained" color="secondary" className={classes.button} component={Link} to={'/addlesson/'+id_num}>add lesson</Button>
                        </Grid>
                    </Grid>
                </div>
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell style={{width: '5%'}}>No.</TableCell>
                        <TableCell style={{width: '25%'}} align="left">Lesson Name</TableCell>
                        <TableCell style={{width: '25%'}} align="left">Level</TableCell>
                        <TableCell style={{width: '25%'}} align="left">Schedule</TableCell>
                        <TableCell style={{width: '10%'}} align="center">Teacher</TableCell>
                        <TableCell style={{width: '10%'}} align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {
                      lesson.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((item,index)=>(
                        <TableRow>
                          <TableCell>{page * 10 + index + 1}</TableCell>
                          <TableCell align="left">{item.data.name}</TableCell>
                          <TableCell align="left">{item.data.program.curriculum} - {item.data.program.level}</TableCell>
                          <TableCell align="left">
                            {item.data.schedule.map((item) => {
                              return (
                                <div>{item.day} {item.start} - {item.end}</div>
                              )
                            })}
                          </TableCell>
                          <TableCell align="center">{item.data.teacher.name}</TableCell>
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
                          count={lesson.length}
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

export default withStyles(styles)(VLesson);