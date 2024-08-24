import styled from "styled-components";
import yoda from "../../public/ui/MasterYodaLeft.png";
import jajar from "../../public/ui/jajar.jpg";

const Wrap = styled.div`
	min-height: 30rem;
	width: clamp(20rem, 60%, 45rem);
	background-color: white;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	flex-direction: column;
	position: absolute;
	z-index: 2;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	border-radius: 10px;
	box-shadow: 4px 4px 40px 0px #ff0000e5, 0px 4px 4px 0px #00000040;
	color: black;
`;

const Title = styled.h2`
	width: 100%;
	height: auto;
	margin: 0;
	text-align: center;
	padding-block: 0.25rem;
	@media (min-width: 800px) {
		font-size: 2rem;
	}
`;

const Message = styled.p`
	margin: 0;
	padding-inline: 0.5rem;
	height: auto;
	@media (min-width: 800px) {
		font-size: 1.3rem;
	}
`;

const ScoreTableYoda = styled.div`
	width: 100%;
	height: 15rem;
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: row;
	margin-top: 1rem;
`;
const ImageWrapper = styled.div`
	height: 100%;
	width: 35%;
	margin-left: 1rem;
`;
const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const ScoreTable = styled.div`
	width: 100%;
	height: 100%;
	display: grid;
	grid-template-columns: repeat(4, 1fr);
	grid-auto-rows: auto;
	grid-template-areas: "none title1 title2 title3";
	grid-row-gap: 1rem;
	grid-column-gap: 0.25rem;
	overflow: scroll;
	margin-inline: 0.5rem;
`;

const TableHeader = styled.h3`
	margin: 0;
	text-align: center;
`;
const Header1 = styled(TableHeader)`
	grid-area: title1;
`;
const Header2 = styled(TableHeader)`
	grid-area: title2;
`;
const Header3 = styled(TableHeader)`
	grid-area: title3;
`;

const Answer = styled.div`
	display: contents;
	text-align: center;
`;

const ImageWrapper2 = styled.div`
	width: 80%;
	height: auto;
	display: flex;
	margin: auto;
`;

const Image2 = styled(Image)`
	width: 100%;
	height: 100%;
	border-radius: 10px;
	box-shadow: 0px 0px 10px 2px #ff0000e5, 0px 4px 4px 0px #00000040;
`;

const Span = styled.span`
	margin: auto;
`;
const Wrapper = styled.div`
	width: 100%;
	height: 10rem;
	display: flex;
	justify-content: center;
	align-items: flex-end;
	flex-direction: row;
	margin-top: 1rem;
`;

const Message2 = styled(Message)`
	width: 50%;
	margin: auto;
	font-weight: 500;
`;
const Form = styled.form`
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	width: 100%;
	height: 8rem;
	margin-bottom: 1rem;
	margin-top: -6px;
`;
const Input = styled.input`
	border-radius: 10px;
	background-color: white;
	height: 3rem;
	width: calc(100% - 2rem);
	margin: 0 auto 1rem 0.5rem;
	border: 2px solid grey;
	padding-inline: 0.5rem;
	font-size: 1.5rem;
	color: black;
	&:focus {
		outline: none; /* Remove outline when focused */
	}
`;
const Submit = styled.button`
	border-radius: 10px;
	background-color: red;
	height: 3rem;
	width: 80%;
	padding-inline: 0.5rem;
	font-size: 1.25rem;
	font-weight: 600;
	color: white;
	box-shadow: 4px 4px 40px 0px #ff0000e5, 0px 4px 4px 0px #00000040;
	text-align: center;
	cursor: pointer;
	border: none;
`;
// eslint-disable-next-line react/prop-types
const GameOverMessage = ({ points, mode }) => {
	const handlerSubmit = (e) => {
		e.preventDefault();
		const form = e.target;
		const nickname = form.elements.Nickname.value;
		let newKey = `Player_${nickname}_${mode}`;
		const object = {
			player: nickname,
			points: points,
			mode: mode,
		};
		localStorage.setItem(newKey, JSON.stringify(object));
		console.log(`Nickname: ${newKey}, obj: ${JSON.stringify(object)}`);
	};
	return (
		<Wrap>
			<Title>Game Over</Title>
			<Message>
				The force is strong in you young Padawan! During 1 minute you have
				answered {points} / 20 questions. And Computer quessed 5 / 23.
			</Message>
			<ScoreTableYoda>
				<ScoreTable>
					<span></span>
					<Header1>You</Header1>
					<Header2>Computer</Header2>
					<Header3>Answer</Header3>
					<Answer>
						<ImageWrapper2>
							<Image2 src={jajar} alt="jajar" />
						</ImageWrapper2>
						<Span>Darth Vader</Span>
						<Span>Darth Father</Span>
						<Span>Darth Vader</Span>
					</Answer>
					<Answer>
						<ImageWrapper2>
							<Image2 src={jajar} alt="jajar" />
						</ImageWrapper2>
						<Span>Darth Vader</Span>
						<Span>Darth Father</Span>
						<Span>Darth Vader</Span>
					</Answer>
				</ScoreTable>
			</ScoreTableYoda>
			<Wrapper>
				<ImageWrapper>
					<Image src={yoda} alt="yoda" />
				</ImageWrapper>
				<Message2>
					Please fill your name in order to receive eternal glory in whole
					Galaxy!
				</Message2>
			</Wrapper>
			<Form onSubmit={handlerSubmit}>
				<Input type="text" name="Nickname" placeholder="Your name" required />
				<Submit type="submit">MAY THE FORCE BE WITH YOU!</Submit>
			</Form>
		</Wrap>
	);
};

export default GameOverMessage;