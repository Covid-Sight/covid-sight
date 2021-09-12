import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/**
 * The CheckCollection. It encapsulates state and variable values for stuff.
 */
class CheckCollection {
  constructor() {
    // The name of this collection.
    this.name = 'CheckCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      date: String,
      condition: {
        type: String,
        allowedValues: ['Healthy', 'Sick'],
        defaultValue: '',
      },
      owner: String,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

/**
 * The singleton instance of the CheckCollection.
 * @type {CheckCollection}
 */
export const Check = new CheckCollection();
