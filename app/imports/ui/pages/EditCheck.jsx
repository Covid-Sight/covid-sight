import React from 'react';
import { Grid, Loader, Header, List, Container, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { AutoForm, ErrorsField, HiddenField } from 'uniforms-semantic';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { Check } from '../../api/stuff/Check';
import SideBar from '../components/SideBar';

const bridge = new SimpleSchema2Bridge(Check.schema);

/** Renders the Page for editing a single document. */
class EditCheck extends React.Component {

  // On successful submit, insert the data.
  submit(data) {
    const { date, condition, _id } = data;
    Check.collection.update(_id, { $set: { date, condition } }, (error) => (error ?
      swal('Error', error.message, 'error') :
      swal('Success', 'Item updated successfully', 'success')));
  }

  // If the subscription(s) have been received, render the page, otherwise show a loading icon.
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  renderPage() {
    const spacing = { paddingTop: '50px' };
    return (
      <Container>
        <Header as="h1" textAlign="center" className="heading" id="heading" style={spacing}>Editing for
            Check-in: {this.props.doc.date}</Header>
        <Grid stackable>
          <Grid.Column width={2}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={12}>
            <List bulleted>
              <List.Item>Have you tested positive for COVID-19 and are on home isolation?</List.Item>
              <List.Item>Check for symptoms of illness: If you have any symptoms of illness, do not come to campus
                  or workplace. Do you currently have any of the following symptoms that are new, worsening and not
                  attributable
                  to a pre-existing condition?
              <List.List>
                <List.Item>Fever greater than 100.4 °F or feeling feverish (chills, sweating)</List.Item>
                <List.Item>Cough</List.Item>
                <List.Item>Shortness of breath/difficulty breathing</List.Item>
                <List.Item>Sore throat</List.Item>
                <List.Item>Unexplained muscle/body aches</List.Item>
                <List.Item>Nausea/vomiting or diarrhea</List.Item>
                <List.Item>Loss of senses of taste or smell</List.Item>
                <List.Item>Runny or congested nose</List.Item>
                <List.Item>Headache</List.Item>
                <List.Item>Skin rash</List.Item>
                <List.Item>Chest pain or pressure</List.Item>
              </List.List>
              </List.Item>
              <List.Item>
                  Check for Recent COVID-19 Exposure:
                <List.List>
                  <List.Item>
                      Have you traveled out of the state and are currently under quarantine orders by the Department of
                      Health
                      or your medical care provider?
                  </List.Item>
                  <List.Item>
                      Are you unvaccinated and have been in close contact ( 6 feet for ≥ 15 minutes, cumulatively, over
                      a
                      24-hour period) with anyone who has an active, diagnosed case of COVID-19? Note: Healthcare
                      students/personnel wearing appropriate PPE at ALL TIMES while caring for a patient with COVID-19
                      would
                      NOT be considered a close contact (ref. DOH medical advisory #16)
                  </List.Item>
                  <List.Item>Has the Department of Health told you that you have been in contact with a person with
                      COVID-19
                      AND you are UNvaccinated?</List.Item>
                </List.List>
              </List.Item>
            </List>
            <Grid columns={2}>
              <Grid.Column>
                <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
                  <HiddenField name={'condition'} value={'Healthy'}/>
                  <Button value={'Submit'} size={'massive'} floated={'right'}>Yes</Button>
                  <ErrorsField/>
                </AutoForm>
              </Grid.Column>
              <Grid.Column>
                <AutoForm schema={bridge} onSubmit={data => this.submit(data)} model={this.props.doc}>
                  <HiddenField name={'condition'} value={'Sick'}/>
                  <Button name={'condition'} value={'Submit'} size={'massive'}>No</Button>
                  <ErrorsField/>
                </AutoForm>
              </Grid.Column>
            </Grid>

          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

// Require the presence of a Stuff document in the props object. Uniforms adds 'model' to the props, which we use.
EditCheck.propTypes = {
  doc: PropTypes.object,
  model: PropTypes.object,
  ready: PropTypes.bool.isRequired,
};

// withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker
export default withTracker(({ match }) => {
  // Get the documentID from the URL field. See imports/ui/layouts/App.jsx for the route containing :_id.
  const documentId = match.params._id;
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe(Check.userPublicationName);
  // Determine if the subscription is ready
  const ready = subscription.ready();
  // Get the document
  const doc = Check.collection.findOne(documentId);
  return {
    doc,
    ready,
  };
})(EditCheck);
