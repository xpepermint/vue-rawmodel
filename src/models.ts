import {Model} from 'rawmodel';
import {createDebouncer} from 'promised-debounce';

/*
* Model recipe interface.
*/

export interface ReactiveModelRecipe {
  parent?: Model;
  vm?: any;
  dataKey?: string;
  [key: string]: any;
}

/*
* Reactive alternative of the Model which provides some new reactive methods.
* Note that reactive methods are prefixed with the `$` sign.
*/

export class ReactiveModel extends Model {
  private _debounce: ({handler, time}) => any;
  readonly vm: any;
  readonly dataKey: string;

  /*
  * Class constructor.
  */

  public constructor (data: ReactiveModelRecipe = {}) {
    super(data);

    Object.defineProperty(this, '_debounce', {
      value: createDebouncer()
    });

    Object.defineProperty(this, 'vm', {
      get: () => data.vm
    });
    Object.defineProperty(this, 'dataKey', {
      get: () => data.dataKey
    });
  }

  /*
  * Returns `true` if reactive properties are set.
  */

  public isReactive (): boolean {
    return !!this.vm && !!this.dataKey;
  }

  /*
  * Recreates reactivity on dataKey.
  */

  public $rebuild (): this {
    if (this.isReactive()) {
      let {vm, dataKey} = this;
      return vm[dataKey] = this.clone({vm, dataKey});
    }
    return this;
  }

  /*
  * Repaints the UI.
  */

  public $forceUpdate (): this {
    if (this.isReactive()) {
      this.vm.$forceUpdate()
    }
    return this;
  }

  /*
  * Reactive alternative of method `populate()` which applies `data` to
  * model fields.
  */

  public $populate (data): this {
    this.populate(data);
    return this.$rebuild();
  }

  /*
  * Reactive alternative of method `applyErrors()` which sets fields errors.
  */

  public $applyErrors (errors: any[] = []): this {
    this.applyErrors(errors);
    this.$forceUpdate();
    return this;
  }

  /*
  * Reactive alternative of method `clear()` which sets all fileds to `null`.
  */

  $clear (): this {
    this.clear();
    this.$forceUpdate();
    return this;
  }

  /*
  * Reactive alternative of method `fake()` which resets fields then sets fields 
  * to their fake values.
  */

  $fake (): this {
    this.fake();
    this.$forceUpdate();
    return this;
  }

  /*
  * Reactive alternative of method `handle()` which handles the error and throws 
  * an error if the error can not be handled.
  */

  async $handle (error: any, {
    debounce = 0, 
    quiet = true
  }: {
    debounce?: number,
    quiet?: boolean
  } = {}): Promise<this> {
    return this._debounce({
      handler: () => {
        this.handle(error, {quiet}).then(() => this.$forceUpdate());
        return this;
      },
      time: debounce
    });
  }

  /*
  * Reactive alternative of method `invalidate()` which removes fields errors.
  */

  $invalidate (): this {
    this.invalidate();
    this.$forceUpdate();
    return this;
  }

  /*
  * Reactive alternative of method `reset()` which sets each model field to 
  * its default value.
  */

  $reset (): this {
    this.reset();
    this.$forceUpdate();
    return this;
  }

  /*
  * Reactive alternative of method `rollback()` which sets each field to its 
  * initial value (value before last commit).
  */

  $rollback (): this {
    this.rollback();
    this.$forceUpdate();
    return this;
  }
  
  /*
  * Reactive alternative of method `validate()` which validates the model
  * fields and throws a validation error if not all fields are valid when the
  * quiet is set to `false`.
  */

  public $validate ({
    debounce = 0, 
    quiet = true
  }: {
    debounce?: number,
    quiet?: boolean
  } = {}): Promise<this> {
    return this._debounce({
      handler: () => {
        this.validate({quiet}).then(() => this.$forceUpdate());
        return this;
      },
      time: debounce
    });
  }

}
