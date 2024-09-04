import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import { Pagination } from "./Pagination";

describe("Pagination Component", () => {
  const mockOnPageChange = vi.fn();

  test("renders initial page numbers", () => {
    render(<Pagination totalPages={5} onPageChange={mockOnPageChange} />);

    const pageButtons = screen.getAllByRole("button", { name: /\d+/ });
    expect(pageButtons).toHaveLength(3);
  });

  test("renders correct page numbers for middle pages", () => {
    render(<Pagination totalPages={5} onPageChange={mockOnPageChange} />);

    const pageButtons = screen.getAllByRole("button", { name: /\d+/ });
    expect(pageButtons[0]).toHaveTextContent("1");
    expect(pageButtons[1]).toHaveTextContent("2");
    expect(pageButtons[2]).toHaveTextContent("3");
  });

  test("displays correct page numbers when on last page", () => {
    render(<Pagination totalPages={4} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText("3"));

    const pageButtons = screen.getAllByRole("button", { name: /\d+/ });
    expect(pageButtons[0]).toHaveTextContent("2");
    expect(pageButtons[1]).toHaveTextContent("3");
    expect(pageButtons[2]).toHaveTextContent("4");
  });

  test("calls onPageChange when a page number is clicked", () => {
    render(<Pagination totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText("2"));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange when the next button is clicked", () => {
    render(<Pagination totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText(">"));

    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test("calls onPageChange when the previous button is clicked", () => {
    render(<Pagination totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText("<"));

    expect(mockOnPageChange).toHaveBeenCalledWith(3);
  });

  test("disables the previous button on the first page", () => {
    render(<Pagination totalPages={5} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText("2"));

    const prevButton = screen.getByText("<");
    expect(prevButton).toBeEnabled();

    fireEvent.click(screen.getByText("<"));
    expect(prevButton).toBeDisabled();
  });
});
