import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Scheduler, {SchedulerData, ViewTypes, DATE_FORMAT} from 'react-big-scheduler'
import moment from 'moment'
import { DragDropContext } from 'react-dnd'
import '../studentstyle.css'

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



class StudentSchedule extends Component {
    constructor(props){
        super(props);    
    }
    render(){
        let schedulerData = new SchedulerData(new moment().format(DATE_FORMAT), ViewTypes.Week);
        moment.locale('zh-cn');
        schedulerData.setLocaleMoment(moment);
        let resources = [
            {
               id: 'r1',
               name: 'Resource1'
            },
            {
               id: 'r2',
               name: 'Resource2'
            },
            {
               id: 'r3',
               name: 'Resource3'
            }
        ];
        schedulerData.setResources(resources);
        let events = [
            {
                 id: 1,
                 start: '2017-12-18 09:30:00',
                 end: '2017-12-19 23:30:00',
                 resourceId: 'r1',
                 title: 'I am finished',
                 bgColor: '#D9D9D9'
             }, 
             {
                 id: 2,
                 start: '2017-12-18 12:30:00',
                 end: '2017-12-26 23:30:00',
                 resourceId: 'r2',
                 title: 'I am not resizable',
                 resizable: false
             }, 
             {
                 id: 3,
                 start: '2017-12-19 12:30:00',
                 end: '2017-12-20 23:30:00',
                 resourceId: 'r3',
                 title: 'I am not movable',
                 movable: false
             }, 
             {
                 id: 4,
                 start: '2017-12-19 14:30:00',
                 end: '2017-12-20 23:30:00',
                 resourceId: 'r1',
                 title: 'I am not start-resizable',
                 startResizable: false
             }, 
             {
                 id: 5,
                 start: '2017-12-19 15:30:00',
                 end: '2017-12-20 23:30:00',
                 resourceId: 'r2',
                 title: 'R2 has recurring tasks every week on Tuesday, Friday',
                 rrule: 'FREQ=WEEKLY;DTSTART=20171219T013000Z;BYDAY=TU,FR',
                 bgColor: '#f759ab'
             }
         ];
        schedulerData.setEvents(events);
        const { classes } = this.props;
        return (
            <div>
                <Card className={classes.card}>
                    <div className={classes.root}>
                        <CardContent>
                            <Paper>
                                <Scheduler schedulerData={schedulerData}
                                        prevClick={this.prevClick}
                                        nextClick={this.nextClick}
                                        onSelectDate={this.onSelectDate}
                                        onViewChange={this.onViewChange}
                                        eventItemClick={this.eventClicked}
                                />
                            </Paper>
                        </CardContent>
                    </div>
                </Card>
            </div>
        )
    }
}

StudentSchedule.propTypes = {
    classes: PropTypes.object.isRequired,
  };

export default withStyles(styles)(StudentSchedule)