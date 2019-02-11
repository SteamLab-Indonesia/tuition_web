import React from 'react';
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

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
    flexGrow: 1,
  },
  table: {
    minWidth: 700,
  },
  card: {
    minWidth: 275,
    height: '95%',
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
});

let id = 0;
function createData(subject, curriculum, level) {
  id += 1;
  return { subject, curriculum, level };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

function SimpleTable(props) {
  const { classes } = props;

  return (
    <div id="msurface" class="surface">
        <Card className={classes.card} style={{paddingTop: '10px',paddingRight: '30px',paddingLeft: '30px'}}>
            <CardContent>
                <div className={classes.root} style={{paddingTop: '30px',paddingRight: '30px',paddingLeft: '30px',paddingBottom: '20px'}}>
                    <Grid container spacing={24}>
                        <Grid item xs={10}>
                        <Typography variant="h5" component="h3" id="papert">Courses</Typography>
                        </Grid>
                        <Grid item xs={2}>
                        <Button variant="contained" color="secondary" className={classes.button} component={Link} to="addcourses">add courses</Button>
                        </Grid>
                    </Grid>
                </div>
                <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableHead>
                    <TableRow>
                        <TableCell style={{width: '5%'}}>No.</TableCell>
                        <TableCell style={{width: '30%'}} align="left">Subject</TableCell>
                        <TableCell style={{width: '30%'}} align="left">Curriculum</TableCell>
                        <TableCell style={{width: '20%'}} align="left">Level</TableCell>
                        <TableCell style={{width: '15%'}} align="center">Actions</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {rows.map(row => (
                        <TableRow key={row.id}>
                        <TableCell component="th" scope="row">
                            {row.name}
                        </TableCell>
                        <TableCell align="left">{row.subject}</TableCell>
                        <TableCell align="left">{row.curriculum}</TableCell>
                        <TableCell align="left">{row.level}</TableCell>
                        <TableCell align="left">
                        <div>
                        <IconButton aria-label="Delete" className={classes.margin}>
                          <VisibilityIcon className={classes.icon} />
                        </IconButton>
                        <IconButton aria-label="Delete" className={classes.margin}>
                          <ArchiveIcon className={classes.icon} />
                        </IconButton>
                        </div>
                        </TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </Paper>
            </CardContent>
        </Card>
    </div>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);