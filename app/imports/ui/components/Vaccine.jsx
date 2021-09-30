import React from 'react';
import {
  List,
  ListContent,
  Header,
  Segment,
  GridColumn,
  Grid,
} from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class Vaccination extends React.Component {
  render() {
    const container = {
      borderRadius: '25px',
      margin: '50px',
    };
    return (
      <div>
        <Segment style={ container }>
          <Grid columns='equal' divided>
            <GridColumn>
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
                  <ListContent><Header as='h4'>1st Does Clinic:</Header> {this.props.vaccine.clinic1}</ListContent>
                </List.Item>
                <List.Item>
                  <List.Content><Header as='h4'>2nd Does Date:</Header> {this.props.vaccine.dose2.toLocaleDateString('en-US')}</List.Content>
                </List.Item>
                <List.Item>
                  <List.Content><Header as='h4'>2nd Dose Clinic:</Header> {this.props.vaccine.clinic2}</List.Content>
                </List.Item>
              </List>
            </GridColumn>
            <GridColumn>
              <Header as='h1'>Image goes here</Header>
            </GridColumn>
          </Grid>
        </Segment>
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
