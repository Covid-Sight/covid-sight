import React from 'react';
import { Grid, Segment, Header } from 'semantic-ui-react';
import { AutoForm, ErrorsField, DateField, SelectField, SubmitField, TextField } from 'uniforms-semantic';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import SimpleSchema2Bridge from 'uniforms-bridge-simple-schema-2';
import Axios from 'axios';
import FormData from 'form-data';
// import { v2 as cloudinary } from 'cloudinary';
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
  constructor(props) {
    super(props);
    this.state = {
      imageURL: '',
    };
  }

  // On submit, insert the data.
  submit(data, formRef) {
    const { name, patientID, vaccineType, dose1, clinic1, dose2, clinic2 } = data;
    const owner = Meteor.user().username;
    const image = this.state.imageURL;
    // added owner field in (was giving an ESLint error. WIll need to check with Eric -Glen
    Vaccine.collection.insert({ name, patientID, vaccineType, dose1, clinic1, dose2, clinic2, image, owner },
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

    const uploadImage = (files) => {
      const formData = new FormData();
      formData.append('file', files[0]);
      formData.append('cloud_name', 'glarita');
      formData.append('upload_preset', 'q57x0i8n');
      Axios.post('https://api.cloudinary.com/v1_1/glarita/image/upload', formData).then((response) => {
        console.log(response.data.url);
        this.setState({ imageURL: response.data.url });
      });
    };

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
                <DateField id="date2" name='dose2'/>
                <TextField id="clinic2" name='clinic2'/>
                <input
                  style={{ marginTop: '10px' }}
                  type="file"
                  name="file"
                  placeholder="Upload an Image"
                  onChange={(event) => {
                    uploadImage(event.target.files);
                  }}
                />
                <Header as='h5' style={{ marginTop: '0px', color: 'red' }}>Notice: Image size must be under 10 MB and must be a PNG or JPEG. </Header>
                <SubmitField style={{ marginTop: '0px' }} id="add" value='Submit'/>
                <ErrorsField/>
              </Segment>
            </AutoForm>
          </Grid.Column>
          <Grid.Column>
          </Grid.Column>
        </Grid>
      </div>
    );
  }
}

export default AddVaccine;
