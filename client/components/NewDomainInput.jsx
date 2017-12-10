import React from 'react';
import es6BindAll from 'es6bindall';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';
import { withStyles } from 'material-ui/styles';

import { addDomain } from '../fetcher.js'

const VanishingWrapper = (props) => props.children;

const styles = theme => ({
    textField: {
      marginLeft: theme.spacing.unit,
      marginRight: theme.spacing.unit,
      width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    }
  });

class NewDomainInput extends React.Component {

    constructor(props) {
        super(props);
        es6BindAll(this, [
            'handleChange',
            'handleRequestClose',
            'handleAddDomain'
        ]);
    }
    
    state = {
        name: '',
        isSnackbarOpen: false
    }
    
    handleChange(event) {
        return this.setState({
            name: event.target.value
        })
    };

    handleRequestClose() {
        return this.setState({
            isSnackbarOpen: false
        });
    }

    handleAddDomain() {
        addDomain(this.state.name)
            .then(() => this.setState({
                name: '',
                isSnackbarOpen: true
            }));
    }
    
    render() {
        const { classes } = this.props;
        return (
            <VanishingWrapper>
                <TextField
                    id="name"
                    label="Name"
                    className={classes.textField}
                    value={this.state.name}
                    onChange={this.handleChange}
                    margin="normal"
                />
                <Button raised color="primary" className={classes.button} onClick={this.handleAddDomain}>
                    Add domain
                </Button>
                <Snackbar
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={this.state.isSnackbarOpen}
                    autoHideDuration={6000}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">Domain added</span>}
                    action={[
                        <Button key="undo" color="accent" dense onClick={this.handleRequestClose}>
                            Close
                        </Button>,
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleRequestClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </VanishingWrapper>
        );
    }

}

export default withStyles(styles)(NewDomainInput);