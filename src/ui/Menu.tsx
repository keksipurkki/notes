import * as React from "react";
import FlipMove from "react-flip-move";
import utils from "../utils";

interface Props extends React.HTMLProps<HTMLUListElement>{
  todos: Todo[];
  children: React.FC<Todo>;
}

interface ItemProps extends React.HTMLProps<HTMLAnchorElement> {
  todo: Todo;
}

interface StaticProps {
  Item: React.FC<ItemProps>;
}

const TodoMenuItem: React.FC<ItemProps> = ({ selected, onClick, todo }) => {
  const { title, details } = utils.todo.parse(todo);
  const state = todo.type.toLowerCase();
  return (
    <a
      href="#"
      onClick={onClick}
      className={selected ? `selected todo-item ${state}` : `todo-item ${state}`}
    >
      <div className="noselect flex-auto f6 ph3 pv2 bb b--light-silver-o">
        <strong className="db mv1">{title}</strong>
        <p className="mv1 truncate">
          {utils.todo.timestamp(todo)}&nbsp;
          <span className="fw3">{details}</span>
        </p>
      </div>
    </a>
  );
};

const TodoMenu: React.FC<Props> & StaticProps = ({ children, todos, ...props }) => {
  return (
    <ul
      style={{ width: "20vw" }}
      className="todo-list list h-resizable ma0 pa0 br b--light-silver-o"
      {...props}
    >
      <FlipMove
        leaveAnimation="accordionVertical"
        enterAnimation="accordionVertical"
        typeName={null}
      >
        {todos.filter(utils.todo.isTodo).map(todo => (
          <li key={todo.id}>{children(todo)}</li>
        ))}
      </FlipMove>
    </ul>
  );
};

TodoMenu.Item = TodoMenuItem;

export default TodoMenu;
