import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import TextField from '@material-ui/core/TextField'

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

  

class Schedule extends React.Component{

    render() {
        //const { classes } = this.props;
        const classes = useStyles;
        //const [value, setValue] = React.useState('female');

        // function handleChange(event) {
        //     setValue(event.target.value);
        // }

        return (
            <div>
                <Card className={classes.card} style={{width: "50%"}}>
                    <CardActions>
                        <div className={classes.root}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    aria-label="Gender"
                                    name="gender1"
                                    style={{flexDirection: "row"}}
                                    // value={value}
                                    // onChange={handleChange}
                                >
                                <FormControlLabel value="Monday" control={<Radio />} label="Monday" />
                                <FormControlLabel value="Tuesday" control={<Radio />} label="Tuesday" />
                                <FormControlLabel value="Wednesday" control={<Radio />} label="Wednesday" />
                                <FormControlLabel value="Thursday" control={<Radio />} label="Thursday" />
                                <FormControlLabel value="Friday" control={<Radio />} label="Friday" />
                                <FormControlLabel value="Saturday" control={<Radio />} label="Saturday" />
                                </RadioGroup>
                            </FormControl>
                            <form style={{display: 'flex', flexWrap: 'wrap'}} noValidate>
                                <TextField
                                    id="time"
                                    style={{ width: "40%", marginRight: '1cm' }}
                                    label="from"
                                    type="time"
                                    defaultValue="00:00"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                                <TextField
                                    id="time"
                                    style={{ width: "40%" }}
                                    label="to"
                                    type="time"
                                    defaultValue="00:00"
                                    InputLabelProps={{
                                    shrink: true,
                                    }}
                                    inputProps={{
                                    step: 300, // 5 min
                                    }}
                                />
                            </form>
                        </div>
                    </CardActions>
                </Card>
            </div>
        );
    }
}

export default Schedule;