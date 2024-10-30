import ButtonModes from "./components/ButtonModes";
import DescriptionMode from "./components/DescriptionMode";
import { useEffect, useState } from "react";
import StartGame from "./components/StartGame";
import Timer from "./components/Timer";
import MainGame from "./components/MainGame";
import DescriptionModeRules from "./components/DescriptionModeRules";
import GameOverMessage from "./components/GameOverMessage";
import styled from "styled-components";
import jajar from "../public/ui/jajar.jpg";
const Wrap = styled.div`
	width: 100%;

	height: 100%;
	flex-grow: 1;

	display: flex;
	align-items: start;
	justify-content: right; // change to center

	padding: 1rem 1rem 1rem 1rem;

	overflow: hidden;
	#imageWrap {
		display: none;
		@media (orientation: landscape) {
			display: block;

			width: calc(50% - 1rem);
			height: 100%;

			margin-right: 1rem;
		}
		div {
			display: flex;
			justify-content: center;
			align-items: start;

			height: 100%;
			width: auto;
			margin-inline: auto;

			img {
				max-width: 100%;
				max-height: 100%;

				object-fit: scale-down;

				border-radius: 10px;

				box-shadow: 4px 4px 25px 0px #ff0000e5, 0px 4px 4px 0px #00000040;
			}
		}
	}

	#rulesWrap {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		@media (orientation: landscape) {
			width: 50%;
		}
	}
`;
const App = () => {
	const [mode, setMode] = useState("People");
	const [gameStart, setGameStart] = useState(false);
	const [ranking, setRanking] = useState(false);
	const [gameOver, setGameOver] = useState(false);
	const [loading, setLoading] = useState(true);
	const [image, setImage] = useState(`${jajar}`);
	const [points, setPoints] = useState(0);
	const handlerPoints = () => {
		setPoints((prev) => prev + 1);
	};
	const handlerImage = (image) => {
		console.log("Do not show timer:", image);
		setImage(image);
	};
	const handlerLoading = (bool) => {
		console.log("Do not show timer:", bool);
		setLoading(bool);
	};
	const handlerGameOver = (gameover) => {
		setGameOver(gameover);
	};
	const handlerRanking = (ranking) => {
		setRanking(ranking);
	};
	const handlerMode = (mode) => {
		setMode(mode);
	};
	const handlerGameStart = (gameStart) => {
		setGameStart(gameStart);
	};
	// useEffect(() => {
	// 	console.log("---------------------------------");
	// 	console.log("Game mode:", mode);
	// 	console.log("Game start:", gameStart);
	// 	console.log("Game over:", gameOver);
	// 	console.log("Show ranking", ranking);
	// 	console.log("Points", points);
	// 	console.log("---------------------------------");
	// }, [mode, gameStart, ranking, gameOver, points]);

	useEffect(() => {
		if (points === 20) {
			setGameOver(true);
		}
	}, [points]);
	return (
		<>
			<ButtonModes
				handlerMode={handlerMode}
				$gameStart={gameStart}
			/>
			<Wrap>
				<div id="imageWrap">
					<div>
						<img
							src={`${image}`}
							alt="jajar"
						/>
					</div>
				</div>
				<div id="rulesWrap">
					<DescriptionMode
						mode={mode}
						$gameStart={gameStart}
						$gameOver={gameOver}
					/>
					{gameStart ? (
						<MainGame
							mode={mode}
							handlerLoading={handlerLoading}
							handlerImage={handlerImage}
							handlerPoints={handlerPoints}
							handlerGameOver={handlerGameOver}
						/>
					) : (
						<DescriptionModeRules
							$showRanking={ranking}
							mode={mode}
						/>
					)}
				</div>
			</Wrap>

			{!gameStart && (
				<StartGame
					gameStart={handlerGameStart}
					ranking={handlerRanking}
				/>
			)}

			{gameStart && !loading && (
				<Timer
					gameover={handlerGameOver}
					gameoverState={gameOver}
				/>
			)}

			{gameOver && (
				<GameOverMessage
					points={points}
					mode={mode}
				/>
			)}
		</>
	);
};

export default App;
