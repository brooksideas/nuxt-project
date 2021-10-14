<template>
  <section class="main-content">
    <div class="container" v-if="fetchedUsers">
      <h1 class="title has-text-centered">Users</h1>
      <div class="columns is-multiline">
        <div class="column is-half" v-for="user in fetchedUsers" :key="user.id">
          <div class="card">
            <header class="card-header">
              <p class="card-header-title">{{ user.name }}</p>
            </header>
            <div class="card-content">
              <div class="content">
                {{ user.email }}
                <br />
                <small>
                  by
                  <strong>{{ user.username}}</strong>
                  user Website : {{ user.website }}
                </small>
              </div>
            </div>
            <footer class="card-footer">
              <nuxt-link :to="`/user/${user.id}`" class="card-footer-item">View Profile</nuxt-link>
            </footer>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No Users found !</p>
    </div>
  </section>
</template>

<script>
import axios from "axios";
import { mapMutations } from "vuex";

export default {
  name: "users",
  data() {
    return {
      users: [],
      fetchedUsers: []
    };
  },
  mounted() {
    if (typeof window !== "undefined") {
      this.allUsers = localStorage.getItem("Users");
      this.users = JSON.parse(this.allUsers);
      if (this.users) {
        this.fetchedUsers = this.users.userStore.allUsers;
      } else {
        this.getAllUsers(); // called only when we have nothing fetched from the Server ...Cached data = null
      }
    }
  },
  methods: {
    ...mapMutations(["userStore/add"]),
    async getAllUsers() {
      const data = await axios.get("http://jsonplaceholder.typicode.com/users");
      this.$store.commit("userStore/add", data);
    }
  }
};
</script>
