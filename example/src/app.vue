<template>
  <form novalidate>
    <h1>User Form</h1>
    <!-- inputs: user -->
    <div>
      <input type="text" v-model="user.name" placeholder="user.name"/>
      <span v-if="user.$name.hasErrors()">
        {{ user.$name.errors | firstMessage }}
      </span>
    </div>
    <!-- inputs: user.book -->
    <div>
      <input type="text" v-model="user.book.title" placeholder="user.book.title"/>
      <span v-if="user.book.$title.hasErrors()">
        {{ user.book.$title.errors | firstMessage }}
      </span>
    </div>
    <!-- inputs: user.books -->
    <div v-for="book in user.books">
      <input type="text" v-model="book.title" placeholder="user.books.title"/>
      <span v-if="book.$title.hasErrors()">
        {{ book.$title.errors | firstMessage }}
      </span>
    </div>
    <button v-on:click.prevent="newBook">+ New Book</button>
    <!-- model -->
    <pre>{{ user }}</pre>
    <!-- buttons -->
    <button v-bind:disabled="user.hasErrors()">Add User</button>
  </form>
</template>

<script>
import Vue from 'vue';
import context from './contextable'

export default {
  contextable: {
    validate: [
      {
        dataKey: 'user',
        modelName: 'User',
        modelData: () => ({
          name: null,
          book: {},
          books: [{}]
        }),
        reactive: true,
        immediate: true,
        debounceTime: 0
      }
    ]
  },
  beforeCreate () {
    this.user.$populate({
      book: {title: 'foo'} // set only `book` field
    });
  },
  methods: {
    newBook () {
      this.user.books.push({}); // change model structure
      this.user.$build(); // rebuild reactivity
    }
  }
}
</script>
