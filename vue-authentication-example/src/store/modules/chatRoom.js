import apiCall from "utils/api";
import {
  LIST_ROOM_REQUEST,
  LIST_ROOM
} from "../actions/chatRoom";

const state = {
  listRoom: [],
  status: ""
};

const actions = {
  [LIST_ROOM_REQUEST]: ({
    commit
  }) => {
    apiCall()
      .get("/chat")
      .then(resp => {
        commit(LIST_ROOM, resp.data);
      });
  }
};

const mutations = {
  [LIST_ROOM]: (state, resp) => {
    state.status = "success";
    state.listRoom = resp;
  }
};

export default {
  state,
  actions,
  mutations
};
