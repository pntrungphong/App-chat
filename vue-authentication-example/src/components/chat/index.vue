<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="card-title">
        <h3>Chat Group</h3>
        <hr />
      </div>
      <div class="card-body">
        <div class="messages" v-for="(msg, index) in messages" :key="index">
          <p
            v-bind:class="[
              msg.user._id === user._id ? 'ownMessage' : 'otherMessage'
            ]"
          >
            <span class="font-weight-bold">{{ msg.user.name }}: </span>
            >{{ msg.message }}
          </p>
        </div>
      </div>
    </div>
    <div class="card-footer">
      <form @submit.prevent="sendMessage">
        <div class="gorm-group">
          <label for="user">{{ user._id }}</label>
        </div>
        <div class="gorm-group pb-3">
          <label for="message">Message:</label>
          <input type="text" v-model="message" class="form-control" />
        </div>
        <button type="submit" class="btn btn-success">Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import io from "socket.io-client";
import { mapState } from "vuex";

export default {
  name: "chat",
  data() {
    return {
      message: "",
      chatroomId: this.$route.params.id,
      messages: [],
      socket: io.connect(
        "localhost:3000",
        {
          query: { token: localStorage.getItem("user-token") }
        },
        { forceNew: true }
      )
    };
  },
  methods: {
    sendMessage(e) {
      e.preventDefault();
      this.socket.emit("SEND_MESSAGE", {
        user: this.user,
        message: this.message,
        chatroomId: this.$route.params.id
      });
      this.message = "";
    }
  },
  mounted() {
    this.socket.on("MESSAGE", data => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
    });
    this.socket.emit("joinRoom", this.chatroomId);
  },
  computed: {
    ...mapState({
      user: state => state.user.profile
    })
  },
  beforeDestroy() {
    this.socket.emit("disconnected", this.chatroomId);
  }
};
</script>

<style lang="scss" scoped>
.otherMessage {
  color: #0099cc;
  font-weight: bold;
}

.ownMessage {
  color: #00cc00;
  font-weight: bold;
}
</style>
