import { DECIMAL_NUMBER, EVENT, PATTERN } from "../Constants.js";
import { ErrorMessage } from "../ErrorMessage.js";

export class VisitDateValidator {
	#throwInvalidDateOfVisitError() {
		throw new Error(ErrorMessage.invalidDateOfVisit());
	}

	#parseStringToNumber(string) {
		return parseInt(string, DECIMAL_NUMBER);
	}

	#validateVisitDateIsNumber(dateOfVisit) {
		if (!PATTERN.ONLY_NUMBER.test(dateOfVisit)) {
			this.#throwInvalidDateOfVisitError();
		}
	}

	#validateVisitDateRange(dateOfVisit) {
		const visitDate = this.#parseStringToNumber(dateOfVisit);
		if (visitDate < EVENT.DATE_RANGE.MIN || visitDate > EVENT.DATE_RANGE.MAX) {
			this.#throwInvalidDateOfVisitError();
		}
	}

	validateDateOfVisit(dateOfVisit) {
		this.#validateVisitDateIsNumber(dateOfVisit);
		this.#validateVisitDateRange(dateOfVisit);
	}
}
