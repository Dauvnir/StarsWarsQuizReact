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

const Image = styled.div`
	display: none;
	height: 100%;
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
		box-shadow: 4px 4px 40px 0px #ff0000e5, 0px 4px 4px 0px #00000040;
		border-radius: 10px;
	}
	@media (min-width: 650px) {
		display: block;
	}
`;

const Wrap = styled.div`
	display: flex;
	flex-direction: row;
	width: calc(100vw - 2rem);
	height: 55vh;
	align-items: center;
	margin-inline: 1rem;
	@media (min-width: 1000px) {
		margin-inline: 2rem;
		width: calc(100vw - 4rem);
	}
`;
const WrapRules = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	flex-direction: column;
	align-items: center;
	gap: 1rem;
	@media (min-width: 650px) {
		width: 50%;
	}
	@media (min-width: 1000px) {
		width: 65%;
	}
`;
const WrapImage = styled.div`
	height: 100%;
	width: 35%;
	display: flex;
	justify-content: center;
	align-items: center;
	padding-inline: 1rem;
	gap: 1rem;
	@media (max-width: 650px) {
		display: none;
	}
	@media (max-width: 1000px) {
		width: 50%;
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
	useEffect(() => {
		console.log("---------------------------------");
		console.log("Game mode:", mode);
		console.log("Game start:", gameStart);
		console.log("Game over:", gameOver);
		console.log("Show ranking", ranking);
		console.log("Points", points);
		console.log("---------------------------------");
	}, [mode, gameStart, ranking, gameOver, points]);

	useEffect(() => {
		if (points === 20) {
			setGameOver(true);
		}
	}, [points]);
	return (
		<>
			<ButtonModes handlerMode={handlerMode} $gameStart={gameStart} />
			<Wrap>
				<WrapImage>
					<Image>
						<img src={`${image}`} alt="jajar" />
					</Image>
				</WrapImage>
				<WrapRules>
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
						<DescriptionModeRules $showRanking={ranking} />
					)}
				</WrapRules>
			</Wrap>

			{gameStart && !loading && (
				<Timer gameover={handlerGameOver} gameoverState={gameOver} />
			)}
			{!gameStart && (
				<StartGame gameStart={handlerGameStart} ranking={handlerRanking} />
			)}
			{gameOver && <GameOverMessage points={points} mode={mode} />}
		</>
	);
};

export default App;
