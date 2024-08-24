/* eslint-disable react/prop-types */
import styled from "styled-components";
const ModeDescription = styled.div`
	pointer-events: ${({ $gameOver }) => ($gameOver ? "none" : "auto")};
	height: 15%;
	width: 100%;
`;

const Mode = styled.div`
	height: 100%;
	width: 100%;
	border-radius: 10px;
	background-color: white;
	box-shadow: 4px 4px 20px 0px #ff0000e5, 0px 4px 4px 0px #00000040,
		4px 5px 4px 0px #00000080 inset;
	text-align: center;
	display: flex;
	span {
		color: black;
		font-size: 1.4rem;
		font-weight: 500;
		margin: auto;
		@media (min-width: 850px) {
			font-size: 1.75rem;
		}
		@media (min-width: 1100px) {
			font-size: 2.2rem;
		}
	}
`;

const titles = [
	"Who is this character?",
	"What vehicles is this?",
	"What starship is this?",
];

const DescriptionMode = ({ mode, $gameStart, $gameOver }) => {
	let title;
	switch (mode) {
		case "People":
			title = titles[0];
			break;
		case "Vehicles":
			title = titles[1];
			break;
		case "Starships":
			title = titles[2];
			break;
		default:
			title = titles[0];
	}
	return (
		<>
			<ModeDescription $gameOver={$gameOver}>
				<Mode>
					{$gameStart ? (
						<span>Question : {title}</span>
					) : (
						<span>MODE: {title}</span>
					)}
				</Mode>
			</ModeDescription>
		</>
	);
};

export default DescriptionMode;
