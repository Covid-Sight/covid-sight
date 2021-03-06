import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Table, Header, Loader, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Check } from '../../api/stuff/Check';
import CheckItem from '../components/CheckItem';
import SideBar from '../components/SideBar';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class History extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    return (
      <Container>
        <Header as="h1" textAlign="center">Check In History</Header>
        <Grid stackable>
          <Grid.Column width={2}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={12}>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Date</Table.HeaderCell>
                  <Table.HeaderCell>Condition</Table.HeaderCell>
                  <Table.HeaderCell>Edit</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.checks.slice(0).reverse().map((check) => <CheckItem key={check._id} check={check} />)}
              </Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
History.propTypes = {
  checks: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Check.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const checks = Check.collection.find({}).fetch();
  return {
    checks,
    ready,
  };
})(History);
