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
  debounce: 300 // [optional] the number of milliseconds to wait before running model validations
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
      type: 'String'
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

## Validation

Object validation has been one of the incentives for creating the [contextable.js](https://github.com/xpepermint/contextablejs) framework. This plugin brings even more elegant way to do form validation using `contextable.js`.

```html
<template>
  <form novalidate>
    <!-- input field -->
    <input type="text" v-model="user.name" placeholder="User name"/>
    <span v-if="user.$name.hasErrors()">
      {{ user.$name.errors | firstErrorMessage }}
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
        reactive: true, // [optional] when `true`, models are watched and validated when a model field is changed
        immediate: false, // [optional] when true, the model is validated immediately when the component is created
        debounce: 300 // [optional] the number of milliseconds to wait before running model validations
      }
    ]
  }
}
</script>
```

Reactive model is an instance of a Model class, provided by the `contextable.js`, on which `Vue.js` can track changes and re-render when a model field changes. You can access reactive model instances by using the `this.{dataKey}` syntax (you are actually accessing the `data`).

You can manually validate the model by calling the `this.{dataKey}.$validate()` method which is asynchronous and returns a `Promise`. This is useful when the `reactive` options is set to `false`.

## Example

An example application is available in the `./example` folder.

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
