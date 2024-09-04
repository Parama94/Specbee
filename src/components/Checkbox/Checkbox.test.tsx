import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { Checkbox } from "./Checkbox";

describe("Checkbox Component", () => {
  const mockOnFilterChecked = vi.fn();

  beforeEach(() => {
    mockOnFilterChecked.mockClear();
  });

  test("renders with the correct label", () => {
    render(
      <Checkbox
        label="Test Label"
        category="Category"
        checked={false}
        onFilterChecked={mockOnFilterChecked}
      />
    );

    const labelElement = screen.getByLabelText(/Test Label/i);
    expect(labelElement).toBeInTheDocument();
  });

  test('checkbox is unchecked by default when "checked" prop is false', () => {
    render(
      <Checkbox
        label="Test Label"
        category="Category"
        checked={false}
        onFilterChecked={mockOnFilterChecked}
      />
    );

    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).not.toBeChecked();
  });

  test('checkbox is checked when "checked" prop is true', () => {
    render(
      <Checkbox
        label="Test Label"
        category="Category"
        checked={true}
        onFilterChecked={mockOnFilterChecked}
      />
    );

    const checkboxElement = screen.getByRole("checkbox");
    expect(checkboxElement).toBeChecked();
  });

  test("calls onFilterChecked with correct parameters when checkbox is clicked", () => {
    render(
      <Checkbox
        label="Test Label"
        category="Category"
        checked={false}
        onFilterChecked={mockOnFilterChecked}
      />
    );

    const checkboxElement = screen.getByRole("checkbox");
    fireEvent.click(checkboxElement);

    expect(mockOnFilterChecked).toHaveBeenCalledWith(
      "source",
      "Test Label",
      true
    );
  });
});
