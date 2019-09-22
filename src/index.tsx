import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider, configureStore } from "./Store";
import Screen from "./Screen";

const AppShell: React.FC = ({ children }) => (
  <main className="flex flex-row items-stretch">
    <aside
      tabIndex={0}
      style={{ maxWidth: "30vw", minWidth: "20vw" }}
      className="pa3 pt1 h-resizable bg-light-gray br b--light-silver"
    >
      <header>
        <a href="/">
          <h4>{document.title}</h4>
        </a>
      </header>
    </aside>
    <section id="app" className="flex flex-auto flex-column">
      {children}
    </section>
  </main>
);

function App(): React.ReactElement {
  return (
    <Provider store={configureStore()}>
      <AppShell>
        <Screen />
      </AppShell>
    </Provider>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
