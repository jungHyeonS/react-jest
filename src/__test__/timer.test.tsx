// 타이머는 초기에 0을 표시합니다.
// "시작" 버튼을 클릭하면, 타이머는 초 단위로 증가를 시작합니다.
// "일시정지" 버튼을 클릭하면, 타이머의 진행이 일시정지됩니다.
// "재설정" 버튼을 클릭하면, 타이머가 0으로 재설정됩니다.
import "@testing-library/jest-dom/extend-expect";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import Timer from "../timer/timer";

// 타이머 텍스트가 있는지 테스트
// 시작 버튼,일시정지,재설정 버튼이 있는지 테스트
// 시작 버튼이 클릭했을떄, 초가 1초단위로 증가하는지 테스트
// 일시정지 버튼을 클릭했을떄 타이머가 일시 정지 되는지 테스트
// 재설정 버튼을 클릭했을떄 타이머가 초기화 되는지 테스트

const setup = () => {
  render(<Timer />);

  const timerText = screen.getByTestId("data-timer-text");
  const startBtn = screen.getByText("시작");
  const stopBtn = screen.getByText("일시정지");
  const resetBtn = screen.getByText("재설정");

  return { timerText, startBtn, stopBtn, resetBtn };
};

test("render to timer text element to document", () => {
  const { timerText } = setup();
  expect(timerText).toBeInTheDocument();
});

test("render to timer contorls to document", () => {
  const { startBtn, stopBtn, resetBtn } = setup();

  expect(startBtn).toBeInTheDocument();

  expect(stopBtn).toBeInTheDocument();

  expect(resetBtn).toBeInTheDocument();
});

test("click to timer start button", async () => {
  jest.useFakeTimers();
  const { startBtn, timerText } = setup();

  fireEvent.click(startBtn);
  act(() => {
    jest.runOnlyPendingTimers();
  });
  // jest.advanceTimersByTime(1000);
  expect(timerText.textContent).toBe("1");

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(timerText.textContent).toBe("2");
});

test("click to timer stop button", () => {
  jest.useFakeTimers();

  const { startBtn, timerText, stopBtn } = setup();

  expect(timerText.textContent).toBe("0");

  fireEvent.click(startBtn);

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(timerText.textContent).toBe("1");

  fireEvent.click(stopBtn);

  expect(timerText.textContent).toBe("1");
});

test("click to timer reset button", () => {
  jest.useFakeTimers();

  const { startBtn, timerText, resetBtn } = setup();

  expect(timerText.textContent).toBe("0");

  fireEvent.click(startBtn);

  act(() => {
    jest.runOnlyPendingTimers();
  });

  expect(timerText.textContent).toBe("1");

  fireEvent.click(resetBtn);

  expect(timerText.textContent).toBe("0");
});
