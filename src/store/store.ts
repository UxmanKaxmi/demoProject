import { StoreEnhancer, configureStore } from "@reduxjs/toolkit";
import { GetCharacterApi } from "@features/character";
import { setupListeners } from "@reduxjs/toolkit/query";
import reactotron from "@config/reactotron-config"
import selectedFilterReducer from "features/character/actions/selected-filter-slice";
import isGridReducer from "@features/character/actions/is-grid-slice"
import searchReducer from "@features/character/actions/search-text-slice"
import pageCountReducer from "@features/character/actions/page-count-slice"
import genderReducer from "@features/character/actions/gender-slice"
import selectedTabIndexReducer from "@features/location/actions/selected-tab-slice"



//added for the null issue in ts reactatron
const enhancers: StoreEnhancer[] = []
if (reactotron.createEnhancer) {
  enhancers.push(reactotron.createEnhancer())
}

export const store = configureStore({
  reducer: {
    [GetCharacterApi.reducerPath]: GetCharacterApi.reducer,
    isGrid: isGridReducer,
    selectedFilter: selectedFilterReducer,
    search: searchReducer,
    pageCount: pageCountReducer,
    gender: genderReducer,
    selectedTabIndex:selectedTabIndexReducer
    
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware().concat(GetCharacterApi.middleware),
  enhancers: (getDefaultEnhancers) => getDefaultEnhancers().concat(enhancers),

});


setupListeners(store.dispatch)




// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
