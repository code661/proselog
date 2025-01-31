import { ICommand, prependExecute } from "."

export const Heading: ICommand = {
  name: "heading",
  icon: (
    <svg height="16" width="16" viewBox="0 0 16 16">
      <path d="M3.75 2a.75.75 0 01.75.75V7h7V2.75a.75.75 0 011.5 0v10.5a.75.75 0 01-1.5 0V8.5h-7v4.75a.75.75 0 01-1.5 0V2.75A.75.75 0 013.75 2z"></path>
    </svg>
  ),
  execute: (view) => {
    prependExecute({ view, prepend: "### " })
  },
}
