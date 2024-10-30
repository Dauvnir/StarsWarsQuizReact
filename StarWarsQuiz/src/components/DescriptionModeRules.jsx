import styled from "styled-components";
import Contacts from "../../public/ui/contacts_24px.png";
import School from "../../public/ui/school_24px.png";
import { useEffect, useState } from "react";

const Description = styled.div`
	background-color: white;

	border-radius: 10px;

	padding: 1rem;

	width: 100%;
	height: 100%;

	display: flex;
	justify-content: start;
	align-items: center;
	flex-direction: column;

	flex-grow: 1;
	#div1 {
		width: 100%;

		display: flex;
		justify-content: center;
		align-items: center;

		gap: 0.5rem;

		white-space: nowrap;

		overflow: hidden;

		h1 {
			font-size: clamp(1.5rem, 1.5rem + 1vw, 3rem);
		}

		img {
			margin-right: 0.5rem;

			height: 32px;
			width: 32px;
			@media (orientation: landscape) {
				height: auto;
				width: auto;
			}
		}
	}
	#div2 {
		width: 100%;
		height: 100%;

		overflow: hidden;

		span {
			font-size: clamp(1.2rem, 0.35rem + 1vw, 1.4rem);
			font-weight: 500;
			line-height: clamp(1.25rem, 1.25rem + 1vw, 3rem);
		}

		div {
			height: 100%;
			width: 100%;
			grid-area: main;
			display: grid;
			grid-template-columns: 15% 42.5% 42.5%;
			grid-template-rows: auto 1fr;
			grid-template-areas:
				"header1 header2 header3"
				"main main main";

			#header1 {
				grid-area: header1;
				text-align: center;
			}
			#header2 {
				grid-area: header2;
				text-align: center;
			}
			#header3 {
				grid-area: header3;
				text-align: center;
			}

			#main {
				grid-area: main;
				display: grid;
				grid-template-columns: 15% 42.5% 42.5%;
				grid-template-rows: repeat(4, 1fr); /* Two rows for child components */
				grid-template-areas:
					"child1 child11 child111"
					"child2 child22 child222"
					"child3 child33 child333"
					"child4 child44 child444";
				#child1 {
					grid-area: child1;
					text-align: center;
				}
				#child11 {
					grid-area: child11;
					text-align: center;
				}
				#child111 {
					grid-area: child111;
					text-align: center;
				}
				#child2 {
					grid-area: child2;
					text-align: center;
				}
				#child22 {
					grid-area: child22;
					text-align: center;
				}
				#child222 {
					grid-area: child222;
					text-align: center;
				}
				#child3 {
					grid-area: child3;
					text-align: center;
				}
				#child33 {
					grid-area: child33;
					text-align: center;
				}
				#child333 {
					grid-area: child333;
					text-align: center;
				}
				#child4 {
					grid-area: child4;
					text-align: center;
				}
				#child44 {
					grid-area: child44;
					text-align: center;
				}
				#child444 {
					grid-area: child444;
					text-align: center;
				}
			}
		}
	}
`;

// eslint-disable-next-line react/prop-types
const DescriptionModeRules = ({ $showRanking, mode }) => {
	const [data, setData] = useState({});
	const [filteredData, setFilteredData] = useState([]);
	useEffect(() => {
		const loadData = () => {
			let allData = {};
			for (let i = 0; i < localStorage.length; i++) {
				let key = localStorage.key(i);
				let value = localStorage.getItem(key);
				try {
					allData[key] = JSON.parse(value);
				} catch (error) {
					continue;
				}
			}
			setData(allData);
		};

		loadData();

		const handleStorageChange = () => {
			loadData();
		};

		window.addEventListener("storage", handleStorageChange);

		return () => {
			window.removeEventListener("storage", handleStorageChange);
		};
	}, []);

	useEffect(() => {
		// console.log("Original data:", data);

		const arrayOfObjects = Object.entries(data).map(([key, value]) => {
			return { id: key, ...value };
		});

		const sortedArrayByNameAndValue = arrayOfObjects.sort((a, b) => {
			if (a.points === b.points) {
				return a.mode.localeCompare(b.mode);
			}
			return b.points - a.points;
		});
		const limitedArray = sortedArrayByNameAndValue
			.filter((obj) => obj.mode === mode)
			.slice(0, 4);
		// console.log("Sorted by mode", sortedArrayByNameAndValue);
		// console.log("Sorted by actual mode and limited to 4", limitedArray);
		setFilteredData(limitedArray);
	}, [data, mode]);
	return (
		<Description>
			<div id="div1">
				{$showRanking ? (
					<>
						<img
							src={Contacts}
							alt="icon"
						/>
						<h1>Hall of fame</h1>
					</>
				) : (
					<>
						<img
							src={School}
							alt="icon"
						/>
						<h1>Mode Rules</h1>
					</>
				)}
			</div>
			<div id="div2">
				{$showRanking ? (
					<div>
						<span id="header1">Place</span>
						<span id="header2">Player</span>
						<span id="header3">Answered</span>
						<div id="main">
							<span id="child1">1.</span>
							<span id="child11">
								{filteredData[0]?.player.length > 12
									? filteredData[0].player.substring(0, 12) + "..."
									: filteredData[0]?.player}
							</span>
							<span id="child111">
								{filteredData[0]?.points !== undefined &&
									`${filteredData[0].points}/20`}
							</span>
							<span id="child2">2.</span>
							<span id="child22">
								{filteredData[1]?.player.length > 12
									? filteredData[1].player.substring(0, 12) + "..."
									: filteredData[1]?.player}
							</span>
							<span id="child222">
								{filteredData[1]?.points !== undefined &&
									`${filteredData[1].points}/20`}
							</span>
							<span id="child3">3.</span>
							<span id="child33">
								{filteredData[2]?.player.length > 12
									? filteredData[2].player.substring(0, 12) + "..."
									: filteredData[2]?.player}
							</span>
							<span id="child333">
								{filteredData[2]?.points !== undefined &&
									`${filteredData[2].points}/20`}
							</span>
							<span id="child4">4.</span>
							<span id="child44">
								{filteredData[3]?.player.length > 12
									? filteredData[3].player.substring(0, 12) + "..."
									: filteredData[3]?.player}
							</span>
							<span id="child444">
								{filteredData[3]?.points !== undefined &&
									`${filteredData[3].points}/20`}
							</span>
						</div>
					</div>
				) : (
					<span>
						You have one minute (1m) to answer as many questions as possible.
						During the game on each question you need to select who from Star
						Wars is showed for example Jar Jar Binks from available options.
					</span>
				)}
			</div>
		</Description>
	);
};

export default DescriptionModeRules;
