import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableFooter from '@material-ui/core/TableFooter';
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
import { getClasses } from '../libs/Classes';
import SearchIcon from '@material-ui/icons/Search';
import InputBase from '@material-ui/core/InputBase';
import VisibilityIcon from '@material-ui/icons/Visibility';
import ArchiveIcon from '@material-ui/icons/Archive';
import BookIcon from '@material-ui/icons/Book';
import { Tooltip } from '@material-ui/core';
import {Menu, MenuItem} from '@material-ui/core';
import SessionData from '../libs/SessionData';


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
  card: {
    minWidth: 275,
    // height: window.innerHeight
  },
  input: {
    marginLeft: 8,
    flex: 1,
  }
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

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
  },
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center',
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

class MClasses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      classLists: [],
      searchResult: [],
      page: 0,
      rowsPerPage:5,
      search : '',
      open: false,
      archive: false,
      openMenu: false,
      anchor: null
    };
  }

  componentDidMount() {
    getClasses(SessionData.organizationId,SessionData.academic).then((classLists) => {
        console.log(classLists)
        this.setState({
          classLists
        })
      });
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
    if(this.state.search !== ""){
        let searchResult = this.state.classLists.filter((item) => {
        return item.data.name.toLowerCase() === this.state.search.toLowerCase();
      });
      if (!searchResult || searchResult.length === 0){
        this.setState({searchResult: this.state.classLists, open: true, search:''});        
      }
      else{
        this.setState({searchResult, search:''})
      }
      this.setState({searchResult});
    }
    else
    {
      this.setState({searchResult: this.state.classLists});
    }
  }

	render() {
    const { classes } = this.props;
    const { classLists, rowsPerPage, page, searchResult } = this.state;
    const emptyRows = rowsPerPage - Math.min(rowsPerPage, classLists.length - page * rowsPerPage);
    let classList = (searchResult.length > 0 ? searchResult : classLists);
    return (
      <div>
      <div id="msurface">
        <Card className={classes.card} style={{paddingTop: '10px',paddingBottom: 50}}>
          <CardContent>
            <div className={classes.root} style={{paddingTop: '30px',paddingRight: '30px',paddingLeft: '30px',paddingBottom: '20px'}}>
              <Grid container spacing={24}>
                <Grid item xs={7}>
                  <Typography variant="h5" component="h3">Class</Typography>
                </Grid>

                <Grid item xs={3}>
                  <Paper style={{width:'100%'}}>
                    <InputBase 
                      className={classes.input} 
                      value={this.state.search}
                      placeholder={"Search Classes ..."}
                      onChange={(e) => {this.setState({search: e.target.value})}}
                    />
                    <IconButton 
                      className={classes.iconButton} 
                      aria-label="Search" 
                      onClick={this.BtnClick} 
                      style={{marginLeft:5}}
                    >
                      <SearchIcon />
                    </IconButton>
                  </Paper>
                </Grid>
                <Grid item xs={2}>
                  <Button 
                    variant="contained" 
                    color="secondary" 
                    className={classes.button} 
                    component={Link} to="addclasses">
                      Add Classes
                  </Button>
                </Grid>
            </Grid>
            </div>
  
            <Paper className={classes.root}>
              <Table className={classes.table} >
                <TableHead>
                  <TableRow>
                    <TableCell align="center" >Class</TableCell>
                    <TableCell align="center" >Homeroom</TableCell>
                    <TableCell align="center" >Classroom</TableCell>
                    <TableCell align="center" >Label</TableCell>
                    <TableCell align="center" >Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {
                    classList.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(item => (
                    <TableRow key={item.data.name}>
                      <TableCell align="center" >{item.data.name}</TableCell>
                      <TableCell align="center" >Homeroom</TableCell>
                      <TableCell align="center" ></TableCell>
                      <TableCell align="center" >{item.data.label}</TableCell>
                      <TableCell align="center">
                        <div>
                        <Tooltip title='view'>
                          <IconButton aria-label="Delete" className={classes.margin} component={Link} to={"viewclasses/" + item.id}>
                            <VisibilityIcon className={classes.icon} />
                          </IconButton>
                        </Tooltip>
                          <Tooltip title='archive'>
                            <IconButton aria-label="Delete" className={classes.margin}>
                              <ArchiveIcon className={classes.icon} />
                            </IconButton>
                          </Tooltip>
                        <Tooltip title='lesson'>
                          <IconButton aria-label="Delete" className={classes.margin} >
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
                      colSpan={9}
                      count={classLists.length}
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
      </div>

    );
  }

}

MClasses.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MClasses);