import * as React from "react";

export function useFocus<E extends HTMLElement>(ref: React.RefObject<E>) {
  return () => { ref.current && ref.current.focus(); };
}
