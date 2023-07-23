import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Todo from "../todo/todo";

test("renders element test", () => {
  render(<Todo />);
  const inputEl = screen.getByPlaceholderText("add To do");
  expect(inputEl).toBeInTheDocument();

  const addButton = screen.getByText("추가");
  expect(addButton).toBeTruthy();
  fireEvent.change(inputEl, { target: { value: "" } });
  fireEvent.click(addButton);

  const todoItems = screen.queryAllByTestId("todo-item");
  expect(todoItems.length).toBe(0);

  fireEvent.change(inputEl, { target: { value: "todo1" } });
  fireEvent.click(addButton);

  const todo1Text = screen.getByText("todo1");
  expect(todo1Text).toBeInTheDocument();

  const submitBtn = screen.queryAllByTestId("todo-submit");
  expect(submitBtn.length).toBe(1);

  const deleteBtn = screen.queryAllByTestId("todo-delete");
  expect(deleteBtn.length).toBe(1);

  fireEvent.click(submitBtn[0]);
  const success = screen.queryAllByTestId("todo-success");
  expect(success.length).toBe(1);

  fireEvent.click(deleteBtn[0]);
  const todoItemsDe = screen.queryAllByTestId("todo-item");
  expect(todoItemsDe.length).toBe(0);
});
