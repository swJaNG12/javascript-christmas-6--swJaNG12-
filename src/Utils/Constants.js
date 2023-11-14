export const PATTERN = {
	ONLY_NUMBER: /^\d+$/,
};

export const DECIMAL_NUMBER = 10;
export const MINIMUM_DISCOUNT_AMOUNT = 10000;
export const INITIAL_VALUE_ZERO = 0;

export const EVENT = {
	DATE_RANGE: { MIN: 1, MAX: 31 },
	MIN_MENU_ORDER: 1,
	MAX_MENU_ORDER: 20,
	GIFT_CONDITION: 120000,
	DISCOUNT_CONDITION: 10000,
	BADGE_CONDITION: { STAR: 5000, TREE: 10000, SANTA: 20000 },
	BADGE: {
		STAR: "스타",
		TREE: "트리",
		SANTA: "산타",
	},
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

export const DISCOUNT_CONDITIONS = {
	WEEKDAY_DISCOUNT: {
		DAYS: [
			3, 4, 5, 6, 7, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 24, 25, 26, 27, 28,
			31,
		],
		DISCOUNT: 2023,
		MENU: "DESSERT",
	},
	WEEKEND_DISCOUNT: {
		DAYS: [1, 2, 8, 9, 15, 16, 22, 23, 29, 30],
		DISCOUNT: 2023,
		MENU: "MAIN",
	},
	SPECIAL_DISCOUNT: {
		DAYS: [3, 10, 17, 24, 25, 31],
		DISCOUNT: 1000,
	},
};

export const D_DAY_DISCOUNT = {
	START_DAY: 1,
	END_DAY: 25,
	INITIAL_DISCOUNT: 1000,
	INCREMENT: 100,
};

export const SEPARATOR = {
	COMMA: ",",
	DASH: "-",
	SPACE_STRING: " ",
	COLON: ":",
};

export const UNIT = {
	QUANTITY_UNIT: "개",
	CURRENCY_UNIT: "원",
};

export const GIFT_MENU = {
	ITEM: "샴페인",
	COUNT: 1,
	PRICE: 25000,
};

export const BENEFIT_TITLE = [
	"크리스마스 디데이 할인",
	"평일 할인",
	"주말 할인",
	"특별 할인",
	"증정 이벤트",
];
