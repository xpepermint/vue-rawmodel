<template>
  <form novalidate>
    <h1>User Form</h1>
    <!-- input field -->
    <input type="text" v-model="user.name" placeholder="User name"/>
    <span v-if="user.$name.hasErrors()">
      {{ user.$name.errors | firstMessage }}
    </span>
    <br/>
    <!-- input field -->
    <input type="text" v-model="user.email" placeholder="User email"/>
    <span v-if="user.$email.hasErrors()">
      {{ user.$email.errors | firstMessage }}
    </span>
    <br/>
    <!-- buttons -->
    <button v-bind:disabled="user.hasErrors()">Add User</button>
  </form>
</template>

<script>
export default {
  contextable: {
    validate: [
      {
        dataKey: 'user',
        modelName: 'User',
        reactive: false,
        immediate: false,
        debounce: 0
      }
    ]
  }
}
</script>
