import { createMuiTheme } from '@material-ui/core/styles';
import { blue, pink } from '@material-ui/core/colors';

export const styles = theme => ({
    root: {
        color: theme.palette.text.primary,
    },
    icon: {
        margin: theme.spacing.unit,
        fontSize: 70,
    },
    card: {
        minWidth: 300,
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

export const theme = createMuiTheme({
    palette: {
        //type: 'dark', // Switching the dark mode on is a single property value change.
        primary: blue,
        secondary: pink,
    },
    typography: { useNextVariants: true },
});

export const ScreenStyle = {
    paddingTop: '120px',
    paddingLeft: '240px',
    backgroundColor: 'cornflowerblue'   
};

export const ScreenCloseStyle = {
    paddingTop: '120px',
    backgroundColor: 'cornflowerblue'    
};
