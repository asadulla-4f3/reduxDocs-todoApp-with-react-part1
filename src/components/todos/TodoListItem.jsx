/* eslint-disable react/prop-types */
// import { ReactComponent as TimesSolid } from "./times-solid.svg";
import TimesSolid from "./times-solid.svg?react";
import { availableColors, capitalize } from "../filter/colors";
import { useDispatch, useSelector } from "react-redux";

const selectedTodoById = (state, id) => {
  return state.todos.find((todo) => todo.id === id);
};

function TodoListItem({ id }) {
  const todo = useSelector((state) => selectedTodoById(state, id));
  const { text, completed, color } = todo;

  const dispatch = useDispatch();

  const handleCompletedChanged = () => {
    dispatch({ type: "todos/todoToggled", payload: todo.id });
  };

  const handleColorChanged = (e) => {
    dispatch({
      type: "todos/colorSelected",
      payload: { todoId: todo.id, color: e.target.value },
    });
  };

  const onDelete = () => {
    dispatch({ type: "todos/todoDeleted", payload: todo.id });
  };

  const colorOptions = availableColors.map((c) => {
    return (
      <option key={c} value={c}>
        {capitalize(c)}
      </option>
    );
  });

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            checked={completed}
            onChange={handleCompletedChanged}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            value={color}
            style={{ color }}
            onChange={handleColorChanged}
          >
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={onDelete}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
}

export default TodoListItem;
