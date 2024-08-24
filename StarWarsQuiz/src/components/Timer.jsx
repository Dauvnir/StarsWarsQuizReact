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
const SaberWrap = styled.div`
	width: 100%;
	height: 5rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: 1rem;
`;

const Wrap = styled.div`
	height: 15vh;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
	margin-inline: 2rem;
	margin-top: 2rem;
`;
const Handle = styled.div`
	height: 3rem;
	margin-right: -1rem;
`;
const Saber = styled.div`
	width: calc(100% - 2rem);
	height: 1.4rem;
	border-radius: 25px;
	background-color: grey;
`;
const SaberFill = styled.div`
	height: 100%;
	background-color: white;
	border-radius: 25px;
	box-shadow: 10px 5px 15px 0px #ff0000, 0px 5px 4px 0px #ff000040 inset,
		10px -5px 15px 0px #ff0000;
	animation: ${saberAnimation} 62s linear;
	animation-play-state: ${({ $gameoverState }) =>
		$gameoverState ? "paused" : "running"};
`;
const Img = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;
const Countdown = styled.p`
	color: red;
	font-size: 2rem;
	font-weight: 600;
	margin: auto;
	text-align: center;
`;
// eslint-disable-next-line react/prop-types
const Timer = ({ gameover, gameoverState }) => {
	const [time, setTime] = useState(60); // 60 seconds

	useEffect(() => {
		if (time > 0 && gameoverState === false) {
			const timerId = setTimeout(() => setTime(time - 1), 1000);
			return () => clearTimeout(timerId); // Cleanup the timer on component unmount
		}
		if (time === 0 || gameoverState === true) gameover(true);
	}, [time, gameover, gameoverState]);

	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `Time left: ${minutes}:${
			remainingSeconds < 10 ? "0" : ""
		}${remainingSeconds}`;
	};

	return (
		<Wrap>
			<SaberWrap>
				<Handle>
					<Img src={SaberHandle} />
				</Handle>
				<Saber>
					<SaberFill $gameoverState={gameoverState} />
				</Saber>
			</SaberWrap>
			<Countdown>{formatTime(time)}</Countdown>
		</Wrap>
	);
};

Timer.propTypesropTypes = {
	gameover: PropTypes.func.isRequired,
};
export default Timer;