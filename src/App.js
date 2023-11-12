import { Console } from "@woowacourse/mission-utils";
import { DECIMAL_NUMBER, SEPARATOR } from "./Constants.js";
import InputView from "./InputView.js";
import { Model } from "./Model/Model.js";
import OutputView from "./OutputView.js";

class App {
	constructor() {
		this.model = new Model();
	}

	async run() {
		OutputView.start();

		const dateOfVisit = await this.validateDateOfVisit();

		const orderedMenuArray = await this.validateMenuOrder();

		OutputView.printEventDate(dateOfVisit);

		const totalAmount = this.calculateTotalAmount(orderedMenuArray);
		Console.print(totalAmount);

		const orderedMenuMessageArray =
			this.createOrderedMenuMessage(orderedMenuArray);

		OutputView.printMenu(orderedMenuMessageArray);
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
}

export default App;
