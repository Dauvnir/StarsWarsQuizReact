/* eslint-disable react/prop-types */
import styled from "styled-components";
import Contacts from "../../public/ui/contacts_24px.png";
import School from "../../public/ui/school_24px.png";

import { useState } from "react";

const Wrap = styled.div`
	height: 20%;
	width: 100%;

	padding: 0 1rem 1rem 1rem;
	gap: 1rem;

	display: flex;
	justify-content: center;
	align-items: center;

	flex-direction: column;
	@media (orientation: landscape) {
		flex-direction: row;
	}

	button {
		width: 100%;
		height: auto;

		cursor: pointer;

		border: none;
		border-radius: 10px;

		display: flex;
		justify-content: center;
		align-items: center;

		padding-block: 0.5rem;

		font-size: clamp(1.5rem, 1rem + 1vw, 2rem);

		img {
			margin-right: 0.5rem;
			width: 1.5rem;
			height: 1.5rem;
		}
	}
`;

const Button = styled.button`
	/* width: 100%;
	height: 5rem;
	border: none;
	cursor: pointer;
	border-radius: 10px;
	background-color: white;
	display: flex;
	justify-content: center;
	align-items: center;
	span {
		font-size: clamp(2rem, 1.5rem + 1vw, 3.5rem);
	}
	img {
		width: 24px;
		height: 24px;
		margin-right: 1rem;
		@media (min-width: 650px) {
			width: 32px;
			height: 32px;
		}
	} */
`;
const Start = styled(Button)`
	box-shadow: 4px 4px 40px 0px #ff0000e5, 0px 4px 4px 0px #00000040;
	color: white;
	background-color: red;
`;
const StartGame = ({ gameStart, ranking }) => {
	const [showRanking, setShowRanking] = useState(false);
	const handlerShowRanking = () => {
		ranking((prev) => !prev);
		setShowRanking((prev) => !prev);
	};
	return (
		<Wrap>
			<Button onClick={handlerShowRanking}>
				{showRanking ? (
					<>
						<img
							src={School}
							alt="contacts"
						/>
						<span>Rules</span>
					</>
				) : (
					<>
						<img
							src={Contacts}
							alt="contacts"
						/>
						<span>Hall of fame</span>
					</>
				)}
			</Button>
			<Start onClick={() => gameStart(true)}>
				<span>PLAY THE GAME</span>
			</Start>
		</Wrap>
	);
};

export default StartGame;
