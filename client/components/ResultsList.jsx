import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import ListSubheader from 'material-ui/List/ListSubheader';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Collapse from 'material-ui/transitions/Collapse';
import InboxIcon from 'material-ui-icons/MoveToInbox';
import DraftsIcon from 'material-ui-icons/Drafts';
import SendIcon from 'material-ui-icons/Send';
import ExpandLess from 'material-ui-icons/ExpandLess';
import ExpandMore from 'material-ui-icons/ExpandMore';
import StarBorder from 'material-ui-icons/StarBorder';
import { sortBy } from 'lodash';

import { getDomainsWithWhois } from '../fetcher.js';

const styles = theme => ({
  root: {
    width: '100%',
    background: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4,
  },
});

class NestedList extends React.Component {
  state = { open: true };

  componentWillMount() {
    getDomainsWithWhois().then((domains) => this.setState({ domains: sortBy(domains, 'expiry') }));
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  render() {
    const { classes } = this.props;
    const { domains = [] } = this.state;

    return (
      <List className={classes.root} subheader={<ListSubheader>Domains status</ListSubheader>}>
        {
          domains.map((domain, index) => 
            <ListItem button key={index}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText inset primary={ domain.name } secondary={ `Status: ${domain.state}, expires: ${domain.expiry}` }/>
            </ListItem>
          )
        }
      </List>
    );
  }
}

NestedList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NestedList);