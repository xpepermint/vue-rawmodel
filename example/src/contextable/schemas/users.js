import {Schema} from 'contextable';

export const userSchema = new Schema({ // model schema
  fields: { // model fields
    name: { // field name
      type: 'String', // field type
      validate: [ // validator recipies
        {
          validator: 'presence', // validator name
          message: 'is required' // validation error message
        }
      ]
    },
    email: {
      type: 'String',
      validate: [
        {
          validator: 'presence',
          message: 'is required'
        },
        {
          validator: 'stringEmail',
          message: 'invalid email'
        }
      ]
    }
  }
});
