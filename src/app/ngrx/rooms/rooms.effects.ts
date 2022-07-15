import {Injectable} from "@angular/core";
import {Store} from "@ngrx/store";
import {AppState} from "../app.state";
import {Actions, createEffect, ofType} from "@ngrx/effects";
import {
  loadRooms,
  loadRoomsFailure,
  loadRoomsSuccess
} from "./rooms.actions";
import {catchError, from, map, of, switchMap} from "rxjs";
import {RoomsService} from "../../services/rooms/rooms.service";

@Injectable()
export class RoomsEffects {
  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private roomsService: RoomsService,
  ) { }

  rooms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadRooms),
      switchMap(() =>
        from(this.roomsService.loadRooms()).pipe(
          map((data) => {
            return loadRoomsSuccess({payload: {rooms: data}})
          }),
          catchError((error) => of(loadRoomsFailure(error)))
        )
      )
    )
  );
}
