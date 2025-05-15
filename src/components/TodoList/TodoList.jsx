import Grid from '../Grid/Grid.jsx';
import TodoListItem from '../TodoListItem/TodoListItem';

const TodoList = ({ todos, onDelete, onOpen }) => {
  return (
    <Grid>
      {todos.map((todo, index) => (
        <TodoListItem
          key={todo.id}
          text={todo.text}
          id={todo.id}
          count={index + 1}
          onDelete={() => onDelete(todo.id)}
          onOpen={() => onOpen(todo)}
        />
      ))}
    </Grid>
  );
};

export default TodoList;
