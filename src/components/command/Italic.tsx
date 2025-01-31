import { ICommand, wrapExecute } from "."

export const Italic: ICommand = {
  name: "italic",
  icon: (
    <svg height="16" viewBox="0 0 16 16" width="16">
      <path d="M6 2.75A.75.75 0 016.75 2h6.5a.75.75 0 010 1.5h-2.505l-3.858 9H9.25a.75.75 0 010 1.5h-6.5a.75.75 0 010-1.5h2.505l3.858-9H6.75A.75.75 0 016 2.75z"></path>
    </svg>
  ),
  execute: (view) => {
    wrapExecute({ view, prepend: "_", append: "_" })
  },
}
