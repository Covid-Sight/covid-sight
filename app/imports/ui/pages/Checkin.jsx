import React from 'react';
import { Grid, Header, List, Container, Segment, Button } from 'semantic-ui-react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import { AutoForm, ErrorsField, HiddenField, SelectField, SubmitField } from 'uniforms-semantic';
import { Check } from '../../api/stuff/Check';

const formSchema = new SimpleSchema({
  condition: {
    type: String,
    allowedValues: ['Healthy', 'Sick'],
  },
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class Checkin extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const date = new Date();
    const { condition } = data;
    const owner = Meteor.user().username;
    Check.collection.insert({ date, condition, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Status updated', 'success');
          formRef.reset();
        }
      });
  }

  render() {
    let fRef = null;
    return (
      <Container>
        <Header as='h1'>Do any of the following apply to you?</Header>
        <List bulleted>
          <List.Item>Have you tested positive for COVID-19 and are on home isolation?</List.Item>
          <List.Item>Check for symptoms of illness: If you have any symptoms of illness, do not come to campus
              or workplace. Do you currently have any of the following symptoms that are new, worsening and not attributable
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
                  Have you traveled out of the state and are currently under quarantine orders by the Department of Health
                  or your medical care provider?
              </List.Item>
              <List.Item>
                  Are you unvaccinated and have been in close contact ( 6 feet for ≥ 15 minutes, cumulatively, over a
                  24-hour period) with anyone who has an active, diagnosed case of COVID-19?  Note: Healthcare
                  students/personnel wearing appropriate PPE at ALL TIMES while caring for a patient with COVID-19 would
                  NOT be considered a close contact (ref. DOH medical advisory #16)
              </List.Item>
              <List.Item>Has the Department of Health told you that you have been in contact with a person with COVID-19
                  AND you are UNvaccinated?</List.Item>
            </List.List>
          </List.Item>
        </List>
        <Grid columns={2}>
          <Grid.Column>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <HiddenField name={'condition'} value={'Healthy'}/>
              <Button value={'Submit'} size={'massive'} floated={'right'}>Yes</Button>
              <ErrorsField/>
            </AutoForm>
          </Grid.Column>
          <Grid.Column>
            <AutoForm ref={ref => { fRef = ref; }} schema={bridge} onSubmit={data => this.submit(data, fRef)} >
              <HiddenField name={'condition'} value={'Sick'}/>
              <Button name={'condition'} value={'Submit'} size={'massive'}>No</Button>
              <ErrorsField/>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </Container>
    );
  }
}

export default Checkin;
