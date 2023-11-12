import { VisitDateValidator } from "./VisitDateValidator.js";
import { MenuOrderValidator } from "./MenuOrderValidator.js";
import { DECIMAL_NUMBER, MENU, SEPARATOR, UNIT } from "../Constants.js";

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

	calculateTotalAmount(orderedMenuArray) {
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

	createOrderedMenuMessage(orderedMenuArray) {
		return orderedMenuArray
			.map((menu) => menu.join(SEPARATOR.SPACE_STRING))
			.map((menu) => menu + UNIT.QUANTITY_UNIT);
	}
}
