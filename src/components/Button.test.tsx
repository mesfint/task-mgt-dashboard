import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("renders without crashing", () => {
    render(<Button label="Click me" onClick={() => {}} />);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("calls onClick handler when clicked", () => {
    const handleClick = jest.fn();
    render(<Button label="Click me" onClick={handleClick} />);
    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct default styles", () => {
    render(<Button label="Click me" onClick={() => {}} />);
    const button = screen.getByText("Click me").closest("button");
    expect(button).toHaveStyle("padding: 8px 16px");
    expect(button).toHaveStyle("font-size: 16px");
  });
});