import {
	BENEFIT_TITLE,
	EVENT,
	GIFT_MENU,
	SEPARATOR,
	UNIT,
} from "../Utils/Constants.js";

export class DiscountOrderHelper {
	constructor(orderedMenuArray, discountCalculator) {
		this.orderedMenuArray = orderedMenuArray;
		this.discountCalculator = discountCalculator;
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

	#getExpectedPayment(totalAmount, totalBenefitAmount, giftMenu) {
		return (
			totalAmount -
			totalBenefitAmount +
			(giftMenu === "없음" ? 0 : GIFT_MENU.PRICE)
		);
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
	#getTotalBenefitAmount(benefitDetail) {
		return benefitDetail.reduce((acc, cur) => acc + cur, 0);
	}

	discountOrderResult(totalAmount, dateOfVisit) {
		const giftMenu = this.#determineGiftMenu(totalAmount);
		const benefitDetail = this.discountCalculator.computeBenefitDetails(
			totalAmount,
			dateOfVisit,
			this.orderedMenuArray
		);
		const totalBenefitAmount = this.#getTotalBenefitAmount(benefitDetail);
		const expectedPayment = this.#getExpectedPayment(
			totalAmount,
			totalBenefitAmount,
			giftMenu
		);
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
