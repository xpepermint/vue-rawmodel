import {Schema} from 'contextable';
import bookSchema from './book';

export default new Schema({ // model schema
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
    book: {
      type: bookSchema,
      // defaultValue: {}
    },
    books: {
      type: [bookSchema],
      // defaultValue: [{}]
    }
  }
});
