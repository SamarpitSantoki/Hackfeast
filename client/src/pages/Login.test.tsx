import { render, screen } from "@testing-library/react";
import Login from "./Login";

import { useAppDispatch, useAppSelector } from "../features/redux-hooks";
import { testUseAppSelector } from "../features/test-app-selector";
import { JsxElement } from "typescript";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("../features/redux-hooks");

describe("App", () => {
  beforeEach(() => {
    (useAppSelector as jest.Mock).mockImplementation(() => testUseAppSelector);
  });

  it("renders login", () => {
    render(
      <Router>
        <Login />
      </Router>
    );
    expect(screen.getByText("Login")).toBeInTheDocument();
  });
});
