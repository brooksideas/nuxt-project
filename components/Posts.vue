<template>
  <section class="main-content">
    <div class="container">
      <h1 class="title has-text-centered">Recent Posts</h1>
      <div class="columns is-multiline" v-if="fetchedUsers">
        <div class="column is-half" v-for="(post,index) in postUser" :key="index">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">Posted By: {{ post.name }}</p>
            </header>
            <div class="card-content">
              <div class="content">
                Company Name:
                <strong>{{ post.company.name}}</strong>
                <br />
                <small>
                  Phone:
                  <strong>{{ post.phone}}</strong>
                </small>
                <br />
                <small>
                  Website:
                  <strong>{{ post.website }}</strong>
                </small>
              </div>
            </div>
            <footer class="card-footer">
              <nuxt-link :to="`/post/${post.id}`" class="card-footer-item">Read Post</nuxt-link>
            </footer>
          </div>
        </div>
      </div>
      <div v-else-if="userPostMatching()"></div>
      <div v-else>No Recent Posts</div>
    </div>
  </section>
</template>

<script>
import posts from "~/posts.json";

export default {
  name: "posts",
  data() {
    return {
      posts, // useful to do User and Post matching for Simulation
      postUser: [],
      fetchedUsers: null // this are actually the users who Posted,
    };
  },
  mounted() {
    if (typeof window !== "undefined") {
      this.allUsers = localStorage.getItem("Users");
      this.userPostMatching();
    }
  },
  methods: {
    userPostMatching() {
      if (this.allUsers) {
        this.users = JSON.parse(this.allUsers);
      }

      if (this.users) {
        this.fetchedUsers = this.users.userStore.allUsers;
        this.posts.map((element, index) => {
          this.fetchedUsers.forEach(user => {
            if (element.userId === user.id) {
              this.postUser.splice(index, 0, user);
            }
          });
        });
      } else {
        // if (typeof window !== "undefined") {
        //   alert("No Posts were Found! Please Refresh the Page!");
        // }
        // refresh Page to get the Results!
        // called only when we have nothing fetched from the Server ...Cached data = null
      }
    }
  }
};
</script>
