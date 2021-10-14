<template>
  <div class="main-content">
    <div class="container" v-if="currentUser">
      <h2 class="title is-2">{{ currentUser.name }}</h2>
      <div v-html="currentUser.email"></div>
      <br />
      <h4 class="title is-5 is-marginless">
        <strong>Full Profile</strong>
        <br />
        <strong>username :{{ currentUser.username }}</strong>
        <br />
        <strong>email :{{ currentUser.email }}</strong>
        <br />
        <strong>phone :{{ currentUser.phone }}</strong>
        <br />
        <strong>{{ currentUser.website }}</strong>
      </h4>
      <hr />
      <h3 class="title is-5 is-margin pa-2">
        <strong>Company</strong>
        <br />
        <strong>Type :{{ currentUser.company.bs }}</strong>
        <br />
        <strong>
          <i>CatchPhrase :{{ currentUser.company.catchPhrase }}</i>
        </strong>
        <br />
        <strong>
          <u>Name :{{ currentUser.company.name }}</u>
        </strong>
      </h3>
      <hr />
      <h3 class="title is-5 is-margin pa-2">
        <strong>Address</strong>
        <br />
        <strong>City :{{ currentUser.address.city }}</strong>
        <br />
        <strong>Street :{{ currentUser.address.street }}</strong>
        <br />
        <strong>
          Location : Latitude {{ currentUser.address.geo.lat }}
          Longitude {{ currentUser.address.geo.lng }}
        </strong>
      </h3>
    </div>
    <div v-else>Loading ...</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: null,
      fetchedUsers: null,
      currentUser: null
    };
  },
  mounted() {
    this.allUsers = localStorage.getItem("Users");
    this.users = JSON.parse(this.allUsers);
    this.fetchedUsers = this.users.userStore.allUsers;

    if (this.fetchedUsers.length > 0) {
      const userId = this.$store.app.context.params.id;

      /// Filter the Specific user Data
      this.fetchedUsers.map(element => {
        if (element.id == userId) {
          // use == instead of === since number==string comparision
          this.currentUser = element;
        }
      });
    } else {
      this.noUserFound(); // display error ...if Cached data = null
    }
  },
  methods: {
    noUserFound() {
      alert("No user Details found!");
    }
  },
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  async asyncData({ params, error, payload }) {
    if (payload) {
      return { user: payload };
    } else return { user: { name: "error" } };
  },
  head() {
    return {
      name: this.user.name,
      meta: [
        {
          hid: "customer",
          name: "customer",
          content: this.user.email
        }
      ]
    };
  }
};
</script>
