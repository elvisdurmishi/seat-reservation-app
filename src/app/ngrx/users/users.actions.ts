import {createAction, props} from "@ngrx/store";
import {User} from "../../model/User";

export const loadUsers = createAction(
  "[Manager Dashboard] Load Users",
);

export const loadUsersSuccess = createAction(
  "[Manager Dashboard] Load Users Success",
  props<{ payload: { users: User[] } }>()
)

export const loadUsersFailure = createAction(
  "[Manager Dashboard] Load Users Failure",
)
