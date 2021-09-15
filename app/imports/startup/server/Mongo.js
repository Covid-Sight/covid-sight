import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Check } from '../../api/stuff/Check';

/* eslint-disable no-console */

// Initialize the database with a default data document.
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

// Initialize the StuffsCollection if empty.
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

function addCheck(data) {
  console.log(`  Adding: ${data.date} (${data.condition})`);
  Check.collection.insert(data);
}

// Initialize the CheckCollection if empty.
if (Check.collection.find().count() === 0) {
  if (Meteor.settings.checkIn) {
    console.log('Creating default Check in.');
    Meteor.settings.checkIn.map(data => addCheck(data));
  }
}
