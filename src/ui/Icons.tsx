import * as React from "react";

const assets = {
  Action: "/icons/Navigation_Action.png",
  Add: "/icons/Navigation_Add.png",
  Bookmark: "/icons/Navigation_Bookmark.png",
  Camera: "/icons/Navigation_Camera.png",
  Compose: "/icons/Navigation_Compose.png",
  FastForward: "/icons/Navigation_FastForward.png",
  Organize: "/icons/Navigation_Organize.png",
  Pause: "/icons/Navigation_Pause.png",
  Play: "/icons/Navigation_Play.png",
  Refresh: "/icons/Navigation_Refresh.png",
  Reply: "/icons/Navigation_Reply.png",
  Rewind: "/icons/Navigation_Rewind.png",
  Search: "/icons/Navigation_Search.png",
  Stop: "/icons/Navigation_Stop.png",
  Trash: "/icons/Navigation_Trash.png",
  Check: "/icons/Navigation_Checklist.png",
} as const;

type IconName = keyof typeof assets;

interface Props extends React.HTMLProps<HTMLButtonElement> {
  name: IconName;
}

const Icon: React.FC<Props> = ({ name, title, disabled, onClick }) => {
  return (
    <button disabled={disabled} title={title} className="push-btn" onClick={onClick}>
      <img src={assets[name]} />
    </button>
  );
};

export default Icon;
