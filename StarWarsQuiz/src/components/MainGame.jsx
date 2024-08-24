/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import useRetriveApiData from "../hooks/useRetriveApiData";
const Wrap = styled.div`
	height: 85%;
	width: 100%;
	overflow: visible;
`;
const Question = styled.div`
	display: grid;
	grid-template-columns: 1fr 1fr;
	grid-template-rows: 1fr 1fr;
	gap: 1rem;
	width: 100%;
	height: 12.5rem;
	margin-top: 1rem;
	@media (min-width: 650px) {
		height: 100%;
	}
`;
const Button = styled.button`
	width: 100%;
	height: 100%;
	justify-self: center;
	align-self: center;
	cursor: pointer;
	border: none;
	border-radius: 10px;
	color: black;
	font-size: 1.25rem;
	@media (min-width: 650px) {
		height: 60%;
	}
	background-color: ${({ $isCorrect, $isClicked }) =>
		$isClicked ? ($isCorrect ? "#41ED25" : "#FF0000") : "white"};
	box-shadow: ${({ $isCorrect, $isClicked }) =>
		$isClicked
			? $isCorrect
				? "0px 4px 30px 0px #51FC00, 0px 4px 4px 0px #00000040"
				: "0px 4px 30px 0px #FF0000, 0px 4px 4px 0px #00000040"
			: "none"};
	transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
`;

const Image = styled.div`
	height: 60%;
	display: flex;
	justify-content: center;
	margin-inline: auto;
	img {
		width: auto;
		max-height: 100%;
		object-fit: contain;
		box-shadow: 4px 4px 40px 0px #ff0000e5, 0px 4px 4px 0px #00000040;
		border-radius: 10px;
	}
	@media (min-width: 650px) {
		display: none;
	}
`;
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));

		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}

const MainGame = ({
	mode,
	handlerLoading,
	handlerImage,
	handlerPoints,
	handlerGameOver,
}) => {
	const [correctAnswers, setCorrectAnswers] = useState([]);
	const [loading, setLoading] = useState();
	const [nextQuestion, setNextQuestion] = useState(0);
	const [image, setImage] = useState(null);
	const [fourQuestions, setFourQuestions] = useState([]);
	const [clickedButton, setClickedButton] = useState(null);

	const data = useRetriveApiData({ mode });
	const modeToLowerCase = mode.toLowerCase();

	const handlerNextQuestion = (question, index) => {
		if (question === correctAnswers[nextQuestion].name)
			handlerPoints((prev) => prev + 1);

		setClickedButton(index);
		setTimeout(() => {
			setNextQuestion((prev) => prev + 1);
			setClickedButton(null);
		}, 1000);
		if (nextQuestion === 19) {
			handlerGameOver(true);
		}
	};
	const getRandomIndex = () => Math.floor(Math.random() * 19) + 1;

	useEffect(() => {
		const returnData = async () => {
			try {
				setLoading(true);
				const response = await data();
				setCorrectAnswers(response);
				console.log(response);
			} catch (error) {
				console.error("Error while fetching data from custom hook", error);
			} finally {
				setLoading(false);
				handlerLoading(false);
			}
		};
		returnData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	useEffect(() => {
		if (
			correctAnswers &&
			correctAnswers.length > 0 &&
			nextQuestion < correctAnswers.length
		) {
			setImage(correctAnswers[nextQuestion]?.number || null);
			handlerImage(
				`/modes/${modeToLowerCase}/${correctAnswers[nextQuestion]?.number}.jpg`
			);

			const questions = new Set();
			const index = new Set();
			questions.add(correctAnswers[nextQuestion]?.name);

			do {
				let number = getRandomIndex();
				if (number !== nextQuestion) {
					index.add(number);
				}
			} while (index.size < 3);

			const arrayIndex = Array.from(index);

			console.log(arrayIndex);

			arrayIndex.forEach((index) => {
				const element = correctAnswers[index];
				if (element?.name) {
					questions.add(element.name);
				}
			});

			const shuffledArray = shuffleArray(Array.from(questions));

			setFourQuestions(shuffledArray);
			console.log(shuffledArray);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [nextQuestion, correctAnswers]);

	return (
		<>
			{loading ? (
				<div className="lds-spinner">
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
					<div></div>
				</div>
			) : (
				<Wrap>
					<Image>
						<img src={`/modes/${modeToLowerCase}/${image}.jpg`} alt="image" />
					</Image>
					<Question>
						{fourQuestions.length > 0 &&
							fourQuestions.map((question, i) => (
								<Button
									key={i}
									$isCorrect={
										clickedButton === i &&
										question === correctAnswers[nextQuestion].name
									}
									$isClicked={clickedButton === i}
									onClick={() => handlerNextQuestion(question, i)}>
									{question}
								</Button>
							))}
					</Question>
				</Wrap>
			)}
		</>
	);
};

export default MainGame;
