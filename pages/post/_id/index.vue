<template>
  <div class="main-content">
    <div class="container">
      <h2 class="title is-2">{{ post.title }}</h2>
      <div v-html="post.body"></div>
      <br />
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  validate({ params }) {
    return /^\d+$/.test(params.id);
  },
  /* If you want Callback Implementation
   asyncData ({ params }, callback) {
    let post = posts.find(post => post.id === parseInt(params.id))
    if (post) {
      callback(null, { post })
    } else {
      callback({ statusCode: 404, message: 'Post not found' })
    }
   },*/
  async asyncData({ params, error, payload }) {
    const { data } = await axios.get(
      `http://jsonplaceholder.typicode.com/posts/${params.id}`
    );
    if (data) {
      return { post: data };
    } else return { post: "Could Not fetch Post!" };
  },

  head() {
    return {
      title: this.post.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.post.body
        }
      ]
    };
  }
};
</script>
