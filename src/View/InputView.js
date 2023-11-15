import { Console } from "@woowacourse/mission-utils";
import { MESSAGE_INPUT } from "../Utils/EventMessages.js";

const InputView = {
	async readDate() {
		const dateOfVisit = await Console.readLineAsync(
			MESSAGE_INPUT.DATE_INPUT_MESSAGE
		);
		return dateOfVisit;
	},
	async readMenu() {
		const menu = await Console.readLineAsync(MESSAGE_INPUT.MENU_ORDER_MESSAGE);
		return menu;
	},
};

export default InputView;
