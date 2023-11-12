import { VisitDateValidator } from "./VisitDateValidator.js";
import { MenuOrderValidator } from "./MenuOrderValidator.js";

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
}
