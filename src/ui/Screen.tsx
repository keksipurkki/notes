import * as React from "react";
import { connect, selectors, ActionDispatcher } from "../store/Store";
import utils from "../utils";
import Menu from "./Menu";
import Editor from "./Editor";
import Icon from "./Icons";

interface Props extends ActionDispatcher {
  todos: Todo[];
  selected: Maybe<Todo>;
}

function props(state: AppState) {
  return { todos: selectors.todos(state), selected: selectors.selected(state) };
}

const Toolbar: React.FC = ({ children }) => {
  return (
    <nav className="pa3">
      <div className="flex flex-row items-start">{children}</div>
    </nav>
  );
};

interface SplitProps {
  leading: React.ReactElement;
  trailing: React.ReactElement;
  direction: "horizontal" | "vertical";
}

const Split: React.FC<SplitProps> = ({ leading, trailing }) => {
  return (
    <div className="flex flex-auto flex-row items-stretch">
      {leading}
      {trailing}
    </div>
  );
};

const Screen: React.FC<Props> = ({ dispatch, selected, todos }) => {
  const markable = utils.todo.canMarkDone(selected);
  const markAction = markable ? dispatch.markDone : dispatch.unmark;
  return (
    <>
      <Toolbar>
        <Icon
          name="Compose"
          title="Create a note"
          onClick={() => {
            dispatch.create();
          }}
        />
        <Icon
          name={markable ? "Check" : "Refresh"}
          title={markable ? "Mark as done" : "Undo"}
          disabled={!selected.content}
          onClick={() => {
            markAction(selected);
          }}
        />
        <Icon
          name="Trash"
          title="Remove a note"
          disabled={!utils.todo.isTodo(selected)}
          onClick={() => {
            dispatch.removeTodo(selected);
          }}
        />
      </Toolbar>
      <Split
        direction="horizontal"
        leading={
          <Menu tabIndex={1} todos={todos}>
            {todo => (
              <Menu.Item
                selected={todo == selected}
                todo={todo}
                onClick={() => todo !== selected && dispatch.select(todo)}
              />
            )}
          </Menu>
        }
        trailing={
          <Editor
            tabIndex={2}
            todo={selected}
            onStopEdit={() => {
              dispatch.unmark(selected);
            }}
            onEdit={(content: string) => {
              dispatch.edit(selected, { content });
            }}
          />
        }
      />
    </>
  );
};

export default connect(props)(Screen);
