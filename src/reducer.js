import { combineReducers } from "redux";
import todoReducer from "./components/todos/todosSlice";
import filtersReducer from "./components/filter/filtersSlice";

const rootReducer = combineReducers({
  // Define a top-level state field named `todos`, handled by `todosReducer`
  todos: todoReducer,
  filters: filtersReducer,
});

export default rootReducer;
