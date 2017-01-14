[![NPM Version](https://badge.fury.io/js/vue-rawmodel.svg)](https://badge.fury.io/js/vue-rawmodel)&nbsp;[![Dependency Status](https://gemnasium.com/xpepermint/vue-rawmodel.svg)](https://gemnasium.com/xpepermint/vue-rawmodel)

# [vue](https://vuejs.org)-[rawmodel](https://github.com/xpepermint/rawmodeljs)

> RawModel.js plugin for Vue.js v2. Form validation has never been easier!

This plugin integrates [RawModel.js](https://github.com/xpepermint/rawmodeljs) framework into your [Vue.js](https://vuejs.org) application.

[RawModel.js](https://github.com/xpepermint/rawmodeljs) is a simple framework which provides a strongly-typed JavaScript object with support for validation and error handling. It has a rich API which significantly simplifies **server-side** and **client-side** data validation and manipulation. Because it's an unopinionated framework it flawlessly integrates with popular modules like [vuex](http://vuex.vuejs.org/en/index.html), [apollo-client](http://dev.apollodata.com) and other related libraries.

[RawModel.js](https://github.com/xpepermint/rawmodeljs) together with [Vue.js](https://vuejs.org) represents a web framework on steroids. Thanks to its powerful context-aware and flexible model objects, a form validation has never been easier. This plugin brings even more elegant way to do form validation using `RawModel.js` and still leaves you freedom to customize and fine-tune the integration.

Make sure you check [RawModel.js API](https://github.com/xpepermint/rawmodeljs) page for details about the framework.

This is a light weight open source package for [Vue.js](https://vuejs.org) written with TypeScript. It's actively maintained and ready for production environments. The source code is available on [GitHub](https://github.com/xpepermint/vue-rawmodel) where you can also find our [issue tracker](https://github.com/xpepermint/vue-rawmodel/issues).

## Related Projects

* [RawModel.js](https://github.com/xpepermint/rawmodeljs): Strongly-typed JavaScript object with support for validation and error handling.

## Installation

Run the command below to install the package.

```
$ npm install --save vue-rawmodel rawmodel
```

This package uses promises thus you need to use [Promise polyfill](https://github.com/taylorhakes/promise-polyfill) when promises are not supported.

When used with a module system, you must explicitly install `vue-rawmodel` via `Vue.use()`.

```js
import Vue from 'vue';
import VueRawModel from 'vue-rawmodel';

Vue.use(VueRawModel);
```

## Getting Started

This package provides a special class called `ReactiveModel` which extends from `Model` class provided by [RawModel.js](https://github.com/xpepermint/rawmodeljs). You don't need to attach the plugin to Vue. ReactiveModel is completely independent thus you can use it directly. Below is an example of a simple reactive model called `User` with a single field `name`.

```js
import {ReactiveModel} from 'vue-rawmodel';

class User extends ReactiveModel {
  constructor (data = {}) {
    super(data); // initializing parent class

    this.defineField('name', { // defining class property `name`
      type: 'String', // setting type casting
      validate: [ // field validations
        { // validator recipe
          validator: 'presence', // validator name
          message: 'is required' // validator error message
        }
      ]
      // check the API for all available options
    });
  }
}
```

We can optionally pass models to the root `Vue` instance as the `models` option. This will populate the `$models` property which is then injected into every child component.

```js
const app = new Vue({
  models: { User }, // [optional] injecting models into child components (later available as this.$models.User)
  ...
});
```

## Form Example

Object validation has been one of the incentives for creating  [RawModel.js](https://github.com/xpepermint/rawmodeljs) framework. This plugin brings even more elegant way to do form validation.

```html
<template>
  <form novalidate v-on:submit.prevent="submit">
    <!-- input field -->
    <input type="text" v-model="user.name" placeholder="User name"/>
    <span v-if="user.getField('name').hasErrors()">
      {{ user.getField('name').errors | firstMessage }}
    </span>
    <!-- buttons -->
    <button v-bind:disabled="user.hasErrors()">Submit</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      user: new this.$models.User({
        vm: this, // instance of Vue's VM
        dataKey: 'user', // name of data model key
        name: 'John Smith' // initializing the `name` field
      })
    };
  },
  methods: {
    submit () {
      // Send data to the remote server
    }
  }
}
</script>
```

Use the `$populate()` method to reactively apply data to your model.

```js
export default {
  ...
  created () {
    this.user.$populate({
      name: 'John Smith'
    });
  }
}
```

Use Vue watchers to install real-time form validation.

```js
export default {
  ...
  watch: {
    user: {
      handler: (user) => user.$validate({debounce: 300}), // reactively validate fields and display errors
      deep: true, // always required
      immediate: true // set this to validate immediately after the form is created
    }
  }
}
```

Check the [RawModel.js API](https://github.com/xpepermint/rawmodeljs#api) page and this [package API section](#api) for details.

## API

This plugin extends [RawModel.js](https://github.com/xpepermint/rawmodeljs) functionality, which help us write reactive code in Vue. If you don't need reactivity then you can use [RawModel.js](https://github.com/xpepermint/rawmodeljs) directly.

### ReactiveModel

**ReactiveModel({vm, dataKey, parent, ...data})**

> Abstract reactive class which represents a strongly-typed JavaScript object. This class extends from [Model](https://github.com/xpepermint/rawmodeljs#model-class) and adds new reactive capabilities.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| vm | Vue | No | - | Vue VM instance.
| dataKey | String | No | - | The name of the data key.
| parent | Model | No | - | Parent model instance.
| data | Object | No | - | Data for populating model fields.
```

**ReactiveModel.prototype.$applyErrors(errors)**: ReactiveModel

> A reactive alternative of method `applyErrors()` which deeply populates fields with the provided `errors` (useful for loading validation errors received from the server).

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| errors | Array | No | [] | An array of errors.

**ReactiveModel.prototype.$clear()**: ReactiveModel

> Reactive alternative of method `clear()` which sets all fileds to `null`.

**ReactiveModel.prototype.$fake()**: ReactiveModel

> Reactive alternative of method `fake()` which resets fields then sets fields to their fake values.

**ReactiveModel.prototype.$forceUpdate ()**: ReactiveModel

> Force the `vm` instance to re-render.

**ReactiveModel.prototype.$handle (error, {quiet, debounce})**: Promise<ReactiveModel>

> Reactive alternative of method `handle()` which handles the error and throws an error if the error can not be handled.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| error | Any | Yes | - | Error to be handled.
| quiet | Boolean | No | true | When set to false, a handled validation error is thrown. This doesn't affect the unhandled errors (they are always thrown).
| debounce | Boolean | 0 | - | Number of milliseconds to wait before running validations.

**ReactiveModel.prototype.$invalidate ()**: ReactiveModel

> Reactive alternative of method `invalidate()` which removes fields errors.

**ReactiveModel.prototype.isReactive (): Boolean**

> Returns `true` when reactive properties (`vm` and `dataKey`) are set.

**ReactiveModel.prototype.$populate (data)**: ReactiveModel

> Reactive alternative of method `populate()` which applies data to a model.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| data | Object | Yes | - | Data object.

**ReactiveModel.prototype.$rebuild ()**: ReactiveModel

> Rebuilds model's reactivity system.

**ReactiveModel.prototype.$reset ()**: ReactiveModel

> Reactive alternative of method `reset()` which sets each model field to its default value.

**ReactiveModel.prototype.$rollback ()**: ReactiveModel

> Reactive alternative of method `rollback()` which sets each field to its initial value (value before last commit).

**ReactiveModel.prototype.$validate({quiet, debounce})**: Promise(ReactiveModel)

> Reactive alternative of method `validate()` which validates the model fields and throws a validation error if not all fields are valid unless the `quiet` is set to true.

| Option | Type | Required | Default | Description
|--------|------|----------|---------|------------
| quiet | Boolean | No | true | When set to `true`, a validation error is thrown.
| debounce | Boolean | 0 | - | Number of milliseconds to wait before running validations.

### Filters

**firstMessage**

> Extracts the first error message from a list of errors.

## Example

An example is available in the `./example` folder which you can run with the `npm run example` command. There is also [vue-example](https://github.com/xpepermint/vue-example) app available which you should take a look.

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
