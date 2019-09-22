import * as React from "react";
import { connect, AppState, ActionDispatcher } from "../store/Store";
import Menu from "./Menu";
import Editor from "./Editor";
import Icon from "./Icons";
import { isTodo, canMarkDone } from "../utils";

interface Props extends ActionDispatcher {
  todos: Todo[];
  selected: Maybe<Todo>;
}

const props = ({ todos, selected }: AppState) => {
  return { todos, selected };
};

const Toolbar: React.FC = ({ children }) => {
  return (
    <nav className="pa3">
      <div className="flex flex-row items-start">{children}</div>
    </nav>
  );
};

const Screen: React.FC<Props> = ({ dispatch, selected, todos }) => {
  const markable = canMarkDone(selected);
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
          disabled={!isTodo(selected)}
          onClick={() => {
            dispatch.removeTodo(selected);
          }}
        />
      </Toolbar>
      <div className="flex flex-auto flex-row items-stretch">
        <Menu tabIndex={1} todos={todos}>
          {todo => (
            <Menu.Item
              selected={todo == selected}
              todo={todo}
              onClick={() => todo !== selected && dispatch.select(todo)}
            />
          )}
        </Menu>
        <Editor
          tabIndex={2}
          todo={selected}
          onStopEdit={() => {
            dispatch.unmark(selected);
          }}
          onEdit={(content: string) => {
            dispatch.edit(selected, { content });
          }}
        ></Editor>
      </div>
    </>
  );
};

export default connect(props)(Screen);
