<template>
  <div>
    <section class="hero is-medium is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Welcome Brook Tarekegn to the JavaScript SSR Blog.
          </h1>
          <h2 class="subtitle">
            Hope you find something you like. 
          </h2>
        </div>
      </div>
    </section>
    <div>
      <div class="red" cols="4">
    <users />
      </div>
      <div cols="8">
    <posts />
      </div>
    </div>
  </div>
</template>

<script>
  import Posts from '~/components/Posts.vue'
  import Users from "~/components/Users.vue";
  export default {
    components: {
      Posts,
      Users
    },
    head: {
      title: 'Home'
    }
  }
</script>
