/* eslint-disable react/prop-types */
import styled from "styled-components";
const ModeDescription = styled.div`
	pointer-events: ${({ $gameOver }) => ($gameOver ? "none" : "auto")};

	width: 100%;
	min-height: 20%;

	background-color: white;
	box-shadow: 4px 4px 20px 0px #ff0000e5, 0px 4px 4px 0px #00000040,
		4px 5px 4px 0px #00000080 inset;
	border-radius: 10px;

	padding: 1rem 0 1rem 1rem;

	overflow: hidden;

	margin-bottom: 1rem;

	display: flex;
	justify-content: left;
	align-items: center;

	span {
		white-space: nowrap;

		font-size: clamp(1rem, 1rem + 1vw, 1.4rem);
		@media (orientation: landscape) {
			font-size: clamp(0.75rem, 0.75rem + 1vw, 1.4rem);
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
		<ModeDescription $gameOver={$gameOver}>
			{$gameStart ? (
				<span>Question : {title}</span>
			) : (
				<span>MODE: {title}</span>
			)}
		</ModeDescription>
	);
};

export default DescriptionMode;
