import axios from "axios";
import useGetRandomNumbers from "./useGetRandomNumbers";
import { useCallback } from "react";

const baseUrl = "https://swapi.dev/api/";

const useRetriveApiData = ({ mode }) => {
	const [randomArrayNumbers, randomNumbersForQuestions] = useGetRandomNumbers({
		mode,
	});
	const imageNumbers = randomArrayNumbers;

	const modeToLowerCase = mode.toLowerCase();

	const fetchData = useCallback(async () => {
		try {
			const urlsList = [];
			imageNumbers.forEach((element) => {
				urlsList.push(`${baseUrl}${modeToLowerCase}/${element}`);
			});

			if (urlsList.length > 0) {
				const listOfPromises = urlsList.map((url) => axios.get(url));

				const responseFromSwapi = await Promise.all(listOfPromises);

				const data = responseFromSwapi.map((response, index) => ({
					name: response.data.name,
					number: imageNumbers[index],
				}));

				console.log("Swapi return data:", data);

				const sortedArray = new Array(data.length);

				randomNumbersForQuestions.forEach((newIndex, i) => {
					sortedArray[newIndex - 1] = data[i];
				});
				return sortedArray;
			}
		} catch (error) {
			console.error(error);
		}
	}, [imageNumbers, modeToLowerCase, randomNumbersForQuestions]);

	return fetchData;
};

export default useRetriveApiData;
