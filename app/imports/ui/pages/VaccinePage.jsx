import React from 'react';
import { Meteor } from 'meteor/meteor';
import {
  Container,
  Grid,
  GridColumn,
  Header,
  Loader,
} from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import { Vaccine } from '../../api/stuff/Vaccine';
import Vaccination from '../components/Vaccine';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

/** Renders a page with a grid displaying both the sidebar and vaccination information of the user. Use <Vaccination> to render each List item and segment. */
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

    /** Create a const that stored the current username of the user. In this case the email.
     * Then used underscore function filter to filter out the vaccinations that are submitted only by the logged in user.
     * * */
    const username = Meteor.user().username;

    const vacc = _.filter(this.props.vaccines, function (vax) {
      if (username === vax.owner) {
        return vax;
      }
      return 0;
    });

    return (
      <div>
        <NavBar/>
        <Container id="vaccine-page" fluid style={width}>
          <Grid stackable style={{ paddingTop: '20px' }}>
            <GridColumn width={1} style={{ paddingTop: '60px' }}>
              <SideBar/>
            </GridColumn>
            <GridColumn width={12}>
              <Header as="h1" textAlign="center">Vaccine Card Submission</Header>
              {vacc.map((vaccination) => <Vaccination key={vaccination._id} vaccine={vaccination} Vaccine={Vaccine}/>)}
            </GridColumn>
          </Grid>
        </Container>
      </div>
    );
  }
}

// Require an array of Vaccine documents in the props.
VaccinePage.propTypes = {
  vaccines: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vaccine documents.
  const subscription = Meteor.subscribe(Vaccine.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the Vaccine documents
  const vaccines = Vaccine.collection.find({}).fetch();
  return {
    vaccines,
    ready,
  };
})(VaccinePage);
