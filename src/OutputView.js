import { Console } from "@woowacourse/mission-utils";

const OutputView = {
	start() {
		Console.print("안녕하세요! 우테코 식당 12월 이벤트 플레너입니다.");
	},
	printEventDate(dateOfVisit) {
		Console.print(
			`12월 ${dateOfVisit}일에 우테코 식당에서 받을 이벤트 혜택 미리 보기!`
		);
	},
	printMenu() {
		Console.print("<주문 메뉴>");
		// ...
	},
	// ...
};

export default OutputView;
