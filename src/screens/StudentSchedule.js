import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import moment from 'moment';
// import '../studentstyle.css'
import "react-big-calendar/lib/css/react-big-calendar.css";
import {Calendar, momentLocalizer} from 'react-big-calendar';

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
// const localizer = Calendar.momentLocalizer(moment) // or globalizeLocalizer
const localizer = momentLocalizer(moment);

const styles = theme => ({
    root: {
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2, 
		width: '100%'   
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


class StudentSchedule extends Component {

    render(){
        let events = [
            {
				start: new Date(2019,7,4,10,0,0),
				end: new Date(2019,7,4,12,0,0),
				title: "Javascript"
            }
		]
		const {classes} = this.props;
        return (
			<div className={classes.root} id="surface">
				<Card className={classes.card}>

					<CardContent>
						<Paper>			            
							<Calendar
								localizer={localizer}
								defaultDate={new Date()}
								defaultView="week"
								events={events}
								style={{ height: "100vh" }}
								views={['week', 'day']}
								min={new Date(2019,7,4,8,0,0)}
								max={new Date(2019,7,10,19,0,0)}
							/>
						</Paper>
					</CardContent>
				</Card>
			</div>
            
        )
    }
}

StudentSchedule.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(StudentSchedule)