[![NPM Version](https://badge.fury.io/js/vue-contextable.svg)](https://badge.fury.io/js/vue-contextable)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/vue-contextable.svg)](https://gemnasium.com/xpepermint/vue-contextable)

# [vue](https://vuejs.org)-[contextable](https://github.com/xpepermint/contextablejs)

> Contextable.js plugin for Vue.js v2 (app context, schema-based form validation and more).

This plugin integrates the [contextable.js](https://github.com/xpepermint/contextablejs) framework into your [Vue.js](https://vuejs.org) application. Contextable.js has a reach API which significantly simplifies server-side and client-side data validation and manipulation. Use this package to validate web forms using models, for easy server-side or client-side data management, as a central application context and more. Use it with [vuex](http://vuex.vuejs.org/en/index.html), [apollo-client](http://dev.apollodata.com) or any other related library. Make sure you check the [Contextable.js API](https://github.com/xpepermint/contextablejs) for details.

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

Vue.use(VueContextable);
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

Object validation has been one of the incentives for creating the [Contextable.js](https://github.com/xpepermint/contextablejs) framework. This is why it's so easy to use [Contextable.js](https://github.com/xpepermint/contextablejs) also for validation a web form. This plugin adds some additional configuration options on the `Vue` object to make the code even more clean.

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
  data () {
    return {
      user: new this.$context.User() // initializing a model
    }
  },
  created () {
    return this.validate(); // validate user immediately after the component is created
  },
  watch: {
    user: {
      handler (o, n) {
        return this.validate(); // validate when model changes
      },
      deep: true
    }
  },
  methods: {
    validate (model) { // a helper method
      return this.user.validate({quiet: true}).then(() => this.$forceUpdate());
    }
  }
}
</script>
```

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
