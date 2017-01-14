<template>
  <div>
    <h1>RawModel Example</h1>
    <form novalidate v-on:submit.prevent="submit">
      <h1>User Form</h1>
      <!-- inputs: user -->
      <div>
        <input type="text" v-model="user.name" placeholder="user.name"/>
        <span v-if="user.getField('name').hasErrors()">
          {{ user.getField('name').errors | firstMessage }}
        </span>
      </div>
      <!-- inputs: user.book -->
      <div v-if="user.book">
        <input type="text" v-model="user.book.title" placeholder="user.book.title"/>
        <span v-if="user.book.getField('title').hasErrors()">
          {{ user.book.getField('title').errors | firstMessage }}
        </span>
      </div>
      <!-- inputs: user.books -->
      <div v-if="user.books" v-for="book in user.books">
        <input type="text" v-model="book.title" placeholder="user.books.title"/>
        <span v-if="book.getField('title').hasErrors()">
          {{ book.getField('title').errors | firstMessage }}
        </span>
      </div>
      <button v-on:click.prevent="addBookField">+ New Book</button>
      <!-- model -->
      <pre>Model: {{ user }}</pre>
      <pre>Errors: {{ user.collectErrors() }}</pre>
      <!-- buttons -->
      <button @disabled="user.hasErrors()">Submit</button>
    </form>
    <!-- features test -->
    <button @click="clearFields()">Clear Values</button>
    <button @click="setFakeValues()">Set Fake Values</button>
    <button @click="setFakeErrors()">Set Fake Errors</button>
    <button @click="handleFakeError()">Handle Fake Error</button>
    <button @click="removeErrors()">Remove Error</button>
    <button @click="resetValues()">Reset Values</button>
    <button @click="rollbackValues()">Rollback Values</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      user: new this.$models.User({
        vm: this,
        dataKey: 'user',
        name: ''
      })
    };
  },
  created () {
    this.user.$populate({
      name: 'John Smith',
      book: {title: 'a'},
      books: [{title: 'b'}]
    });
  },
  watch: {
    user: {
      handler: (user) => user.$validate({debounce: 300}),
      deep: true,
      immediate: true
    }
  },
  methods: {
    submit () {
      alert('form submitted');
    },
    addBookField () {
      let data = JSON.parse(JSON.stringify(this.user.books));
      data.push({title: Date.now()});
      this.user.books = data;
      return this.user.$rebuild();
    },
    clearFields () {
      return this.user.$clear();
    },
    setFakeValues () {
      return this.user.$fake();
    },
    setFakeErrors () {
      return this.user.$applyErrors([
        {path: ['name'], errors: [{message: 'fake error'}]}
      ]);
    },
    handleFakeError () {
      return this.user.$handle(new Error());
    },
    removeErrors () {
      return this.user.$invalidate();
    },
    resetValues () {
      return this.user.$reset();
    },
    rollbackValues () {
      return this.user.$rollback();
    }
  }
}
</script>
