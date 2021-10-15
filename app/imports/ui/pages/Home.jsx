import React from 'react';
import { Meteor } from 'meteor/meteor';
import { _ } from 'meteor/underscore';
import { NavLink } from 'react-router-dom';
import { withTracker } from 'meteor/react-meteor-data';
import { Grid, Header, Segment, Button, Icon, List } from 'semantic-ui-react';
import { Vaccine } from '../../api/stuff/Vaccine';
import { Check } from '../../api/stuff/Check';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

/** Renders the home page for when the user is logged in. */
class Home extends React.Component {
  render() {
    // Styling for segment box borders
    const incomplete = {
      borderColor: '#E20000',
      borderWidth: '2px',
    };
    const complete = {
      borderColor: 'green',
      borderWidth: '2px',
    };
    // Checks if user completed vaccine upload and daily check-in
    function vaccineUpload() {
      if (Vaccine.collection.find({}).fetch().length === 0) {
        return incomplete;
      }
      return complete;
    }
    function checkIn() {
      let currentDay = new Date().toDateString();
      let checkCollection = Check.collection.find({}).fetch();
      let checkHistory = _.find(checkCollection, function (checkin) { return new Date(checkin.date).toDateString() === currentDay; });
      if (checkHistory === undefined) {
        return incomplete;
      }
      return complete;
    }
    return (
      <div>
        <NavBar/>
        <div className="home-page" id="home-page">
          <Grid stackable id='landing-page' textAlign='center' container>
            <Grid.Column width={4}>
              <SideBar/>
            </Grid.Column>
            <Grid.Column width={8}>
              <Segment className="home-box" style={checkIn()}>
                <div align="left">
                  <Header as='h3' textAlign='left'>Daily Health Check-In</Header>
                  <p>Help keep our campus safe by completing your daily health check-in!</p>
                  <List ordered>
                    <List.Item>
                      Check your symptoms.
                    </List.Item>
                    <List.Item>
                      Keep track of your symptoms every day.
                    </List.Item>
                  </List>
                  {/* CHANGE "/add" TO LINK TO CHECK SYMPTOMS PAGE */}
                  <Button id="check-in" className="gold-button" circular inverted icon labelPosition='left'
                    as={NavLink} exact to="/checkin" key='checkin'>
                    <Icon name='heart outline'/>
                    Check Your Symptoms
                  </Button>
                  <Button className="gold-button" circular inverted icon labelPosition='left'
                    as={NavLink} exact to="/history" key='history'>
                    <Icon name='heart outline'/>
                    History
                  </Button>
                </div>
              </Segment>
              <Segment className="home-box" style={vaccineUpload()}>

                <div align="left">
                  <Header as='h3' textAlign='left'>Vaccine Status</Header>
                  {(vaccineUpload() === complete) ? <p>You have uploaded your vaccine information!</p> :
                    <p>You have not uploaded your vaccine information!</p>}
                  {/* CHANGE "/add" TO LINK TO UPLOAD VACCINE PAGE */}
                  <Button id="add-vaccine" className="gold-button" circular inverted icon labelPosition='left'
                    as={NavLink} exact to="/vaccine" key='check'>
                    <Icon name='upload'/>
                    Upload Your Vaccine Information
                  </Button>
                  <Button id="vaccine-submission" className="gold-button" circular inverted icon labelPosition='left'
                    as={NavLink} exact to="/vaccine-page" key='check'>
                    <Icon name='medkit'/>
                    View Vaccine
                  </Button>
                </div>
              </Segment>
            </Grid.Column>
            <Grid.Column width={4}>
              <Segment className="home-box">
                <div align="left">
                  <Header as='h5' textAlign='left'>Get COVID-19 Testing</Header>
                  <div>
                    <a href="https://www.clinicallabs.com/appt/uhtest/">UH Provided COVID Testing</a>
                  </div>
                  <div>
                    <a href="https://www.clinicallabs.com/appt/uhtest/">Other COVID Testing Programs</a>
                  </div>
                </div>
              </Segment>
              <Segment className="home-box">
                <div align="left">
                  <Header as='h5' textAlign='left'>Resources</Header>
                  <div>
                    <a href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">CDC Guidance</a>
                  </div>
                  <div>
                    <a href="https://health.hawaii.gov/coronavirusdisease2019/">Hawai&apos;i Guidance</a>
                  </div>
                </div>
              </Segment>
            </Grid.Column>
          </Grid>
        </div>
      </div>
    );
  }
}

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(() => {
  // Get access to Vaccine and Check documents.
  Meteor.subscribe(Vaccine.userPublicationName);
  Meteor.subscribe(Check.userPublicationName);

  // Get the Vaccine and Check documents
  const vaccines = Vaccine.collection.find({}).fetch();
  const checkins = Check.collection.find({}).fetch();

  return {
    vaccines,
    checkins,
  };
})(Home);
