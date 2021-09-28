import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, DateField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import SimpleSchema from 'simpl-schema';
import { Vaccine } from '../../api/stuff/Vaccine.js';
import SideBar from '../components/SideBar';
import NavBar from '../components/NavBar';

// Create a schema to specify the structure of the data to appear in the form.
const formSchema = new SimpleSchema({
  name: String,
  patientID: { type: String, optional: true },
  vaccineType: {
    type: String,
    allowedValues: ['Moderna', 'Pfizer', 'J&J', 'Other'],
    defaultValue: 'Moderna',
  },
  dose1: Date,
  clinic1: String,
  dose2: Date,
  clinic2: String,
});

const bridge = new SimpleSchema2Bridge(formSchema);

/** Renders the Page for adding a document. */
class AddVaccine extends React.Component {

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, patientID, vaccineType, dose1, clinic1, dose2, clinic2 } = data;
    const owner = Meteor.user().username;
    // added owner field in (was giving an ESLint error. WIll need to check with Eric -Glen
    Vaccine.collection.insert({ name, patientID, vaccineType, dose1, clinic1, dose2, clinic2, owner },
      (error) => {
        if (error) {
          swal('Error', error.message, 'error');
        } else {
          swal('Success', 'Vaccine information submitted successfully', 'success');
          console.log(data);
          formRef.reset();
        }
      });
  }

  // Render the form. Use Uniforms: https://github.com/vazco/uniforms
  render() {
    let fRef = null;
    return (
      <div>
        <NavBar/>
        <Grid id="add-vaccination" container centered>
          <Grid.Column width={2}>
            <SideBar/>
          </Grid.Column>
          <Grid.Column width={8}>
            <Header as="h2" textAlign="center">Add Vaccine Information</Header>
            <AutoForm ref={ref => {
              fRef = ref;
            }} schema={bridge} onSubmit={data => this.submit(data, fRef)}>
              <Segment>
                <TextField id="name" name='name'/>
                <TextField id="id" name='patientID'/>
                <SelectField name='vaccineType'/>
                <DateField id="date1" name='dose1'/>
                <TextField id="clinic1" name='clinic1'/>
                <DateField id="date2"name='dose2'/>
                <TextField id="clinic2" name='clinic2'/>
                <SubmitField id="add" value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddVaccine;
