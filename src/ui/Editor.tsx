import * as React from "react";
import { useFocus } from "./Effects";
import utils from "../utils";

interface Props extends React.HTMLProps<HTMLTextAreaElement> {
  todo: Maybe<Todo>;
  onEdit(content: string): void;
  onStopEdit(): void;
}

const Editor: React.FC<React.HTMLProps<HTMLTextAreaElement>> = ({
  autoFocus,
  readOnly,
  title,
  value,
  onChange,
  onBlur,
}) => {

  const textArea: React.RefObject<HTMLTextAreaElement> = React.useRef(null);
  React.useEffect(useFocus(textArea), [autoFocus]);

  return (
    <>
      <p className="tc fw1 f5">{title}</p>
      <textarea
        readOnly={readOnly}
        ref={textArea}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className="input-reset bn mh5 flex-auto no-resizable"
      />
    </>
  );
};

const Empty: React.FC = () => {
  return <p className="flex-v-margin-align tc f2 light-silver">No note selected</p>;
};

const TodoEditor: React.FC<Props> = ({ todo, onStopEdit, onEdit, tabIndex }) => {

  const onChange = ({ target }: React.FormEvent) => {
    const textarea = target as HTMLTextAreaElement;
    onEdit(textarea.value);
  };

  const Content = utils.todo.isTodo(todo) ? Editor : Empty;

  return (
    <div tabIndex={tabIndex} className="flex flex-column flex-auto">
      <Content
        readOnly={todo.type == "Done"}
        autoFocus={todo.type === "New"}
        title={new Date(todo.createdAt || "").toLocaleString()}
        value={todo.content}
        onBlur={onStopEdit}
        onChange={onChange}
      />
    </div>
  );
};

export default TodoEditor;
