import React, {Component} from 'react';
import {CircularProgress} from '@material-ui/core';

class SplashScreen extends Component {

    state = {
        timer: null
    }

    componentDidMount = () => {
        setTimeout(()=> {
            this.props.history.push('/login');
        }, 1500);
    }

    render() {
        return (
            <div style={styles.container}>
                <img src='/images/logo.png' style={styles.logoImage} alt='SteamLab' />
                <CircularProgress style={styles.loading}/>
            </div>
        )
    }
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: window.innerHeight,
        backgroundColor: '#ADD8E6'
    },
    logoImage: {
        width: 200,
    },
    loading: {
        marginTop: 20
    }
}
export default SplashScreen;