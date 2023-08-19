export const getINCurrencyFormat = (value: number): string => {
	return new Intl.NumberFormat("en-IN", { currency: "INR" }).format(value);
};
