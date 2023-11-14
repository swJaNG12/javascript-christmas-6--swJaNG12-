import { VisitDateValidator } from "./VisitDateValidator.js";
import { MenuOrderValidator } from "./MenuOrderValidator.js";
import {
	BENEFIT_TITLE,
	DECIMAL_NUMBER,
	EVENT,
	GIFT_MENU,
	INITIAL_VALUE_ZERO,
	MENU,
	SEPARATOR,
	UNIT,
} from "../Constants.js";
import { DiscountCalculator } from "./DiscountCalculator.js";

export class Model {
	constructor() {
		this.visitDateValidator = new VisitDateValidator();
		this.menuOrderValidator = new MenuOrderValidator();
		this.discountCalculator = new DiscountCalculator();
	}

	validateDateOfVisit(dateOfVisit) {
		this.visitDateValidator.validateDateOfVisit(dateOfVisit);
	}

	validateMenuOrder(orderMenu) {
		this.menuOrderValidator.validateMenuOrder(orderMenu);
	}

	calculateTotalAmount(orderedMenuArray) {
		let totalAmount = INITIAL_VALUE_ZERO;
		orderedMenuArray.forEach(([item, quantity]) => {
			for (let category in MENU) {
				if (MENU[category].ITEMS.includes(item)) {
					totalAmount +=
						MENU[category].PRICE[item] * parseInt(quantity, DECIMAL_NUMBER);
				}
			}
		});
		return totalAmount;
	}

	createOrderedMenuMessage(orderedMenuArray) {
		return orderedMenuArray.map((menu) => menu.join(SEPARATOR.SPACE_STRING));
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

	#determineGiftMenu(totalAmount) {
		if (totalAmount >= EVENT.GIFT_CONDITION) {
			return GIFT_MENU.ITEM + GIFT_MENU.COUNT + UNIT.QUANTITY_UNIT;
		} else {
			return "없음";
		}
	}

	#selectBedge(totalBenefitAmount) {
		if (totalBenefitAmount >= EVENT.BADGE_CONDITION.SANTA) {
			return EVENT.BADGE.SANTA;
		} else if (totalBenefitAmount >= EVENT.BADGE_CONDITION.TREE) {
			return EVENT.BADGE.TREE;
		} else if (totalBenefitAmount >= EVENT.BADGE_CONDITION.STAR) {
			return EVENT.BADGE.STAR;
		} else if (totalBenefitAmount < EVENT.BADGE_CONDITION.STAR) {
			return "없음";
		}
	}

	#convertBenefitDetail(benefitDetail) {
		return benefitDetail.map((benefit, idx) => {
			if (benefit !== 0) {
				return (
					BENEFIT_TITLE[idx] +
					SEPARATOR.COLON +
					SEPARATOR.SPACE_STRING +
					SEPARATOR.DASH +
					benefit.toLocaleString("en-US") +
					UNIT.CURRENCY_UNIT
				);
			}
		});
	}

	discountOrderResult(totalAmount, dateOfVisit, orderedMenuArray) {
		const giftMenu = this.#determineGiftMenu(totalAmount);
		const benefitDetail = this.discountCalculator.computeBenefitDetails(
			totalAmount,
			dateOfVisit,
			orderedMenuArray
		);
		const totalBenefitAmount = benefitDetail.reduce((acc, cur) => acc + cur, 0);
		const expectedPayment = totalAmount - totalBenefitAmount + GIFT_MENU.PRICE;
		const bedge = this.#selectBedge(totalBenefitAmount);

		const filnalBenefit = this.#convertBenefitDetail(benefitDetail);

		return [
			giftMenu,
			filnalBenefit,
			SEPARATOR.DASH +
				totalBenefitAmount.toLocaleString("en-US") +
				UNIT.CURRENCY_UNIT,
			expectedPayment.toLocaleString("en-US") + UNIT.CURRENCY_UNIT,
			bedge,
		];
	}
}
