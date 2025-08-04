import { render, screen, fireEvent } from "@testing-library/react";
import { useRouter } from "next/navigation";
import LoadMoreButton from "@/components/LoadMoreButton";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(() => ({
    get: (key: string) => {
      if (key === "page") return "1";
      return null;
    },
  })),
}));

describe("LoadMoreButton", () => {
  const pushMock = jest.fn();
  const onNavigateStartMock = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });
    pushMock.mockClear();
    onNavigateStartMock.mockClear();
  });

  it("should render the button when currentPage < totalPages", () => {
    render(
      <LoadMoreButton
        currentPage={1}
        totalPages={3}
        onNavigateStart={onNavigateStartMock}
      />
    );

    const button = screen.getByRole("button", { name: /see more/i });
    expect(button).toBeInTheDocument();
  });

  it("should not render the button when currentPage >= totalPages", () => {
    const { container } = render(
      <LoadMoreButton
        currentPage={3}
        totalPages={3}
        onNavigateStart={onNavigateStartMock}
      />
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should call onNavigateStart and navigate to the next page on click", () => {
    render(
      <LoadMoreButton
        currentPage={1}
        totalPages={3}
        onNavigateStart={onNavigateStartMock}
      />
    );

    const button = screen.getByRole("button", { name: /see more/i });
    fireEvent.click(button);

    expect(onNavigateStartMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalled();
    expect(pushMock).toHaveBeenCalledWith(expect.stringContaining("page=2"));
  });
});
