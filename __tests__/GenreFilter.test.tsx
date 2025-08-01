import { render, screen, fireEvent } from "@testing-library/react";
import GenreFilter from "@/components/GenreFilter";
import { useRouter, useSearchParams } from "next/navigation";

// Mocks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe("GenreFilter", () => {
  const mockPush = jest.fn();
  const mockOnNavigateStart = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: mockPush });
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams());

    window.history.pushState({}, "", "/");
    mockPush.mockClear();
    mockOnNavigateStart.mockClear();
  });

  it("renders label and options", () => {
    render(
      <GenreFilter
        selected={null}
        filters={["RPG", "FPS"]}
        onNavigateStart={mockOnNavigateStart}
      />
    );

    expect(screen.getByLabelText(/genre/i)).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "All" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "RPG" })).toBeInTheDocument();
    expect(screen.getByRole("option", { name: "FPS" })).toBeInTheDocument();
  });

  it("sets selected value", () => {
    render(
      <GenreFilter
        selected="FPS"
        filters={["RPG", "FPS"]}
        onNavigateStart={mockOnNavigateStart}
      />
    );

    const select = screen.getByLabelText(/genre/i) as HTMLSelectElement;
    expect(select.value).toBe("FPS");
  });

  it("calls router.push with correct genre and page=1", () => {
    render(
      <GenreFilter
        selected={null}
        filters={["RPG", "FPS"]}
        onNavigateStart={mockOnNavigateStart}
      />
    );

    const select = screen.getByLabelText(/genre/i);
    fireEvent.change(select, { target: { value: "RPG" } });

    expect(mockOnNavigateStart).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("genre=RPG"));
    expect(mockPush).toHaveBeenCalledWith(expect.stringContaining("page=1"));
  });

  it("removes genre when selecting All", () => {
    render(
      <GenreFilter
        selected="FPS"
        filters={["RPG", "FPS"]}
        onNavigateStart={mockOnNavigateStart}
      />
    );

    const select = screen.getByLabelText(/genre/i);
    fireEvent.change(select, { target: { value: "all" } });

    const calledUrl = mockPush.mock.calls[0][0];
    expect(mockOnNavigateStart).toHaveBeenCalledTimes(1);
    expect(calledUrl).not.toContain("genre=");
    expect(calledUrl).toContain("page=1");
  });

  it("calls onNavigateStart before navigating", () => {
    render(
      <GenreFilter
        selected={null}
        filters={["RPG", "FPS"]}
        onNavigateStart={mockOnNavigateStart}
      />
    );

    const select = screen.getByLabelText(/genre/i);
    fireEvent.change(select, { target: { value: "FPS" } });

    expect(mockOnNavigateStart).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalled();
  });
});
