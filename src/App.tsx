import { useState } from "react";

const Game: React.FC = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<h1 className="text-5xl font-bold mb-10">Tic Tac Toe</h1>
			<Board />
		</div>
	);
};

const Board: React.FC = () => {
	const [cells, setCells] = useState<BoardType>(Array(9).fill(null));

	const nextValue = _calculateNextValue(cells);
	const winner = _calculateWinner(cells);
	const status = _calculateStatus(winner, cells, nextValue);

	const selectCell = (cellIndex: number) => {
		// check if there's already a winner or there's already a value in the selected cell
		if (winner || cells[cellIndex]) return;

		const cellsCopy = [...cells];
		cellsCopy[cellIndex] = nextValue;
		setCells(cellsCopy);
	};

	const reset = () => {
		setCells(Array(9).fill(null));
	};

	const renderCell = (i: number) => (
		<button
			onClick={() => selectCell(i)}
			className="flex items-center justify-center bg-white border border-gray-500 rounded-sm focus:bg-red-50 focus:outline-none font-bold h-20 w-20 text-3xl md:h-28 md:w-28 md:text-5xl lg:text-8xl lg:h-40 lg:w-40"
		>
			{cells[i]}
		</button>
	);

	return (
		<>
			<div className="mb-6 font-bold text-2xl md:text-3xl">{status}</div>
			<div className="mx-auto grid grid-cols-3">
				{renderCell(0)}
				{renderCell(1)}
				{renderCell(2)}
				{renderCell(3)}
				{renderCell(4)}
				{renderCell(5)}
				{renderCell(6)}
				{renderCell(7)}
				{renderCell(8)}
			</div>
			<button
				className="mt-4 md:mt-10 text-2xl md:text-3xl px-4 py-2 uppercase bg-black text-white font-bold rounded-md"
				onClick={reset}
			>
				reset
			</button>
		</>
	);
};

export default Game;

// utils

type CellValueType = "X" | "O" | null;
type BoardType = CellValueType[];

const _calculateNextValue = (cells: BoardType): CellValueType => {
	return cells.filter(Boolean).length % 2 === 0 ? "X" : "O";
};

const _calculateWinner = (cells: BoardType): CellValueType => {
	// states of winnig
	const lines: number[][] = [
		[0, 1, 2],
		[3, 4, 5],
		[6, 7, 8],
		[0, 3, 6],
		[1, 4, 7],
		[2, 5, 8],
		[0, 4, 8],
		[2, 4, 6],
	];

	for (let i = 0; i < lines.length; i++) {
		const [a, b, c] = lines[i];
		if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
			return cells[a];
		}
	}

	return null;
};

const _calculateStatus = (
	winner: CellValueType,
	cells: BoardType,
	nextValue: CellValueType
) => {
	return winner
		? `😀yay! winner is ${winner} `
		: cells.every(Boolean)
		? "😮oops! that was close"
		: `Next player: ${nextValue}`;
};
