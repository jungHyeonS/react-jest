import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import About from "../about";

test("renders about", () => {
  //about 컴포넌트를 렌더링
  render(<About />);

  //about 컴포넌트에 Hello About 이라는 텍스트가 포함되어 있는 요소가 있는지 확인
  expect(screen.getByText(/Hello About/i)).toBeInTheDocument();
});
