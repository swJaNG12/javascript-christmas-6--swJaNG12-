import {
	DECIMAL_NUMBER,
	MINIMUM_DISCOUNT_AMOUNT,
	SEPARATOR,
} from "./Utils/Constants.js";
import InputView from "./View/InputView.js";
import { Model } from "./Model/Model.js";
import OutputView from "./View/OutputView.js";
import { Console } from "@woowacourse/mission-utils";

class App {
	constructor() {
		this.model = new Model();
	}

	async run() {
		OutputView.start();

		const dateOfVisit = await this.validateDateOfVisit();

		const orderedMenuArray = await this.validateMenuOrder();
		this.model.setOrderedMenuArray(orderedMenuArray);

		const totalAmount = this.calculateTotalAmount();

		const orderedMenuMessageArray = this.createOrderedMenuMessage();

		OutputView.printEventDate(dateOfVisit);
		OutputView.printOrderedMenu(orderedMenuMessageArray);
		OutputView.printTotalAmountNoDiscount(totalAmount);

		const orderResult = this.createOrderResult(totalAmount, dateOfVisit);

		OutputView.printOrderResult(...orderResult);
	}

	async validateDateOfVisit() {
		while (true) {
			try {
				const dateOfVisit = await InputView.readDate();
				this.model.validateDateOfVisit(dateOfVisit);

				return parseInt(dateOfVisit, DECIMAL_NUMBER);
			} catch (error) {
				Console.print(error.message);
			}
		}
	}

	async validateMenuOrder() {
		while (true) {
			try {
				const orderMenu = await InputView.readMenu();
				this.model.validateMenuOrder(orderMenu);

				return orderMenu.split(SEPARATOR.COMMA).map((menu) => {
					return menu.split(SEPARATOR.DASH);
				});
			} catch (error) {
				Console.print(error.message);
			}
		}
	}

	calculateTotalAmount() {
		return this.model.calculateTotalAmount();
	}

	createOrderedMenuMessage() {
		return this.model.createOrderedMenuMessage();
	}

	createOrderResult(totalAmount, dateOfVisit) {
		if (totalAmount < MINIMUM_DISCOUNT_AMOUNT) {
			return this.model.noDiscountOrderResult(totalAmount);
		} else {
			return this.model.discountOrderResult(totalAmount, dateOfVisit);
		}
	}
}

export default App;
