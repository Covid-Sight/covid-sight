import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Icon } from 'semantic-ui-react';
// import { Roles } from 'meteor/alanning:roles';

/** The SideBar appears on the side of every page. Rendered by the App Layout component. */
class SideBar extends React.Component {
  render() {
    return (
      <div>
        <Menu borderless icon='labeled' vertical className='home-box'>
          <Menu.Item as={NavLink} activeClassName="active" exact to="/home">
            <Icon name='home'/>
            Home
          </Menu.Item>
          <Menu.Item as={NavLink} activeClassName="active" exact to="/checkin">
            <Icon name='heart'/>
            Health
          </Menu.Item>
          <Menu.Item as={NavLink} activeClassName="active" exact to="/vaccine">
            <Icon name='shield'/>
            Vaccine
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}

// Declare the types of all properties.
SideBar.propTypes = {
  currentUser: PropTypes.string,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
const SideBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(SideBar);

// Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter
export default withRouter(SideBarContainer);
