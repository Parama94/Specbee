import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { describe, test, expect, vi } from "vitest";
import { Card } from "./Card";

vi.mock("../../utils/dateUtils", () => ({
  formatDate: (date: string) => `Formatted ${date}`,
}));

describe("Card Component", () => {
  const stockData = {
    title: "<b>Card Title</b>",
    image: "image.jpg",
    date: "2024-01-01",
    body: "<p>Card body content</p>",
    source: "News Source",
    author: "Author Name",
  };

  test("renders card with correct information", () => {
    render(<Card {...stockData} />);

    const imgElement = screen.getByAltText("card image");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      `${import.meta.env.VITE_IMG_BASE_URL}/${stockData.image}`
    );

    const dateElement = screen.getByText(`Formatted ${stockData.date}`);
    expect(dateElement).toBeInTheDocument();

    const sourceElement = screen.getByText(stockData.source);
    expect(sourceElement).toBeInTheDocument();

    const titleElement = screen.getByText(/Card Title/i);
    expect(titleElement).toBeInTheDocument();

    const bodyElement = screen.getByText("Card body content");
    expect(bodyElement).toBeInTheDocument();

    const authorElement = screen.getByText(stockData.author);
    expect(authorElement).toBeInTheDocument();
  });
});
