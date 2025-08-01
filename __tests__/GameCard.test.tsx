import { render, screen, fireEvent } from "@testing-library/react";
import GameCard from "@/components/GameCard";
import { Game } from "@/utils/endpoint";

const mockGame: Game = {
  id: "1",
  name: "Test Game",
  genre: "RPG",
  image: "/test.jpg",
  description: "Test description",
  price: 9.99,
  isNew: true,
};

test("renders game card with info", () => {
  render(<GameCard game={mockGame} />);

  expect(screen.getByText("Test Game")).toBeInTheDocument();
  expect(screen.getByText("$9.99")).toBeInTheDocument();
  expect(screen.getByRole("img")).toBeInTheDocument();
  expect(screen.getByRole("img")).toHaveAttribute("alt", "Test Game");
  expect(screen.getByText("RPG")).toBeInTheDocument();
});

test("toggles Add to Cart and Remove button text on click", () => {
  render(<GameCard game={mockGame} />);

  const button = screen.getByRole("button");

  expect(button).toHaveTextContent("Add to Cart");

  fireEvent.click(button);
  expect(button).toHaveTextContent("Remove");

  fireEvent.click(button);
  expect(button).toHaveTextContent("Add to Cart");
});
