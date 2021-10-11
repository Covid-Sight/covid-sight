import React from 'react';
import {
  List,
  ListContent,
  Header,
  Segment,
  GridColumn,
  Grid,
  Button,
  Image,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Vaccine } from '../../api/stuff/Vaccine';

/** Renders a Vaccination object in the form of a Grid, Segment, and List. See pages/VaccinePage.jsx. */
class Vaccination extends React.Component {
  removeVaccine(docID) {
    Vaccine.collection.remove(docID);
  }

  render() {
    const container = {
      borderRadius: '25px',
      marginLeft: '50px',
      marginRight: '50px',
      fontSize: '14px',
      paddingLeft: '20px',
    };
    const button = {
      borderRadius: '25px',
      marginLeft: '50px',
      marginRight: '50px',
      fontSize: '14px',
      paddingLeft: '30px',
      paddingRight: '30px',
    };
    const image = {
      borderRadius: '15px',
      width: 575,
    };
    return (
      <div>
        <Segment style={ container }>
          <Grid columns='equal' divided>
            <GridColumn>
              <Header as='h3' textAlign='center'>Vaccination Card Information</Header>
              <List centered size='large'>
                <List.Item>
                  <List.Content><Header as='h4'>Name: </Header>{this.props.vaccine.name}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><Header as='h4'>Patient ID:</Header> {this.props.vaccine.patientID}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><Header as='h4'>Vaccine Type:</Header> {this.props.vaccine.vaccineType}</List.Content>
                </List.Item>
                <List.Content><Header as='h4'>1st Dose Date:</Header> {this.props.vaccine.dose1.toLocaleDateString('en-US')}</List.Content>
                <List.Item>
                  <ListContent><Header as='h4'>1st Dose Clinic:</Header> {this.props.vaccine.clinic1}</ListContent>
                </List.Item>
                <List.Item>
                  <List.Content><Header as='h4'>2nd Dose Date:</Header> {this.props.vaccine.dose2.toLocaleDateString('en-US')}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><Header as='h4'>2nd Dose Clinic:</Header> {this.props.vaccine.clinic2}</List.Content>
                </List.Item>
              </List>
            </GridColumn>
            <GridColumn>
              <Image src={this.props.vaccine.image} rounded fluid style={image}/>
            </GridColumn>
          </Grid>
        </Segment>
        <a>
          <Button className="gold-button" style={button} icon onClick={() => this.removeVaccine(this.props.vaccine._id)} size='large' inverted>
            Delete Vaccine
          </Button>
        </a>
      </div>
    );
  }
}

// Require a document to be passed to this component.
Vaccination.propTypes = {
  vaccine: PropTypes.object.isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(Vaccination);
