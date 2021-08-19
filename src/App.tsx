const Game: React.FC = () => {
	return (
		<div className="flex flex-col justify-center items-center min-h-screen">
			<h1 className="text-5xl font-bold mb-10">Tic Tac Toe</h1>
			<Board />
		</div>
	);
};

const Board: React.FC = () => {
	const renderCell = () => (
		<button className="flex items-center justify-center bg-white border border-gray-500 rounded-sm focus:bg-red-50 focus:outline-none font-bold h-20 w-20 text-3xl md:h-28 md:w-28 md:text-5xl lg:text-8xl lg:h-40 lg:w-40">
			X
		</button>
	);
	return (
		<div className="mx-auto grid grid-cols-3">
			{renderCell()}
			{renderCell()}
			{renderCell()}
			{renderCell()}
			{renderCell()}
			{renderCell()}
			{renderCell()}
			{renderCell()}
			{renderCell()}
		</div>
	);
};

export default Game;
