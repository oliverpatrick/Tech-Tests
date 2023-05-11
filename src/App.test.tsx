import React from "react";
import { render } from "@testing-library/react";
import App from "./App";

test("renders the app view", () => {
  const view = render(<App />);
  expect(view).toBeTruthy();
});
