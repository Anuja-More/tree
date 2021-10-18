// import {ADD_GROUP ,REMOVE_GROUP} from "./constants/action-types";
export const ADD_GROUP = "ADD_GROUP";
export const REMOVE_GROUP = "REMOVE_GROUP";
export const EDIT_GROUP = "EDIT_GROUP";

export function addGroup(payload) {
  console.log(payload);
  return {
    type: ADD_GROUP,
    payload
  };
}

export function removeGroup(payload) {
  console.log(payload);
  return {
    type: REMOVE_GROUP,
    payload
  };
}
