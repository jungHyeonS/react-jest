import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Todo from "../todo/todo";

test("renders element test", () => {
  render(<Todo />);
  const inputEl = screen.getByPlaceholderText("add To do");
  expect(inputEl).toBeInTheDocument();

  fireEvent.change(inputEl, { target: { value: "todo1" } });

  const addButton = screen.getByText("추가");
  expect(addButton).toBeTruthy();

  fireEvent.click(addButton);

  const todo1Text = screen.getByText("todo1");
  expect(todo1Text).toBeInTheDocument();
});
