import { DECIMAL_NUMBER } from "./Constants.js";
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

		const orderMenu = await this.validateMenuOrder();
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

				return orderMenu;
			} catch (error) {
				console.error(error);
			}
		}
	}
}

export default App;
