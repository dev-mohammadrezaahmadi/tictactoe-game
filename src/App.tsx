import { useState } from "react";

const Game: React.FC = () => {
	type HistoryType = CellValueType[][];
	const [history, setHistory] = useState<HistoryType>([Array(9).fill(null)]);
	const [currentStep, setCurrentStep] = useState(0);

	const currentBoard = history[currentStep];
	const nextValue = _calculateNextValue(currentBoard);
	const winner = _calculateWinner(currentBoard);
	const status = _calculateStatus(winner, currentBoard, nextValue);

	const selectCell = (cellIndex: number) => {
		// check if there's already a winner or there's already a value in the selected cell
		if (winner || currentBoard[cellIndex]) return;

		const newHistory = history.slice(0, currentStep + 1);
		const board = [...currentBoard];

		board[cellIndex] = nextValue;
		setHistory([...newHistory, board]);
		setCurrentStep(newHistory.length);
	};

	const reset = () => {
		setHistory([Array(9).fill(null)]);
		setCurrentStep(0);
	};

	const moves = history.map((stepBoard, step) => {
		const desc = step ? `Go to move#${step}` : `Go to game start`;
		const isCurrentStep = step === currentStep;

		return (
			<li key={step}>
				<button
					className="px-4 py-2 rounded-md mt-2 text-white bg-blue-500"
					disabled={isCurrentStep}
					onClick={() => setCurrentStep(step)}
				>
					{desc} {isCurrentStep ? `(current)` : null}
				</button>
			</li>
		);
	});

	return (
		<div className="flex justify-center">
			<div className="flex flex-col justify-center items-center min-h-screen">
				<h1 className="text-5xl font-bold mb-10">Tic Tac Toe</h1>
				<div className="mb-6 font-bold text-2xl md:text-3xl">{status}</div>
				<Board onClick={selectCell} currentBoard={currentBoard} />
				<button
					className="mt-10 font-bold text-2xl text-white bg-black rounded-md uppercase px-4 py-2"
					onClick={reset}
				>
					reset
				</button>
			</div>
			<div className="px-5 flex flex-col justify-center">
				<h2 className="font-bold text-2xl capitalize mb-10">Game History</h2>
				<ol>{moves}</ol>
			</div>
		</div>
	);
};

interface BoardProps {
	onClick: (cellIndex: number) => void;
	currentBoard: BoardType;
}

const Board: React.FC<BoardProps> = ({ onClick, currentBoard }) => {
	const renderCell = (i: number) => (
		<button
			onClick={() => onClick(i)}
			className="flex items-center justify-center bg-white border border-gray-500 rounded-sm focus:bg-red-50 focus:outline-none font-bold h-20 w-20 text-3xl md:h-28 md:w-28 md:text-5xl lg:text-8xl lg:h-40 lg:w-40"
		>
			{currentBoard[i]}
		</button>
	);

	return (
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
