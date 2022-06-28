function descendingComparator(a, b, orderBy) {
	const myArray = orderBy.split(".");
	for (let i = 0; i < myArray.length; i++) {
		b = b[myArray[i]];
		a = a[myArray[i]];
	}

	if (b < a) {
		return -1;
	}
	if (b > a) {
		return 1;
	}
	return 0;
}

export function getComparator(order, orderBy) {
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}
