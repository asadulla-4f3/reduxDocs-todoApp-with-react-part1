/* eslint-disable react/prop-types */
import { StatusFilters } from "../filter/filtersSlice";
import { availableColors, capitalize } from "../filter/colors";
import { useDispatch, useSelector } from "react-redux";

const RemainingTodos = ({ count }) => {
  const suffix = count === 1 ? "" : "s";

  return (
    <div className="todo-count">
      <h5>Remaining Todos</h5>
      <strong>{count}</strong> item{suffix} left
    </div>
  );
};

const StatusFilter = ({ value: status, onChange }) => {
  const renderedFilters = Object.keys(StatusFilters).map((key) => {
    const value = StatusFilters[key];
    const handleClick = () => onChange(value);
    const className = value === status ? "selected" : "";

    return (
      <li key={value}>
        <button className={className} onClick={handleClick}>
          {key}
        </button>
      </li>
    );
  });

  return (
    <div className="filters statusFilters">
      <h5>Filter by Status</h5>
      <ul>{renderedFilters}</ul>
    </div>
  );
};

const ColorFilters = ({ value: colors, onChange }) => {
  const renderedColors = availableColors.map((color) => {
    const checked = colors.includes(color);
    const handleChange = () => {
      const changeType = checked ? "removed" : "added";
      onChange(color, changeType);
    };

    return (
      <label key={color}>
        <input
          type="checkbox"
          name={color}
          checked={checked}
          onChange={handleChange}
        />
        <span
          className="color-block"
          style={{
            backgroundColor: color,
          }}
        ></span>
        <span>{capitalize(color)}</span>
      </label>
    );
  });

  return (
    <div className="filters colorFilters">
      <h5>Filter by Color</h5>
      <form className="colorSelection">{renderedColors}</form>
    </div>
  );
};

const remainingTodos = (state) => {
  const notCompletedTasks = state.todos.filter((todo) => !todo.completed);
  return notCompletedTasks.length;
};

function Footer() {
  const colors = useSelector((state) => state.filters.colors);
  const status = useSelector((state) => state.filters.status);
  const todosRemaining = useSelector((state) => remainingTodos(state));

  const dispatch = useDispatch();

  const onColorChange = (color, changeType) => {
    dispatch({
      type: "filters/colorFilterChanged",
      payload: { color, changeType },
    });
  };

  const onStatusChange = (status) => {
    dispatch({ type: "filters/statusFilterChanged", payload: status });
  };

  const onMarkCompletedClicked = () => {
    dispatch({ type: "todos/allCompleted" });
  };

  const onClearCompletedClicked = () => {
    dispatch({ type: "todos/completedCleared" });
  };

  return (
    <footer className="footer">
      <div className="actions">
        <h5>Actions</h5>
        <button className="button" onClick={onMarkCompletedClicked}>
          Mark All Completed
        </button>
        <button className="button" onClick={onClearCompletedClicked}>
          Clear Completed
        </button>
      </div>

      <RemainingTodos count={todosRemaining} />
      <StatusFilter value={status} onChange={onStatusChange} />
      <ColorFilters value={colors} onChange={onColorChange} />
    </footer>
  );
}

export default Footer;
