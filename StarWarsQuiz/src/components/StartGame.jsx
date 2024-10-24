/* eslint-disable react/prop-types */
import styled from "styled-components";
import Contacts from "../../public/ui/contacts_24px.png";
import School from "../../public/ui/school_24px.png";

import { useState } from "react";

const Wrap = styled.div`
	margin: 1rem;
	margin-top: 2rem;
	height: 15svh;
	gap: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	@media (min-width: 650px) {
		flex-direction: row;
		height: 10svh;
		margin: 2rem;
	}
`;

const Button = styled.button`
	width: 100%;
	height: 5rem;
	border: none;
	cursor: pointer;
	border-radius: 10px;
	background-color: white;
	span {
		font-size: 2rem;
	}
	img {
		width: 24px;
		height: 24px;
		margin-right: 1rem;
	}
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
