import * as React from "react";
import { connect, AppState, ActionEmitter } from "./Store";
import Menu from "./Menu";
import Editor from "./Editor";
import Icon from "./Icons";
import { isTodo, canMarkDone } from "./utils";

interface Props {
  todos: TodoNote[];
  selected: Maybe<TodoNote>;
}

const props = ({ todos, selected }: AppState) => {
  return { todos, selected };
};

type ListProps = Props & ActionEmitter;

const Toolbar: React.FC = ({ children }) => {
  return (
    <nav className="pa3">
      <div className="flex flex-row items-start">{children}</div>
    </nav>
  );
};

const Todos: React.FC<ListProps> = ({ emit, todos, selected }) => {
  return (
    <div className="flex flex-auto flex-row items-stretch">
      <Menu tabIndex={1} todos={todos}>
        {todo => (
          <Menu.Item
            selected={todo == selected}
            todo={todo}
            onClick={() => todo !== selected && emit.select(todo)}
          />
        )}
      </Menu>
      <Editor
        tabIndex={2}
        todo={selected}
        onStopEdit={() => {
          emit.unmark(selected);
        }}
        onEdit={(content: string) => {
          emit.edit(selected, { content });
        }}
      ></Editor>
    </div>
  );
};

type ScreenProps = Props & ActionEmitter;

const Screen: React.FC<ScreenProps> = ({ emit, selected, todos }) => {
  const markable = canMarkDone(selected);
  const markAction = markable ? emit.markDone : emit.unmark;
  return (
    <>
      <Toolbar>
        <Icon
          name="Compose"
          title="Create a note"
          onClick={() => {
            emit.create();
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
            emit.removeTodo(selected);
          }}
        />
      </Toolbar>
      <Todos todos={todos} selected={selected} emit={emit} />
    </>
  );
};

export default connect(props)(Screen);
