# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Redux fundamentals - todo App with React:

## Redux fundamentals without Async Data and Data fetching

**Note:** Here I used the `primitiveui.css` file. It consists of css code from Primitive UI library.

Here are the links:<br>

- Author: Tania Rascia <tania@taniarascia.com>
- Source: https://github.com/taniarascia/primitive
- Documentation: https://taniarascia.github.io/primitive

## Used hooks and other stuff:

**Hooks**:

- **useSelector:**

  - This `useSelector` hook from `react-redux` library **lets your React components read data from the Redux store.**
  - `useSelector` accepts a single function, which we call a **selector** function. **A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.**<br>
    **Ex:**

    ````
    import React from 'react'
    import { useSelector } from 'react-redux'
    import TodoListItem from './TodoListItem'

        const selectTodos = state => state.todos

        const TodoList = () => {
            const todos = useSelector(selectTodos)

            // since `todos` is an array, we can loop over it
            const renderedListItems = todos.map(todo => {
                return <TodoListItem key={todo.id} todo={todo} />
            })

            return <ul className="todo-list">{renderedListItems}</ul>
        }

        export default TodoList
        ```
    ````

- **shallowEqual: A comparison function**

  - If we use `useSelector` and **returning new array references in selectors causes components to re-render every time**
  - `React-Redux` has a **shallowEqual comparison function** we can use to check if the items inside the array are still the same.
  - `useSelector` can take a comparison function as its **second argument**. A comparison function is called with the old and new values, and returns **true** if they're considered the same. If they're the same, `useSelector` **won't make the component re-render**.

- **useDispatch:**
  - Since we don't have access to the store in a component file, we need some way to get access to the `dispatch` function by itself inside our components.
  - The React-Redux `useDispatch` **hook** gives us the store's `dispatch` method as its result.
  - So, we can call `const dispatch = useDispatch()` in any component that needs to dispatch actions, and then call `dispatch(someAction)` as needed.

### Before useSelector hook, how was the connection to store was done?

Before the `useSelector` hook was introduced in React-Redux, you would typically connect your React components to the Redux store using the `connect` function provided by React-Redux. This involved using a higher-order component (HOC) pattern to wrap your components with the necessary Redux-related logic. Here's how it was done:

1. **Creating a Container Component:** You would create a separate container component that is responsible for connecting your React component to the Redux store. This container component would use the `connect` function from React-Redux.

```
import { connect } from 'react-redux';
import YourComponent from './YourComponent';

const mapStateToProps = (state) => ({
  // Define which parts of the Redux state your component needs
  // and map them to props.
  someData: state.someData,
});

const mapDispatchToProps = (dispatch) => ({
  // Define functions that will dispatch actions.
  // These will be mapped to props as well.
  someAction: () => dispatch(someAction()),
});

// Connect your component to the Redux store
const ConnectedComponent = connect(mapStateToProps, mapDispatchToProps)(YourComponent);

export default ConnectedComponent;

```

2. **Using the Connected Component:** You would then use the ConnectedComponent in your application in place of YourComponent. The data from the Redux store and the dispatching of actions would be handled automatically.

```
// In some other part of your application
import ConnectedComponent from './ConnectedComponent';

// Use ConnectedComponent in your JSX
// ...

```

### What will 'compose' method of react-redux do?

The `compose` method in React-Redux is a utility function that is used to compose multiple higher-order functions (HOCs) together. It is often used in conjunction with `connect` to apply multiple enhancements or transformations to a component in a more readable and concise manner.

Here's how you typically use `compose` with `connect` to connect a component to the Redux store while applying multiple HOCs:

```
import { connect } from 'react-redux';
import { compose } from 'redux';

const enhance = compose(
  connect(mapStateToProps, mapDispatchToProps),
  withSomeOtherHOC,
  withAnotherHOC
);

export default enhance(YourComponent);
```

In this example, `compose` takes multiple functions (HOCs) as arguments and returns a new function that applies them in right-to-left order. Then, you apply this composed function to your component.

The purpose of `compose` is to make the code more readable by avoiding deeply nested function calls.

With the introduction of React-Redux hooks, such as `useSelector` and `useDispatch`, you no longer need to use `compose` in the same way, as hooks provide a more straightforward and less verbose way to access the Redux store and dispatch actions within your functional components.

Using hooks like `useSelector` and `useDispatch` is the recommended approach for connecting functional components to the Redux store in modern React-Redux applications, as it reduces the boilerplate code and provides a more intuitive way to work with Redux in functional components.

**Provider component:**

- Provider<br>

  - This `Provider` component from `react-redux` library.
  - We have to specifically tell `React-Redux` what `store` we want to use in our components.
  - We do this by rendering a `<Provider>` component around our entire `<App>`, and passing the Redux store as a prop to `<Provider>`. After we do this once, every component in the application will be able to access the Redux store if it needs to.

    **Ex:**<br>

    > In App.jsx file:

  ```
  ReactDOM.render(
  // Render a `<Provider>` around the entire `<App>`,
  // and pass the Redux store to it as a prop
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
  )
  ```

- **composeWithDevTools:**
  - `redux-devtools-extension` package exports a specialized `composeWithDevTools` function that we can use instead of the original Redux `compose` function.

### Installations:

node used - v20.7.0

**dependencies**:

- redux
- react-redux
- @redux-devtools/extension
- vite-plugin-svgr

## UI Screenshot:

![UI_Screenshot](/images/UI_ScreenShot_on_2023-10-06.png "Todo App with React-redux")
