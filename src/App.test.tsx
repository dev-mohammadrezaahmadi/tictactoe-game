import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("can play a set of game", () => {
	render(<App />);

	const [c1, c2, c3, c4, c5, c6, c7, c8, c9] = Array.from(
		screen.queryAllByRole("button")
	);
	expect(screen.getByText("Next player: X")).toBeInTheDocument();

	userEvent.click(c1);
	expect(c1).toHaveTextContent("X");

	expect(screen.getByText("Next player: O")).toBeInTheDocument();
	userEvent.click(c5);
	expect(c5).toHaveTextContent("O");

	expect(screen.getByText("Next player: X")).toBeInTheDocument();
	userEvent.click(c9);
	expect(c9).toHaveTextContent("X");

	expect(screen.getByText("Next player: O")).toBeInTheDocument();
	userEvent.click(c7);
	expect(c7).toHaveTextContent("O");

	expect(screen.getByText("Next player: X")).toBeInTheDocument();
	userEvent.click(c3);
	expect(c3).toHaveTextContent("X");

	expect(screen.getByText("Next player: O")).toBeInTheDocument();
	userEvent.click(c2);
	expect(c2).toHaveTextContent("O");

	expect(screen.getByText("Next player: X")).toBeInTheDocument();
	userEvent.click(c6);
	expect(c6).toHaveTextContent("X");

	// at this moment the winner should be 'X' and the game is finished
	expect(screen.getByText("😀yay! winner is X")).toBeInTheDocument();

	// and ofcourse after the winner is determined user can not select another cell
	userEvent.click(c4);
	expect(c4).toHaveTextContent("");
});

test("when the game has no winner or the game is draw", () => {
	render(<App />);

	const [c1, c2, c3, c4, c5, c6, c7, c8, c9] = Array.from(
		screen.queryAllByRole("button")
	);

	expect(screen.getByText("Next player: X")).toBeInTheDocument();

	userEvent.click(c1);
	expect(c1).toHaveTextContent("X");

	userEvent.click(c4);
	expect(c4).toHaveTextContent("O");

	userEvent.click(c7);
	expect(c7).toHaveTextContent("X");

	userEvent.click(c2);
	expect(c2).toHaveTextContent("O");

	userEvent.click(c3);
	expect(c3).toHaveTextContent("X");

	userEvent.click(c5);
	expect(c5).toHaveTextContent("O");

	userEvent.click(c8);
	expect(c8).toHaveTextContent("X");

	userEvent.click(c9);
	expect(c9).toHaveTextContent("O");

	userEvent.click(c6);
	expect(c6).toHaveTextContent("X");

	expect(screen.getByText("😮oops! that was close")).toBeInTheDocument();
});

test("does not change cell value when it is clicked multiple times", () => {
	render(<App />);
	const [cell] = Array.from(screen.queryAllByRole("button"));
	userEvent.click(cell);
	userEvent.click(cell);
	expect(cell).toHaveTextContent("X");
});
