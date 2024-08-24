import { useEffect, useMemo, useState } from "react";

const useGetRandomNumbers = ({ mode }) => {
	const getRandomNumber = () => Math.floor(Math.random() * 88) + 1;
	const getRandomNumberMax20 = () => Math.floor(Math.random() * 20) + 1;
	const starshipNumbers = useMemo(
		() => [
			5, 9, 10, 11, 12, 13, 15, 21, 22, 23, 27, 28, 29, 31, 39, 40, 41, 43, 47,
			48,
		],
		[]
	);
	const vehiclesNumbers = useMemo(
		() => [
			4, 6, 7, 8, 14, 16, 18, 19, 20, 24, 25, 26, 30, 33, 34, 35, 36, 37, 38,
			42,
		],
		[]
	);

	const [randomArrayNumbers, setRandomArrayNumbers] = useState([]);
	const [randomNumbersForQuestions, setRandomNumbersForQuestions] = useState(
		[]
	);

	useEffect(() => {
		const excludedNumbers = new Set([17, 84, 85, 86, 87, 88]); //causing 404 error
		const tempRandomArrayNumbers = new Set();
		const tempRandomNumbersForQuestions = new Set();

		if (mode === undefined) {
			throw new Error("Mode is undefined");
		}

		switch (mode) {
			case "People":
				while (tempRandomArrayNumbers.size < 20) {
					const rNumber = getRandomNumber();
					if (excludedNumbers.has(rNumber)) {
						continue;
					}
					tempRandomArrayNumbers.add(rNumber);
				}
				break;
			case "Starships":
				for (const number of starshipNumbers) {
					tempRandomArrayNumbers.add(number);
				}
				break;
			case "Vehicles":
				for (const number of vehiclesNumbers) {
					tempRandomArrayNumbers.add(number);
				}
				break;
			default:
				break;
		}
		while (tempRandomNumbersForQuestions.size < 20) {
			const rNumber = getRandomNumberMax20();
			tempRandomNumbersForQuestions.add(rNumber);
		}
		setRandomArrayNumbers(Array.from(tempRandomArrayNumbers));
		setRandomNumbersForQuestions(Array.from(tempRandomNumbersForQuestions));
	}, [mode, starshipNumbers, vehiclesNumbers]);

	return [randomArrayNumbers, randomNumbersForQuestions];
};

export default useGetRandomNumbers;
