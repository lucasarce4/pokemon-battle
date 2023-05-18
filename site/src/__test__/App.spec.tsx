import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import App from "../App";

test("app", () => {
  render(<App></App>);
  expect(screen.getByText(/poke-battle/i)).toBeInTheDocument();
});
