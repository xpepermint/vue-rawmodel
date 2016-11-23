[![NPM Version](https://badge.fury.io/js/vue-contextable.svg)](https://badge.fury.io/js/vue-contextable)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/vue-contextable.svg)](https://gemnasium.com/xpepermint/vue-contextable)

# [vue](https://vuejs.org)-[contextable](https://github.com/xpepermint/contextablejs)

> Contextable.js plugin for Vue.js v2. Form validation has never been easier!

This plugin integrates the [contextable.js](https://github.com/xpepermint/contextablejs) framework into your [Vue.js](https://vuejs.org) application.

[Contextable.js](https://github.com/xpepermint/contextablejs) is a simple, unopinionated and minimalist framework for creating context objects with support for unopinionated ORM, object schemas, type casting, validation and error handling. It has a reach API which significantly simplifies server-side and client-side data validation and manipulation. Because it's an unopinionated framework it flawlessly integrates with popular modules like [vuex](http://vuex.vuejs.org/en/index.html), [apollo-client](http://dev.apollodata.com) and other related libraries.

[Contextable.js](https://github.com/xpepermint/contextablejs) together with [Vue.js](https://vuejs.org) represents a web framework on steroids. Thanks to its powerful context-aware and flexible model objects, a form validation has never been easier. This plugin brings even more elegant way to do form validation using `contextable.js` and still leaves you freedom to customize and fine-tune the integration.

Make sure you check [contextable.js API](https://github.com/xpepermint/contextablejs) page for details about the framework.

This is a light weight open source package for [Vue.js](https://vuejs.org). The source code is available on [GitHub](https://github.com/xpepermint/vue-contextable) where you can also find our [issue tracker](https://github.com/xpepermint/vue-contextable/issues).

<img src="giphy.gif" width="300" />

## Related Projects

* [Contextable.js](https://github.com/xpepermint/contextablejs): Simple, unopinionated and minimalist framework for creating context objects with support for unopinionated ORM, object schemas, type casting, validation and error handling and more.

## Installation

Run the command below to install the package.

```
$ npm install --save vue-contextable contextable
```

When used with a module system, you must explicitly install `vue-contextable` via `Vue.use()`.

```js
import Vue from 'vue';
import VueContextable from 'vue-contextable';

Vue.use(VueContextable, {
  reactive: true, // [optional] when `true`, models are watched and validated when a model field is changed
  immediate: false, // [optional] when `true`, all reactively defined models are validated immediately after the component is created,
  debounceTime: 300 // [optional] the number of milliseconds to wait before running model validations
});
```

## Getting Started

Initialize the application context and define a user model.

```js
import {Context, Schema} from 'contextable';

const context = new Context(); // context initialization

context.defineModel('User', new Schema({ // defining a model
  fields: {
    name: {
      type: 'String',
      validate: [ // field validations
        { // validator recipe
          validator: 'presence', // validator name
          message: 'is required' // validator error message
        }
      ]
    }
  },
  instanceMethods: {
    async $save () { // create new user on the remote server
      try {
        await this.$validate(); // reactively validate
        await fetch('/users', {method: 'POST'}) // send request to the remote server
          .then((r) => r.json()) // read JSON server response
          .then((r) => this.$applyErrors(r.errors)); // load and displays possible server errors
        return this.isValid(); // return true if a user has been created
      }
      catch (e) {
        return false; // user has not been created
      }
    }
  }
}));
```

Attach the context to your Vue.js application.

```js
const app = new Vue({
  context, // injecting context into child components
  ...
});
```

By passing the context instance to the root `Vue` instance as the `context` option, the `$context` property is injected into every child component.

## Form Example

Object validation has been one of the incentives for creating the [contextable.js](https://github.com/xpepermint/contextablejs) framework. This plugin brings even more elegant way to do form validation using `contextable.js`.

```html
<template>
  <form novalidate v-on:submit.prevent="submit">
    <!-- input field -->
    <input type="text" v-model="user.name" placeholder="User name"/>
    <span v-if="user.$name.hasErrors()">
      {{ user.$name.errors | firstMessage }}
    </span>
    <!-- buttons -->
    <button v-bind:disabled="user.hasErrors()">Add User</button>
  </form>
</template>

<script>
export default {
  contextable: { // contextable namespace
    validate: [ // recipies for defining reactive models
      { // reactive model definition
        dataKey: 'user', // [required] variable name (the name which you would use within the data() block)
        modelName: 'User', // [required] model class name that exists on the application context (defined earlier)
        modelData: {}, // [optional] initial data for populating the model (can also be a function)
        reactive: true, // [optional] when `true`, models are watched and validated when a model field is changed
        immediate: false, // [optional] when true, the model is validated immediately when the component is created
        debounceTime: 300 // [optional] the number of milliseconds to wait before running model validations
      }
    ]
  },
  methods: {
    submit () {
      return this.user.$save();
    }
  },
  beforeCreate () {
    // Use the `$populate()` method (e.g. `this.user.$populate({name: 'John'})`) to populate the
    // model (`this.user`) when displaying an edit form. It's a good practice to move this logic
    // into a custom instance or class method within your schema file (as we did for the `submit`
    // method - we created a custom method `$save`).
  }
}
</script>
```

Reactive model is an extended instance of a Model class, provided by the `contextable.js`, on which `Vue.js` can track changes and re-render when a model field changes. You can access reactive model instances by using the `this.{dataKey}` syntax (you are actually accessing the `data`).

You can manually validate the model by calling the `this.{dataKey}.$validate()` method which is asynchronous and returns a `Promise`. This is useful when the `reactive` options is set to `false`.

## Integration

It's natural for [contextable.js](https://github.com/xpepermint/contextablejs) to be flexible and easily integratable with other technologies. Everything that's added to the context instance is automagically available in every model as `this.$context.{my-variable}` by default. [Vuex](http://vuex.vuejs.org/en/index.html), [apollo-client](http://dev.apollodata.com/) and similar technologies represent a common scenario for such integration.

```js
import $store from './store'; // imagine that you've already define the vuex store
import apollo from './apollo'; // imagine that you've already define the vuex store

let context = new Context({$store, apollo});
...
let user = new context.User();
user.$context.$store; // => vuex store instance
user.$context.apollo; // => apollo client instance
```

## API

This plugin adds some useful features to [contextable.js](https://github.com/xpepermint/contextablejs), which help us write even less code.

### Component

By passing the context instance to the root `Vue` instance as the `context` option, the `$context` property is injected into every child component. The plugin also defines the `contextable` namespace, which can be used for reactive validating of a model.

```html
<script>
export default {
  contextable: { // contextable namespace
    validate: [ // recipies for defining reactive models
      { // reactive model definition
        dataKey: 'user', // [required] variable name (the name which you would use within the data() block)
        modelName: 'User', // [required] model class name that exists on the application context (defined earlier)
        modelData: {}, // [optional] initial data for populating the model (can also be a function)
        reactive: true, // [optional] when `true`, models are watched and validated when a model field is changed
        immediate: false, // [optional] when true, the model is validated immediately when the component is created
        debounceTime: 300 // [optional] the number of milliseconds to wait before running model validations
      }
    ]
  },
  methods: {
    getContext () {
      return this.$context; // accessing context instance
    }
  },
  beforeCreate () {
    // Use the `$populate()` method (e.g. `this.user.$populate({name: 'John'})`) to populate the
    // model (`this.user`) when displaying an edit form. It's a good practice to move this logic
    // into a custom instance or class method within your schema file (as we did for the `submit`
    // method - we created a custom method `$save`).
  }
}
</script>
```

### Model

When a new model is created through the `contextable` API within a component, some useful reactive methods and variables are applied. Note that reactive methods automatically runs the `$forceUpdate()` command which re-renders the component.

**Model.prototype.$applyErrors(errors)**: Model

> A reactive duplicate of the `applyErrors()` method which deeply populates fields with the provided `errors` (useful for loading validation errors received from the server).

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| errors | Array | No | [] | An array of errors.

**Model.prototype.$build()**: Model

> Rebuilds model's reactivity system.

```js
export default {
  contextable: {
    validate: [
      {
        dataKey: 'user',
        modelName: 'User'
      }
    ]
  },
  beforeCreate () {
    this.user.book = {title: 'foo'}; // sets model's field data but the reactivity listeners are removed
    this.user.books = [{title: 'bar'}]; // sets model's field data but the reactivity listeners are removed
    this.user.$build(); // rebuilds the reactivity system
  }
}
```

**Model.prototype.$populate(data)**: Model

> Reactive alternative of the `populate()` method which applies data to a model.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| data | Object | Yes | - | Data object.

```js
export default {
  contextable: {
    validate: [
      {
        dataKey: 'user',
        modelName: 'User'
      }
    ]
  },
  beforeCreate () {
    this.user.$populate({ // sets fields and rebuilds
      name: null,
      book: {},
      books: [{}]
    });
  }
}
```

**Model.prototype.$validate({quiet})**: Promise(Model)

> Reactive alternative of the `validate()` method which validates the model fields and throws a validation error if not all fields are valid unless the `quiet` is set to true.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| quiet | Boolean | No | false | When set to `true`, a validation error is thrown.

## Example

An example application is available in the `./example` folder. You can run the `npm run example` command to start the server.

## Tutorials

See [vue-js-cheatsheet](https://www.gitbook.com/book/xpepermint/vue-js-cheatsheet/) for more.

## License (MIT)

```
Copyright (c) 2016 Kristijan Sedlak <xpepermint@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```
