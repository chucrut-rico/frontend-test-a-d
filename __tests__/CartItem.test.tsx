import { render, screen, fireEvent } from "@testing-library/react";
import CartItem from "@/components/CartItem";
import { Game } from "@/utils/endpoint";

const testGame: Game = {
  id: "123",
  name: "Test Game",
  description: "Test Description",
  genre: "Strategy",
  image: "/test.jpg",
  price: 49.99,
  isNew: true,
};

describe("CartItem", () => {
  let onRemove: jest.Mock;

  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem("cart", JSON.stringify([testGame.id]));

    onRemove = jest.fn();
  });

  it("renders all game info", () => {
    render(<CartItem item={testGame} onRemove={onRemove} />);

    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("Test Description")).toBeInTheDocument();
    expect(screen.getByText("Strategy")).toBeInTheDocument();
    expect(screen.getByText("$49.99")).toBeInTheDocument();
    expect(screen.getByText("New")).toBeInTheDocument();

    const gameImage = screen.getByAltText("Test Game");
    expect(gameImage).toBeInTheDocument();
  });

  it("calls onRemove when remove button is clicked", () => {
    render(<CartItem item={testGame} onRemove={onRemove} />);

    const button = screen.getByRole("button", {
      name: /remove from cart/i,
    });
    fireEvent.click(button);

    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
