import {
	DECIMAL_NUMBER,
	DISCOUNT_CONDITIONS,
	D_DAY_DISCOUNT,
	EVENT,
	GIFT_MENU,
	INITIAL_VALUE_ZERO,
	MENU,
} from "../Utils/Constants.js";

export class DiscountCalculator {
	#dDayDisCount(dateOfVisit) {
		return (
			D_DAY_DISCOUNT.INITIAL_DISCOUNT +
			(dateOfVisit - D_DAY_DISCOUNT.START_DAY) * D_DAY_DISCOUNT.INCREMENT
		);
	}

	#weekdayDiscount(dateOfVisit, orderedMenuArray) {
		let totalDisCount = INITIAL_VALUE_ZERO;
		let dessertCount = INITIAL_VALUE_ZERO;

		// 방문 날짜가 평일 할인날짜에 포함되는지 확인
		if (DISCOUNT_CONDITIONS.WEEKDAY_DISCOUNT.DAYS.includes(dateOfVisit)) {
			orderedMenuArray.forEach((menu) => {
				// 주문한 메뉴가 디저트라면 개수만큼 dessertCount에 더해준다.
				if (MENU.DESSERT.ITEMS.includes(menu[0])) {
					dessertCount += parseInt(menu[1], DECIMAL_NUMBER);
				}
			});
		}
		totalDisCount +=
			dessertCount * DISCOUNT_CONDITIONS.WEEKDAY_DISCOUNT.DISCOUNT;

		return totalDisCount;
	}

	#weekendDiscount(dateOfVisit, orderedMenuArray) {
		let totalDisCount = INITIAL_VALUE_ZERO;
		let mainCount = INITIAL_VALUE_ZERO;

		// 방문 날짜가 주말 할인날짜에 포함되는지 확인
		if (DISCOUNT_CONDITIONS.WEEKEND_DISCOUNT.DAYS.includes(dateOfVisit)) {
			orderedMenuArray.forEach((menu) => {
				// 주문한 메뉴가 메인메뉴라면 개수만큼 mainCount에 더한다.
				if (MENU.MAIN.ITEMS.includes(menu[0])) {
					mainCount += parseInt(menu[1], DECIMAL_NUMBER);
				}
			});
		}
		totalDisCount += mainCount * DISCOUNT_CONDITIONS.WEEKEND_DISCOUNT.DISCOUNT;

		return totalDisCount;
	}

	#giftEvent(totalAmount) {
		if (totalAmount >= EVENT.GIFT_CONDITION) {
			return GIFT_MENU.PRICE;
		} else {
			return INITIAL_VALUE_ZERO;
		}
	}

	#specialDiscount(dateOfVisit) {
		let totalDisCount = INITIAL_VALUE_ZERO;
		// 방문 날짜가 스페셜 할인날짜에 포함되는지 확인
		if (DISCOUNT_CONDITIONS.SPECIAL_DISCOUNT.DAYS.includes(dateOfVisit)) {
			totalDisCount += DISCOUNT_CONDITIONS.SPECIAL_DISCOUNT.DISCOUNT;
		}
		return totalDisCount;
	}

	computeBenefitDetails(totalAmount, dateOfVisit, orderedMenuArray) {
		const dDayDiscount = this.#dDayDisCount(dateOfVisit);
		const weekdayDiscount = this.#weekdayDiscount(
			dateOfVisit,
			orderedMenuArray
		);
		const weekendDiscount = this.#weekendDiscount(
			dateOfVisit,
			orderedMenuArray
		);
		const specialDiscount = this.#specialDiscount(dateOfVisit);
		const giftEvent = this.#giftEvent(totalAmount);

		return [
			dDayDiscount,
			weekdayDiscount,
			specialDiscount,
			weekendDiscount,
			giftEvent,
		];
	}
}
