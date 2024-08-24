/* eslint-disable react/prop-types */
import styled from "styled-components";
import StarWarsLogo from "../../public/ui/StarWarsLogo.png";
import { useState } from "react";
const Wrap = styled.div`
	height: 25vh;
	margin: 1rem;
	display: flex;
	align-items: center;
	flex-direction: column;
	@media (min-width: 650px) {
		flex-direction: row;
		height: 18vh;
	}
	@media (min-width: 1000px) {
		margin-inline: 2rem;
		height: 25vh;
	}
`;

const Logo = styled.div`
	height: 70%;
	width: 100%;
	@media (min-width: 650px) {
		height: 100%;
		width: 35%;
	}
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;
const Modes = styled.div`
	height: 30%;
	width: 100%;
	border-radius: 10px;
	box-shadow: 4px 4px 40px 0px #ff0000e5, 0px 4px 4px 0px #00000040;
	@media (min-width: 650px) {
		height: 50%;
		width: 65%;
	}
`;

const Button = styled.button`
	background-color: white;
	width: calc(100% / 3);
	height: 100%;
	border: none;
	cursor: pointer;
	pointer-events: ${({ $gameStart }) => ($gameStart ? "none" : "auto")};
	span {
		color: black;
		font-size: 1.4rem;
		font-weight: 500;
		border-bottom: ${({ $active }) => ($active ? "6px solid red" : "none")};
		position: relative;
		${({ $active }) =>
			$active &&
			`
        &::after {
            content: "";
            position: absolute;
            left: 0;
            right: 0;
            bottom: -4px;
            height: 4px;
            box-shadow: 0 1px 5px 2px #ff0000;
            border-radius: inherit;
        }
    `}
		@media (min-width: 700px) {
			font-size: 1.9rem;
		}
		@media (min-width: 1000px) {
			font-size: 2.2rem;
		}
	}
`;
// eslint-disable-next-line no-unused-vars
const ButtonModes = ({ handlerMode, $gameStart }) => {
	const [mode, setMode] = useState("People");
	const handler = (mode) => {
		setMode(mode);
		handlerMode(mode);
	};

	return (
		<Wrap>
			<Logo>
				<Image src={StarWarsLogo} alt="starwars" />
			</Logo>
			<Modes>
				<Button
					style={{ borderRadius: "10px 0px 0px 10px" }}
					onClick={() => handler("People")}
					$active={mode === "People"}
					$gameStart={$gameStart}>
					<span style={{ color: mode === "People" ? "black" : "gray" }}>
						People
					</span>
				</Button>
				<Button
					$active={mode === "Vehicles"}
					onClick={() => handler("Vehicles")}
					$gameStart={$gameStart}>
					<span style={{ color: mode === "Vehicles" ? "black" : "gray" }}>
						Vehicles
					</span>
				</Button>
				<Button
					style={{ borderRadius: "0px 10px 10px 0px" }}
					$active={mode === "Starships"}
					onClick={() => handler("Starships")}
					$gameStart={$gameStart}>
					<span style={{ color: mode === "Starships" ? "black" : "gray" }}>
						Starships
					</span>
				</Button>
			</Modes>
		</Wrap>
	);
};

export default ButtonModes;
