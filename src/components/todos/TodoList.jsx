import { shallowEqual, useSelector } from "react-redux";
import TodoListItem from "./TodoListItem";

function findCommonIds(arr1, arr2) {
  return arr1.filter((element) => arr2.includes(element));
}

const selectTodoIds = (state) => state.todos.map((todo) => todo.id);

const selectColorFilteredTodoIds = (state) => {
  const uncapitalizedFilterColors = state.filters.colors.map((color) =>
    color.toLowerCase()
  );
  if (!uncapitalizedFilterColors.length) {
    return [];
  }
  const colorFilteredTodos = state.todos.filter((todo) => {
    const hasColor = todo.color
      ? uncapitalizedFilterColors.includes(todo.color.toLowerCase())
      : false;
    return hasColor;
  });

  return !colorFilteredTodos.length
    ? []
    : colorFilteredTodos.map((todo) => todo.id);
};

const selectStatusFilteredTodoIds = (state) => {
  const statusFilteredTodos = state.todos.filter((todo) => {
    const value = state.filters.status;
    switch (value) {
      case "all":
        return true;
      case "active":
        return !todo.completed;
      case "completed":
        return !!todo.completed;
      default:
        return false;
    }
  });
  return statusFilteredTodos.map((todo) => todo.id);
};

function TodoList() {
  // All todo Ids without any filter
  const totalTodoIds = useSelector(selectTodoIds, shallowEqual);

  // Get color filtered todo Ids
  const filteredColors = useSelector((state) => state.filters.colors);
  const colorFilteredTodoIds = useSelector(
    selectColorFilteredTodoIds,
    shallowEqual
  );

  const finalColorFilteredTodosIds = filteredColors.length
    ? colorFilteredTodoIds
    : totalTodoIds;

  // Get status filtered todo Ids
  const finalStatusFilteredTodoIds = useSelector(
    selectStatusFilteredTodoIds,
    shallowEqual
  );

  const finalRenderedIds = findCommonIds(
    finalStatusFilteredTodoIds,
    finalColorFilteredTodosIds
  );

  const renderedListItems = finalRenderedIds?.length
    ? finalRenderedIds.map((id) => {
        return <TodoListItem key={id} id={id} />;
      })
    : null;

  return <ul className="todo-list">{renderedListItems}</ul>;
}

export default TodoList;
