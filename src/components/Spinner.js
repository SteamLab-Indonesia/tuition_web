import React from 'react';
import PropTypes from 'prop-types';
import {Paper, CircularProgress} from '@material-ui/core';

Spinner.propTypes = {
    onClose: PropTypes.func,
    open: PropTypes.bool
};

const styles = {
    dialogBox: {
        width: 60,
        height: 60,
        borderRadius: 10,
        position: 'absolute',
        float: 'left',
        zIndex: 1,
        left: '50%',
        marginTop: window.innerHeight * 0.3
    },
    circularBox: {
        margin: 10
    }
}
export default function Spinner(props) {

    const { onClose, open } = props;

    function handleClose() {
        if (onClose)
            onClose();
    }

    if (open)
    {
        return (
            <Paper style={styles.dialogBox} onClose={handleClose}>
                <CircularProgress style={styles.circularBox} />
            </Paper>
        );
    }
    else
    {
        return null;
    }
}