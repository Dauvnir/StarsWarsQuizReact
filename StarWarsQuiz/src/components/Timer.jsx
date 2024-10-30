import styled, { keyframes } from "styled-components";
import SaberHandle from "../../public/ui/LightsaberHandle.png";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const saberAnimation = keyframes`
	from {
		width: 100%;
	}
	to {
		width: 0%;
	}
`;

const Wrap = styled.div`
	height: auto;

	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;

	margin-inline: 2rem;

	#saber {
		width: 100%;
		height: auto;

		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;

		#handle {
			height: 3rem;

			margin-right: -1rem;

			img {
				width: 100%;
				height: 100%;

				object-fit: contain;
			}
		}
		#laser {
			width: calc(100% - 2rem);
			height: 1.4rem;

			border-radius: 25px;
			background-color: grey;
		}
	}

	p {
		color: red;
		font-size: 1.5rem;
		font-weight: 600;

		margin: auto;

		text-align: center;
	}
`;

const SaberFill = styled.div`
	height: 100%;

	background-color: white;
	border-radius: 25px;

	box-shadow: 10px 5px 15px 0px #ff0000, 0px 5px 4px 0px #ff000040 inset,
		10px -5px 15px 0px #ff0000;
	transition: width 0.1s linear;
	animation: ${saberAnimation} 60s linear;
	animation-play-state: ${({ $gameoverState }) =>
		$gameoverState ? "paused" : "running"};
`;

// eslint-disable-next-line react/prop-types
const Timer = ({ gameover, gameoverState }) => {
	const [time, setTime] = useState(60); // 60 seconds
	const [width, setWidth] = useState(100);
	useEffect(() => {
		if (time > 0 && gameoverState === false) {
			const timerId = setInterval(() => {
				setTime((prevTime) => {
					const newTime = prevTime - 0.1;
					setWidth((newTime / 60) * 100); // Update width based on remaining time
					return newTime;
				});
			}, 100);
			return () => clearTimeout(timerId); // Cleanup the timer on component unmount
		}
		if (time <= 0 || gameoverState) {
			gameover(true);
			setWidth(0);
			setTime(0);
		}
	}, [time, gameover, gameoverState]);

	const formatTime = (seconds) => {
		const roundSeconds = Math.floor(seconds);
		const minutes = Math.floor(roundSeconds / 60);
		const remainingSeconds = roundSeconds % 60;
		return `Time left: ${minutes}:${
			remainingSeconds < 10 ? "0" : ""
		}${remainingSeconds}`;
	};

	return (
		<Wrap>
			<div id="saber">
				<div id="handle">
					<img src={SaberHandle} />
				</div>
				<div id="laser">
					<SaberFill
						$gameoverState={gameoverState}
						style={{ width: `${width}%` }}
					/>
				</div>
			</div>
			<p>{formatTime(time)}</p>
		</Wrap>
	);
};

Timer.propTypes = {
	gameover: PropTypes.func.isRequired,
};
export default Timer;
