/** * Created by vouill on 11/13/17. */

<template>
  <div class="navigation">
    <div v-if="room !== ''">
      <h1>{{ room }}</h1>
    </div>
    <div v-else>
      <ul v-for="list in listRoom" :key="list._id">
        <li @click="joinRoom(list)">
          {{ list.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
a {
  color: white;
  text-decoration: none;
}
.navigation {
  display: flex;
  color: white;
  align-items: center;
  background-color: #ffa035;
  padding: 5px;

  ul {
    display: flex;
    &:first-child {
      flex-grow: 1;
    }
    li {
      padding-right: 1em;
    }
  }
}
.brand {
  display: flex;
  align-items: center;
}
.logout {
  &:hover {
    cursor: pointer;
  }
}
</style>

<script>
import { mapState } from "vuex";
import io from "socket.io-client";
export default {
  name: "chatRoom",
  data() {
    return {
      room: "",
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
    joinRoom: function(list) {
      this.$router.push(`/chatRoom/${list._id}`).catch(() => {});
    }
  },
  computed: {
    ...mapState({
      listRoom: state => state.chatRoom.listRoom
    })
  }
};
</script>
