import { VisitDateValidator } from "./VisitDateValidator.js";
import { MenuOrderValidator } from "./MenuOrderValidator.js";
import { DiscountCalculator } from "./DiscountCalculator.js";
import { DiscountOrderHelper } from "./DiscountOrderHelper.js";
import {
	DECIMAL_NUMBER,
	INITIAL_VALUE_ZERO,
	MENU,
	SEPARATOR,
	UNIT,
} from "../Utils/Constants.js";

export class Model {
	constructor() {
		this.visitDateValidator = new VisitDateValidator();
		this.menuOrderValidator = new MenuOrderValidator();
		this.discountCalculator = new DiscountCalculator();
		this.orderedMenuArray = [];
		this.discountOrderHelper = new DiscountOrderHelper(
			this.orderedMenuArray,
			this.discountCalculator
		);
	}

	setOrderedMenuArray(orderedMenuArray) {
		this.orderedMenuArray = orderedMenuArray;
	}

	validateDateOfVisit(dateOfVisit) {
		this.visitDateValidator.validateDateOfVisit(dateOfVisit);
	}

	validateMenuOrder(orderMenu) {
		this.menuOrderValidator.validateMenuOrder(orderMenu);
	}

	calculateTotalAmount() {
		let totalAmount = INITIAL_VALUE_ZERO;
		this.orderedMenuArray.forEach(([item, quantity]) => {
			for (let category in MENU) {
				if (MENU[category].ITEMS.includes(item)) {
					totalAmount +=
						MENU[category].PRICE[item] * parseInt(quantity, DECIMAL_NUMBER);
				}
			}
		});
		return totalAmount;
	}

	createOrderedMenuMessage() {
		return this.orderedMenuArray.map((menu) =>
			menu.join(SEPARATOR.SPACE_STRING)
		);
	}

	noDiscountOrderResult(totalAmount) {
		return [
			"없음",
			["없음"],
			INITIAL_VALUE_ZERO + UNIT.CURRENCY_UNIT,
			totalAmount + UNIT.CURRENCY_UNIT,
			"없음",
		];
	}

	discountOrderResult(totalAmount, dateOfVisit) {
		return this.discountOrderHelper.discountOrderResult(
			totalAmount,
			dateOfVisit
		);
	}
}
