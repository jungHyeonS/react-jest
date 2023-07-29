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

//모든 테스트에서 페이크 타이머를 사용하도록 설정
beforeEach(() => {
  jest.useFakeTimers();
});

//테스트에 필요한 모든 요소를 초기화 하는 단계
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
  const { startBtn, timerText } = setup();

  //버튼 이밴트 발생
  fireEvent.click(startBtn);

  act(() => {
    //현재 큐에 등록된 타이머들만 즉시 실행되고, 그 이후에 추가된 타이머는 실행하지 않는다
    jest.runOnlyPendingTimers();
  });

  //특정 조건이 충족될때까지 테스트이 실행을 일시중지, 비동기적으로 상태를 업데이트하는 컴포넌트를 테스트할떄 유용
  await waitFor(() => expect(timerText).toHaveTextContent("1"));

  act(() => {
    //jest에 타이머 시뮬레이션 메소드, 특정 시간 만큼 타이머를 진행시키는 역할
    jest.advanceTimersByTime(1000);
  });

  expect(timerText).toHaveTextContent("2");
});

test("click to timer stop button", () => {
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
