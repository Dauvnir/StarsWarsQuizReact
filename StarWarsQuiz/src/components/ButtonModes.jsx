/* eslint-disable react/prop-types */
import styled from "styled-components";
import StarWarsLogo from "../../public/ui/StarWarsLogo.png";
import { useState } from "react";
const Wrap = styled.div`
	height: 13rem;
	width: 100%;
	padding: 1rem 1rem 0 1rem;

	display: flex;
	align-items: center;
	justify-content: center;

	flex-direction: column;
	@media (orientation: landscape) {
		flex-direction: row;
	}
	#logoWrap {
		height: 70%;
		width: 100%;
		@media (orientation: landscape) {
			height: 100%;
		}
		img {
			width: 100%;
			height: 100%;

			object-fit: contain;
		}
	}

	#modes {
		height: auto;
		width: 100%;

		border-radius: 10px;
		box-shadow: 4px 4px 40px 0px #ff0000e5, 0px 4px 4px 0px #00000040;
	}
`;

const Button = styled.button`
	width: calc(100% / 3);
	height: 100%;

	padding-block: 1rem;

	background-color: white;
	border: none;

	cursor: pointer;
	pointer-events: ${({ $gameStart }) => ($gameStart ? "none" : "auto")};

	span {
		color: black;

		font-size: clamp(1rem, 1rem + 1vw, 2rem);
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
			<div id="logoWrap">
				<img
					src={StarWarsLogo}
					alt="starwars"
				/>
			</div>
			<div id="modes">
				<Button
					style={{ borderRadius: "10px 0px 0px 10px" }}
					onClick={() => handler("People")}
					$active={mode === "People"}
					$gameStart={$gameStart}
				>
					<span style={{ color: mode === "People" ? "black" : "gray" }}>
						People
					</span>
				</Button>
				<Button
					$active={mode === "Vehicles"}
					onClick={() => handler("Vehicles")}
					$gameStart={$gameStart}
				>
					<span style={{ color: mode === "Vehicles" ? "black" : "gray" }}>
						Vehicles
					</span>
				</Button>
				<Button
					style={{ borderRadius: "0px 10px 10px 0px" }}
					$active={mode === "Starships"}
					onClick={() => handler("Starships")}
					$gameStart={$gameStart}
				>
					<span style={{ color: mode === "Starships" ? "black" : "gray" }}>
						Starships
					</span>
				</Button>
			</div>
		</Wrap>
	);
};

export default ButtonModes;
