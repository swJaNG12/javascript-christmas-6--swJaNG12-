import { Console } from "@woowacourse/mission-utils";

const OutputView = {
	start() {
		Console.print("안녕하세요! 우테코 식당 12월 이벤트 플레너입니다.");
	},
	printMenu() {
		Console.print("<주문 메뉴>");
		// ...
	},
	// ...
};

export default OutputView;
