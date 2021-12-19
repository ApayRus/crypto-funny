const invertSymbolCase = symbol => {
	// works for letters
	return symbol === symbol.toUpperCase()
		? symbol.toLowerCase()
		: symbol.toUpperCase()
}

export const invertStringCase = string => {
	return string
		.split('')
		.map(symbol => invertSymbolCase(symbol))
		.join('')
}

export const reverseString = string => {
	return string.split('').reverse().join('')
}

/**
 * 
multiplicity(20, 10) // 2
2
 */
export const multiplicity = (n1, n2) => Math.trunc(n1 / n2)

export const shift = (string, number) => {
	// shift('ABCDEFG', 3) => 'DEFGABC'

	const mult = Math.abs(multiplicity(number, string.length))
	const delta = Math.abs(number) - mult * string.length
	const num = number >= 0 ? delta : string.length - delta
	const part1 = string.substr(0, num)
	const part2 = string.substr(num, string.length)
	return `${part2}${part1}`
}

export const shuffle = array => [...array].sort(() => 0.5 - Math.random())

export const sample = (array, count) => {
	let mult = multiplicity(count, array.length)
	const fullArray = Array(mult).fill(array).flat() // it's expanded if count > array.length
	const restNum = count - array.length * mult
	const restArray = shuffle(array).slice(0, restNum)
	return shuffle([...fullArray, ...restArray])
}
