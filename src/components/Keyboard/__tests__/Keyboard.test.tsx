import { render, screen } from "@testing-library/react";
import Keyboard from "../index";
import { allowedKeys } from "../../../constants/constants";
import userEvent from "@testing-library/user-event";

describe("Board.tsx", () => {
  it("should render keyboard", () => {
    render(<Keyboard charactersMap={{}} />);

    screen.getByTestId("keyboard");
  });

  it.each(allowedKeys)("should render key %s", (key) => {
    render(<Keyboard charactersMap={{}} />);
    screen.getByText(key);
  });

  it("should set gray color on incorrect letters", () => {
    render(<Keyboard charactersMap={{ a: "keyboard__key--gray" }} />);
    const letterA = screen.getByText("a");

    expect(letterA).toHaveClass("keyboard__key keyboard__key--gray");
  });

  it("should set yellow color on misplaced letters", () => {
    render(
      <Keyboard
        charactersMap={{ a: "keyboard__key--gray", y: "keyboard__key--yellow" }}
      />
    );
    const letterA = screen.getByText("a");
    const letterY = screen.getByText("y");

    expect(letterA).toHaveClass("keyboard__key keyboard__key--gray");
    expect(letterY).toHaveClass("keyboard__key keyboard__key--yellow");
  });

  it("should set green color on correct letters", () => {
    render(
      <Keyboard
        charactersMap={{
          a: "keyboard__key--gray",
          y: "keyboard__key--yellow",
          r: "keyboard__key--green",
        }}
      />
    );
    const letterA = screen.getByText("a");
    const letterY = screen.getByText("y");
    const letterR = screen.getByText("r");

    expect(letterA).toHaveClass("keyboard__key keyboard__key--gray");
    expect(letterY).toHaveClass("keyboard__key keyboard__key--yellow");
    expect(letterR).toHaveClass("keyboard__key keyboard__key--green");
  });

  it("should dispatch custom event when clicked on the key", () => {
    render(<Keyboard charactersMap={{}} />);
    const keySpy = jest.spyOn(document, "dispatchEvent");

    const event = new CustomEvent("onscreenkeyboard", {
      detail: "a",
    });

    userEvent.click(screen.getByText("a"));
    expect(keySpy).toBeCalledTimes(1);
    expect(keySpy).toBeCalledWith(event);
  });
});
