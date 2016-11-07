<template>
  <form novalidate>
    <h1>User Form</h1>
    <!-- input field -->
    <input type="text" v-model="user.name" placeholder="User name"/>
    <span v-if="user.$name.hasErrors()">
      {{ user.$name.errors | firstErrorMessage }}
    </span>
    <br/>
    <!-- input field -->
    <input type="text" v-model="user.email" placeholder="User email"/>
    <span v-if="user.$email.hasErrors()">
      {{ user.$email.errors | firstErrorMessage }}
    </span>
    <br/>
    <!-- buttons -->
    <button v-bind:disabled="user.hasErrors()">Add User</button>
  </form>
</template>

<script>
export default {
  data () {
    return {
      user: new this.$context.User()
    }
  },
  created () {
    return this.validate();
  },
  watch: {
    user: {
      handler (oldVal, newVla) {
        return this.validate()
      },
      deep: true
    }
  },
  methods: {
    validate () {
      return this.user
        .validate({quiet: true})
        .then(() => this.$forceUpdate());
    }
  }
}
</script>
