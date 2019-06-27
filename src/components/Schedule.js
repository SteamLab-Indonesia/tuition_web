import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = {
    // card: {
    //   minWidth: 275,
    // },
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
  };

const days = [
    {text: 'SUN', val: 6},
    {text: 'MON', val: 0},
    {text: 'TUE', val: 1},
    {text: 'WED', val: 2},
    {text: 'THU', val: 3},
    {text: 'FRI', val: 4},
    {text: 'SAT', val: 5},
];

const DEFAULT_DAY = days[1].text;
const DEFAULT_START = '08:00';
const DEFAULT_END = '10:00';

const styles = {
    container: {
        width: '100%',
        aspectRatio: 6,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    dayContainer: {
        width: '100%',
        aspectRatio: 6,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: '10px'        
    },
    buttonContainer: {
        marginRight: '10px'
    },
    label: {
        fontSize: '13rem',
        color: 'white'
    }
};

class Schedule extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            selected: DEFAULT_DAY,
            start: DEFAULT_START,
            end: DEFAULT_END
        }
    }

    componentDidMount = () => {
        let start = DEFAULT_START;
        let end = DEFAULT_END;
        let selected = DEFAULT_DAY;

        if (this.props.selected)
        {
            selected = this.props.selected.toUpperCase();
        }
        if (this.props.start)
        {
            start = this.props.start;
        }
        if (this.props.end)
        {
            end = this.props.end;
        }
        this.setState({selected, start, end});
    }

    onDayClick = (item) => {
        this.setState({selected: item.text});
    }

    handleStartChange = (e) => {
        this.setState({start: + e.target.value});
    }

    handleEndChange = (e) => {
        this.setState({end: e.target.value});
    }

    toJson = () => {
        return {
            day: this.state.selected,
            start: this.state.start,
            end: this.state.end
        }
    }

    render() {
        const classes = useStyles;
        return (
            <div style={{marginTop: '10px'}}>
                <Card className={classes.card} style={{width: "100%"}}>
                    <CardActions>
                        <div style={styles.container}>
                            <div style={styles.dayContainer}>
                            {
                                days.map((item) => {
                                    if (this.state.selected &&
                                        item.text === this.state.selected)
                                    {
                                        return (
                                            <Button key={item.text} variant="contained" color="primary" style={styles.buttonContainer}>
                                                <span id={item.text} >{item.text}</span>
                                            </Button>
                                        );
                                    }
                                    else
                                    {
                                        return (
                                            <Button key={item.text} variant="outlined" color="primary" style={styles.buttonContainer} onClick={()=>this.onDayClick(item)}>
                                                <span id={item.text} >{item.text}</span>
                                            </Button>                                                
                                        )
                                    }
                                })
                            }
                            </div>
                            <TextField
                                id="time"
                                style={{ width: "40%", marginRight: '1cm' }}
                                label="from"
                                type="time"
                                defaultValue={this.props.start ? this.props.start : DEFAULT_START}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                onChange={this.handleStartChange}
                            />
                            <TextField
                                id="time"
                                style={{ width: "40%" }}
                                label="to"
                                type="time"
                                defaultValue={this.props.end ? this.props.end : DEFAULT_END}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                onChange={this.handleEndChange}
                            />
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Schedule;