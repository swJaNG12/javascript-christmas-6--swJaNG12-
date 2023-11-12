import { VisitDateValidator } from "./VisitDateValidator.js";
import { MenuOrderValidator } from "./MenuOrderValidator.js";
import { DECIMAL_NUMBER, MENU, SEPARATOR } from "../Constants.js";

export class Model {
	constructor() {
		this.visitDateValidator = new VisitDateValidator();
		this.menuOrderValidator = new MenuOrderValidator();
	}

	validateDateOfVisit(dateOfVisit) {
		this.visitDateValidator.validateDateOfVisit(dateOfVisit);
	}

	validateMenuOrder(orderMenu) {
		this.menuOrderValidator.validateMenuOrder(orderMenu);
	}

	calculateTotalAmount(orderedMenu) {
		const orderedMenuArray = orderedMenu.split(SEPARATOR.COMMA).map((menu) => {
			return menu.split(SEPARATOR.DASH);
		});

		let totalAmount = 0;
		orderedMenuArray.forEach(([item, quantity]) => {
			for (let category in MENU) {
				if (MENU[category].ITEMS.includes(item)) {
					totalAmount +=
						MENU[category].PRICE[item] * parseInt(quantity, DECIMAL_NUMBER);
				}
			}
		});
		return totalAmount;
	}
}
