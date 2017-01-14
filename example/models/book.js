import {ReactiveModel} from '../../';

export class Book extends ReactiveModel {

  constructor (data = {}) {
    super(data);

    this.defineField('title', {
      type: 'String',
      validate: [
        {
          validator: 'presence',
          message: 'is required'
        }
      ]
    });

    this.populate(data);
  }

}
