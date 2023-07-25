// 타이머는 초기에 0을 표시합니다.
// "시작" 버튼을 클릭하면, 타이머는 초 단위로 증가를 시작합니다.
// "일시정지" 버튼을 클릭하면, 타이머의 진행이 일시정지됩니다.
// "재설정" 버튼을 클릭하면, 타이머가 0으로 재설정됩니다.

import { fireEvent, render, screen } from "@testing-library/react";

// 타이머 텍스트가 있는지 테스트
// 시작 버튼,일시정지,재설정 버튼이 있는지 테스트
// 시작 버튼이 클릭했을떄, 초가 1초단위로 증가하는지 테스트
// 일시정지 버튼을 클릭했을떄 타이머가 일시 정지 되는지 테스트
// 재설정 버튼을 클릭했을떄 타이머가 초기화 되는지 테스트

test("render to timer text element to document", () => {
  render(<Timer />);
  const timerText = screen.getByTestId("data-timer-text");
  expect(timerText).toBeInTheDocument();
});

test("render to timer contorls to document", () => {
  render(<Timer />);
  const startBtn = screen.getByText("시작");
  expect(startBtn).toBeInTheDocument();

  const stopBtn = screen.getByText("일시정지");
  expect(stopBtn).toBeInTheDocument();

  const resetBtn = screen.getByText("재설정");
  expect(resetBtn).toBeInTheDocument();
});

test("click to timer start button", () => {
  jest.useFakeTimers();
  render(<Timer />);

  const startBtn = screen.getByText("시작");
  fireEvent.click(startBtn);
  const timerText = screen.getByTestId("data-timer-text");
  expect(timerText.textContent).toBe("0");
  jest.advanceTimersByTime(3000);
  expect(timerText.textContent).toBe("3");
});

test("click to timer stop button", () => {
  jest.useFakeTimers();
  render(<Timer />);

  const startBtn = screen.getByText("시작");
  fireEvent.click(startBtn);
  const timerText = screen.getByTestId("data-timer-text");
  expect(timerText.textContent).toBe("0");
  jest.advanceTimersByTime(3000);

  const stopBtn = screen.getByText("일시정지");
  fireEvent.click(stopBtn);

  expect(timerText.textContent).toBe("3");
});

test("click to timer reset button", () => {
  jest.useFakeTimers();
  render(<Timer />);

  const startBtn = screen.getByText("시작");
  fireEvent.click(startBtn);
  const timerText = screen.getByTestId("data-timer-text");
  expect(timerText.textContent).toBe("0");
  jest.advanceTimersByTime(3000);

  const resetBtn = screen.getByText("재설정");
  fireEvent.click(resetBtn);

  expect(timerText.textContent).toBe("0");
});
