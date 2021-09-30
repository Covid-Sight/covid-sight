import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Container,
  Grid,
  GridColumn,
  Header,
  Loader,
  // eslint-disable-next-line no-unused-vars
  Segment,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Vaccine } from '../../api/stuff/Vaccine';
import Vaccination from '../components/Vaccine';
import SideBar from '../components/SideBar';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class VaccinePage extends React.Component {

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the page once subscriptions have been received.
  renderPage() {
    const width = {
      paddingLeft: '150px',
    };

    const username = Meteor.user().username;

    const vacc = _.filter(this.props.vaccines, function (vax) {
      if (username === vax.owner) {
        return vax;
      }
      return 0;
    });
    return (
      <Container fluid style={width}>
        <Grid stackable style={{ paddingTop: '25px' }}>
          <GridColumn width={1} style={{ paddingTop: '100px' }}>
            <SideBar/>
          </GridColumn>
          <GridColumn width={12}>
            <Header as="h1" textAlign="center">Vaccine Card Submission</Header>
            {vacc.map((vaccination) => <Vaccination key={vaccination._id} vaccine={vaccination} Vaccine={Vaccine}/>)}
          </GridColumn>
        </Grid>
      </Container>
    );
  }
}

// Require an array of Stuff documents in the props.
VaccinePage.propTypes = {
  vaccines: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Vaccine.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Stuff documents
  const vaccines = Vaccine.collection.find({}).fetch();
  return {
    vaccines,
    ready,
  };
})(VaccinePage);
