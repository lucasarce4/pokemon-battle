import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import App from "../App";

test("app", () => {
  const { debug } = render(<App></App>);
  debug();
});
