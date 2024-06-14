import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

import CustomizerReducer from "./customizer/CustomizerSlice";
import BlogReducer from "./apps/blog/BlogSlice";

const persistConfig = {
  key: "root",
  storage,
};

export const store = configureStore({
    reducer: {
    //   counter: counterReducer,
       customizer: persistReducer<any>(persistConfig, CustomizerReducer),
    //   ecommerceReducer: EcommerceReducer,
    //   chatReducer: ChatsReducer,
    //   emailReducer: EmailReducer,
    //   notesReducer: NotesReducer,
    //   contactsReducer: ContactsReducer,
    //   ticketReducer: TicketReducer,
    //   userpostsReducer: UserProfileReducer,
       blogReducer: BlogReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false, immutableCheck: false }),
  });
  const rootReducer = combineReducers({
    // counter: counterReducer,
     customizer: CustomizerReducer,
    // ecommerceReducer: EcommerceReducer,
    // chatReducer: ChatsReducer,
    // emailReducer: EmailReducer,
    // notesReducer: NotesReducer,
    // contactsReducer: ContactsReducer,
    // ticketReducer: TicketReducer,
    // userpostsReducer: UserProfileReducer,
     blogReducer: BlogReducer,
  });
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;
