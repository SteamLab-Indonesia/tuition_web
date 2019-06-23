import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import TableRow from '@material-ui/core/TableRow';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import { getTeacher } from '../libs/Teacher';


const CustomTableCell = withStyles(theme => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
}))(TableCell);

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
  },
  table: {
    minWidth: 500,
    overflowX: 'auto',
    flexGrow: 1,    
  },
  table: {
    minWidth: 700,
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

class MTeacher extends Component {
  constructor(props) {
    super(props);
    this.state = {
      teacher: [],
      searchResult: [],
      page: 0,
      rowsPerPage:10,
      state : ''
    }
  }

  componentDidMount() {
    getTeacher().then((teacher_list) => {
      this.setState({
        teacher: teacher_list
      })
    })
    .catch((err) => {
      console.log(err);
    });
  }

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ page: 0, rowsPerPage: event.target.value });
  };

  BtnClick = () => {
    console.log(this.state.search);
    let searchResult = this.state.teacher.filter((item) => {
      console.log(item.data.name);
      return item.data.name.toLowerCase() == this.state.search.toLowerCase();
    })
    this.setState({searchResult});
  }

  render() {
    const { classes } = this.props;
    const { teacher, rowsPerPage, page } = this.state;
    // const emptyRows = rowsPerPage - Math.min(rowsPerPage, teacher.length - page * rowsPerPage);

    return (
      <div id="msurface" className="surface">
        <Card className={classes.card} style={{paddingTop: '10px'}}>
          <CardContent>
  
            <div className={classes.root} style={{paddingTop: '30px',paddingRight: '30px',paddingLeft: '30px',paddingBottom: '20px'}}>
              <Grid container spacing={24}>
                <Grid item xs={7}>
                  <Typography variant="h5" component="h3">Teachers</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Paper style={{width:'100%'}}>
                    <InputBase 
                      className={classes.input} 
                      value={this.state.search}
                      placeholder="Search Teacher..."
                      onChange={(e) => {this.setState({search: e.target.value})}}
                    />
                    <IconButton className={classes.iconButton} aria-label="Search" onClick={this.BtnClick}>
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>

                <Grid item xs={2}>
                  <Button variant="contained" color="secondary" className={classes.button} component={Link} to="addteachers">
                    add teacher
                  </Button>
                </Grid>
              </Grid>
            </div>
  
            <Paper className={classes.root}>
              <Table className={classes.table} >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" >Student</TableCell>
                    <TableCell align="center" >Username</TableCell>
                    <TableCell align="center" >Email</TableCell>                    
                    <TableCell align="center" >Birthday</TableCell>
                    <TableCell align="center" >Gender</TableCell>
                    <TableCell align="center" >Phone Number</TableCell>
                    <TableCell align="center" >Address</TableCell>
                    <TableCell align="center" >Subject</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    this.state.teacher.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                    <TableRow key={item.id}>
                      <CustomTableCell align="center" style={{fontSize:'12px'}}>{item.data.name}</CustomTableCell>
                      <CustomTableCell align="center" style={{fontSize:'12px'}}>{item.data.username}</CustomTableCell>
                      <CustomTableCell align="center" style={{fontSize:'12px'}}>{item.data.email}</CustomTableCell>
                      <CustomTableCell align="center" style={{fontSize:'12px'}}>{item.data.birthday}</CustomTableCell>
                      <CustomTableCell align="center" style={{fontSize:'12px'}}>{item.data.gender}</CustomTableCell>
                      <CustomTableCell align="center" style={{fontSize:'12px'}}>{item.data.phone}</CustomTableCell>
                      <CustomTableCell align="center" style={{fontSize:'12px'}}>{item.data.address}</CustomTableCell>
                      <CustomTableCell align="center" style={{fontSize:'12px'}}>{item.data.subject}</CustomTableCell>
                    </TableRow>
                  ))
                  }
                </TableBody>

                <TableFooter>
                  <TableRow>
                    <TablePagination
                      rowsPerPageOptions={[10]}
                      colSpan={9}
                      count={teacher.length}
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
  
          </CardContent>
        </Card>
      </div>
    );
  }

}

MTeacher.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MTeacher);