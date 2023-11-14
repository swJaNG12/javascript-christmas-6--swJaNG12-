import {
	DECIMAL_NUMBER,
	MINIMUM_DISCOUNT_AMOUNT,
	SEPARATOR,
} from "./Utils/Constants.js";
import InputView from "./View/InputView.js";
import { Model } from "./Model/Model.js";
import OutputView from "./View/OutputView.js";

class App {
	constructor() {
		this.model = new Model();
	}

	async run() {
		OutputView.start();

		const dateOfVisit = await this.validateDateOfVisit();

		const orderedMenuArray = await this.validateMenuOrder();

		const totalAmount = this.calculateTotalAmount(orderedMenuArray);

		const orderedMenuMessageArray =
			this.createOrderedMenuMessage(orderedMenuArray);

		OutputView.printEventDate(dateOfVisit);
		OutputView.printOrderedMenu(orderedMenuMessageArray);
		OutputView.printTotalAmountNoDiscount(totalAmount);

		const orderResult = this.createOrderResult(
			totalAmount,
			dateOfVisit,
			orderedMenuArray
		);

		OutputView.printOrderResult(...orderResult);
	}

	async validateDateOfVisit() {
		while (true) {
			try {
				const dateOfVisit = await InputView.readDate();
				this.model.validateDateOfVisit(dateOfVisit);

				return parseInt(dateOfVisit, DECIMAL_NUMBER);
			} catch (error) {
				console.error(error);
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
				console.error(error);
			}
		}
	}

	calculateTotalAmount(orderedMenuArray) {
		return this.model.calculateTotalAmount(orderedMenuArray);
	}

	createOrderedMenuMessage(orderedMenuArray) {
		return this.model.createOrderedMenuMessage(orderedMenuArray);
	}

	createOrderResult(totalAmount, dateOfVisit, orderedMenuArray) {
		if (totalAmount < MINIMUM_DISCOUNT_AMOUNT) {
			return this.model.noDiscountOrderResult(totalAmount);
		} else {
			return this.model.discountOrderResult(
				totalAmount,
				dateOfVisit,
				orderedMenuArray
			);
		}
	}
}

export default App;
