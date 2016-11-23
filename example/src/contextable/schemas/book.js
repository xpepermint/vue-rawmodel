import {Schema} from 'contextable';
import bookSchema from './book';

export default new Schema({
  fields: {
    title: {
      type: 'String',
      validate: [
        {
          validator: 'presence',
          message: 'is required'
        }
      ]
    }
  }
});
