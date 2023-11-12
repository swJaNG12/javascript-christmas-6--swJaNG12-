export const PATTERN = {
	ONLY_NUMBER: /^\d+$/,
};

export const DECIMAL_NUMBER = 10;

export const EVENT = {
	DATE_RANGE: { MIN: 1, MAX: 31 },
	MAX_MENU_ORDER: 20,
	GIFT_CONDITION: 120000,
	DISCOUNT_CONDITION: 10000,
	D_DAY_DISCOUNT: { START: 1000, INCREASE: 100 },
	WEEKDAY_DISCOUNT: 2023,
	WEEKEND_DISCOUNT: 2023,
	SPECIAL_DISCOUNT: 1000,
	BADGE_CONDITION: { STAR: 5000, TREE: 10000, SANTA: 20000 },
};

export const MENU = {
	APPETIZER: {
		ITEMS: ["양송이수프", "타파스", "시저샐러드"],
		PRICE: {
			양송이수프: 6000,
			타파스: 5500,
			시저샐러드: 8000,
		},
	},
	MAIN: {
		ITEMS: ["티본스테이크", "바비큐립", "해산물파스타", "크리스마스파스타"],
		PRICE: {
			티본스테이크: 55000,
			바비큐립: 54000,
			해산물파스타: 35000,
			크리스마스파스타: 25000,
		},
	},
	DESSERT: {
		ITEMS: ["초코케이크", "아이스크림"],
		PRICE: {
			초코케이크: 15000,
			아이스크림: 5000,
		},
	},
	BEVARAGE: {
		ITEMS: ["제로콜라", "레드와인", "샴페인"],
		PRICE: {
			제로콜라: 3000,
			레드와인: 60000,
			샴페인: 25000,
		},
	},
};

export const SEPARATOR = {
	COMMA: ",",
	DASH: "-",
};
