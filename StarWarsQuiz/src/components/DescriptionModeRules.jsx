import styled from "styled-components";
import Contacts from "../../public/ui/contacts_24px.png";
import School from "../../public/ui/school_24px.png";

const Description = styled.div`
	height: 85%;
	width: 100%;
	padding: 1rem;
	border-radius: 10px;
	background-color: white;
	#div1 {
		text-align: center;
		display: flex;
		justify-content: center;
		height: 10%;

		h1 {
			height: auto;
			@media (min-width: 800px) {
				font-size: 2.2rem;
			}
		}
		img {
			margin-top: 6px;
			margin-right: 0.5rem;
			height: 24px;
			width: 24px;
			@media (min-width: 800px) {
				height: 2rem;
				width: 2rem;
			}
		}
	}
	#div2 {
		margin-top: 1rem;
		height: 90%;
		width: 100%;
		span {
			text-align: left;
			font-size: 1.5rem;
			font-weight: 500;
			line-height: 1.8rem;
			@media (min-width: 500px) {
				font-size: 1.5rem;
			}
			@media (min-width: 800px) {
				font-size: 1.75rem;
			}
			@media (min-width: 1000px) {
				font-size: 2rem;
				line-height: 2.5rem;
			}
		}
		div {
			height: 100%;
			width: 100%;
			grid-area: main;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: auto 1fr;
			gap: 1rem;
			grid-template-areas:
				"header1 header2 header3"
				"main main main";

			#header1 {
				grid-area: header1;
			}
			#header2 {
				grid-area: header2;
			}
			#header3 {
				grid-area: header3;
			}

			#main {
				grid-area: main;
				display: grid;
				grid-template-columns: repeat(3, 1fr);
				grid-template-rows: repeat(4, 1fr); /* Two rows for child components */
				grid-template-areas:
					"child1 child11 child111"
					"child2 child22 child222"
					"child3 child33 child333"
					"child4 child44 child444";
				#child1 {
					grid-area: child1;
				}
				#child2 {
					grid-area: child2;
				}
				#child3 {
					grid-area: child3;
				}
				#child4 {
					grid-area: child4;
				}
			}
		}
	}

	@media (max-width: 650px) {
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
	}
`;

// eslint-disable-next-line react/prop-types
const DescriptionModeRules = ({ $showRanking }) => {
	return (
		<Description>
			<div id="div1">
				{$showRanking ? (
					<>
						<img src={Contacts} alt="icon" />
						<h1>Hall of fame</h1>
					</>
				) : (
					<>
						<img src={School} alt="icon" />
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
							<span id="child2">2.</span>
							<span id="child3">3.</span>
							<span id="child4">4.</span>
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
