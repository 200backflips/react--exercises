import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/redux/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <p>
        Om du redan har gjort Zustand-uppgiften kan du pröva dig på att sätta
        upp samma funktionalitet i{" "}
        <a
          href="https://redux.js.org/introduction/getting-started"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Redux
        </a>
        . Studera dokumentationen och kodexemplen noga för att förstå hur{" "}
        <a
          href="https://redux.js.org/introduction/getting-started"
          target="_blank"
          rel="noopener noreferrer"
          className="text-link"
        >
          Redux
        </a>{" "}
        skiljer sig struktur- och syntaxmässigt.
      </p>
      <ol>
        <li>
          Skapa ett globalt tillgängligt state vars värde kan manipuleras
          härifrån
        </li>
        <li>
          Skapa ännu ett state som tillsammans med en setter-funktion som
          populerar statet med data från ett API-anrop
        </li>
      </ol>
    </>
  );
}
