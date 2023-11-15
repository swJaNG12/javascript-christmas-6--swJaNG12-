import { Console } from "@woowacourse/mission-utils";
import { UNIT } from "../Utils/Constants.js";
import { MESSAGES_OUTPUT } from "../Utils/EventMessages.js";

const OutputView = {
	start() {
		Console.print(MESSAGES_OUTPUT.WELCOME_MESSAGE);
	},

	printEventDate(dateOfVisit) {
		Console.print(
			MESSAGES_OUTPUT.EVENT_PREVIEW_MESSAGE.replace("{day}", dateOfVisit)
		);
	},

	printOrderedMenu(orderedMenuMessageArray) {
		Console.print(MESSAGES_OUTPUT.ORDERED_MENU_TITLE);
		orderedMenuMessageArray.forEach((menu) => {
			Console.print(menu + UNIT.QUANTITY_UNIT);
		});
	},

	printTotalAmountNoDiscount(totalAmount) {
		Console.print(MESSAGES_OUTPUT.TOTAL_AMOUNT_NO_DISCOUNT_TITLE);
		Console.print(totalAmount.toLocaleString("en-US") + UNIT.CURRENCY_UNIT);
	},

	printOrderResult(
		giftMenu,
		benefitDetail,
		totalBenefitAmount,
		expectedPayment,
		badge
	) {
		Console.print(MESSAGES_OUTPUT.GIFT_MENU_TITLE);
		Console.print(`${giftMenu}`);
		Console.print(MESSAGES_OUTPUT.BENEFIT_DETAIL_TITLE);
		benefitDetail.forEach((benefit) => {
			if (benefit) {
				Console.print(benefit);
			}
		});
		Console.print(MESSAGES_OUTPUT.TOTAL_BENEFIT_AMOUNT_TITLE);
		Console.print(`${totalBenefitAmount}`);
		Console.print(MESSAGES_OUTPUT.EXPECTED_PAYMENT_TITLE);
		Console.print(`${expectedPayment}`);
		Console.print(MESSAGES_OUTPUT.EVENT_BADGE_TITLE);
		Console.print(`${badge}`);
	},
};

export default OutputView;
