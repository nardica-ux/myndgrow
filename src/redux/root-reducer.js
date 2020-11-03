import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import entryReducer from "./entry-reducer";
import userReducer from "./user/user-reducer";
import categoryReducer from "./categories/category-reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user", "entries", "categories"],
};

const rootReducer = combineReducers({
  entries: entryReducer,
  user: userReducer,
  categories: categoryReducer,
});
export default persistReducer(persistConfig, rootReducer);
