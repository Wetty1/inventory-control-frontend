/**
 * Converts a dollar value to Brazilian Real (BRL) format.
 *
 * @param {string} value - The dollar value to be converted.
 * @return {string} The converted value in BRL format.
 */
export function dollarToBRL(value) {
	const result = value.replace("$", "R$ ").replace(".", ",");
	return result;
}
