import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import Counter from "./Counter";

describe("Counter Component", () => {
  it("renders without crashing", () => {
    render(<Counter />);
    expect(screen.getByText("Counter App")).toBeInTheDocument();
    expect(screen.getByTestId("counter-value")).toHaveTextContent("Count: 0");
  });

  it("increments the count", () => {
    render(<Counter />);
    const incrementButton = screen.getByTestId("increment-btn");
    fireEvent.click(incrementButton);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("Count: 1");
  });

  it("decrements the count", () => {
    render(<Counter />);
    const decrementButton = screen.getByTestId("decrement-btn");
    fireEvent.click(decrementButton);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("Count: -1");
  });

  it("resets the count", () => {
    render(<Counter />);
    const incrementButton = screen.getByTestId("increment-btn");
    const resetButton = screen.getByTestId("reset-btn");

    // Increment first to test reset
    fireEvent.click(incrementButton);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("Count: 1");

    // Reset the count
    fireEvent.click(resetButton);
    expect(screen.getByTestId("counter-value")).toHaveTextContent("Count: 0");
  });
});
