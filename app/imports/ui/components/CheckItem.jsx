import React from 'react';
import { Table } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class CheckItem extends React.Component {
  render() {
    return (
      <Table.Row>
        <Table.Cell>{this.props.check.date}</Table.Cell>
        <Table.Cell>{this.props.check.condition}</Table.Cell>
        <Table.Cell>
          <Link to={`/edit/${this.props.check._id}`}>Edit</Link>
        </Table.Cell>
      </Table.Row>
    );
  }
}

// Require a document to be passed to this component.
CheckItem.propTypes = {
  check: PropTypes.shape({
    date: PropTypes.string,
    condition: PropTypes.string,
    _id: PropTypes.string,
  }).isRequired,
};

// Wrap this component in withRouter since we use the <Link> React Router element.
export default withRouter(CheckItem);
