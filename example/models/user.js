import {ReactiveModel} from '../../';
import {Book} from './book';

export class User extends ReactiveModel {

  constructor (data = {}) {
    super(data);

    this.defineField('name', { // name property
      type: 'String',
      defaultValue: '',
      fakeValue: 'Faker Smith',
      validate: [
        {
          validator: 'presence',
          message: 'is required'
        }
      ],
      handle: [
        {
          handler: 'block',
          block (e) { return true; },
          message: 'unknown error'
        }
      ]
    });
    this.defineField('book', { // book property
      type: Book
    });
    this.defineField('books', { // books property
      type: [Book]
    });

    this.populate(data);
  }

}
