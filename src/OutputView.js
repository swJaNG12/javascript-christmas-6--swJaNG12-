import { Console } from "@woowacourse/mission-utils";
import { UNIT } from "./Constants.js";

const OutputView = {
	start() {
		Console.print("안녕하세요! 우테코 식당 12월 이벤트 플레너입니다.");
	},

	printEventDate(dateOfVisit) {
		Console.print(
			`12월 ${dateOfVisit}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`
		);
	},

	printOrderedMenu(orderedMenuMessageArray) {
		Console.print("\n<주문 메뉴>");
		orderedMenuMessageArray.forEach((menu) => {
			Console.print(menu + UNIT.QUANTITY_UNIT);
		});
	},

	printTotalAmountNoDiscount(totalAmount) {
		Console.print("\n<할인 전 총주문 금액>");
		Console.print(totalAmount.toLocaleString("en-US") + UNIT.CURRENCY_UNIT);
	},

	printOrderResult(
		giftMenu,
		benefitDetail,
		totalBenefitAmount,
		expectedPayment,
		badge
	) {
		Console.print("\n<증정 메뉴>");
		Console.print(`${giftMenu}`);
		Console.print("\n<혜택 내역>");
		benefitDetail.forEach((benefit) => {
			if (benefit) {
				Console.print(benefit);
			}
		});
		Console.print("\n<총혜택 금액>");
		Console.print(`${totalBenefitAmount}`);
		Console.print("\n<할인 후 예상 결제 금액>");
		Console.print(`${expectedPayment}`);
		Console.print("\n<12월 이벤트 배지>");
		Console.print(`${badge}`);
	},
};

export default OutputView;
