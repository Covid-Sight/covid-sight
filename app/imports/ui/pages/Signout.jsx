import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Button, Grid, GridColumn, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <div className='sign-out'>
        <Header id="signout-page" as="h1" textAlign="center">
          <p>You have successfully signed out.</p>
        </Header>
        <Grid container centered>
          <GridColumn width={2}>
            <Button as={NavLink} activeClassName="" exact to="/" key='login' textAlign="center" size='huge' className='gold-button' circular inverted>
              Login
            </Button>
          </GridColumn>
        </Grid>
      </div>
    );
  }
}
