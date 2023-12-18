import { StoreEnhancer, configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/actions/counterSlice"
import isGridReducer from "@features/character/actions/is-grid-slice"

import { characterApi } from "@features/character";


import { setupListeners } from "@reduxjs/toolkit/query";
import reactotron from "@config/reactotron-config"


//added for the null issue in ts reactatron
const enhancers: StoreEnhancer[] = []
if (reactotron.createEnhancer) {
  enhancers.push(reactotron.createEnhancer())
}

export const store = configureStore({
  reducer: {
    [characterApi.reducerPath]: characterApi.reducer,
    isGrid: isGridReducer,
    counter: counterReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(characterApi.middleware),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers),

});


setupListeners(store.dispatch)




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
