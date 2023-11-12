import { DECIMAL_NUMBER, SEPARATOR, MENU } from "../Constants.js";
import { ErrorMessage } from "../ErrorMessage.js";

export class MenuOrderValidator {
	#createMenuNames() {
		const menuNamesArray = [];
		Object.keys(MENU).forEach((menu) => {
			menuNamesArray.push(...MENU[menu].ITEMS);
		});
		return menuNamesArray;
	}

	#createOrderedMenuNames(orderedMenuArray) {
		return orderedMenuArray.map((menu) => menu.split(SEPARATOR.DASH)[0]);
	}
	#createOrderedMenuCount(orderedMenuArray) {
		return orderedMenuArray.map((menu) => {
			return parseInt(menu.split(SEPARATOR.DASH)[1], DECIMAL_NUMBER);
		});
	}

	#validateMenuNameInOrder(orderedMenuArray) {
		const menuNamesArray = this.#createMenuNames();
		const orderedMenuNamesArray =
			this.#createOrderedMenuNames(orderedMenuArray);

		orderedMenuNamesArray.forEach((orderedMenuName) => {
			if (!menuNamesArray.includes(orderedMenuName)) {
				throw new Error(ErrorMessage.invalidOrder());
			}
		});
	}

	#validateOnlyBeveragesInOrder(orderedMenuArray) {
		const orderedMenuNamesArray =
			this.#createOrderedMenuNames(orderedMenuArray);

		if (
			orderedMenuNamesArray.every((orderedMenuName) =>
				MENU.BEVARAGE.ITEMS.includes(orderedMenuName)
			)
		) {
			throw new Error(ErrorMessage.invalidOrder());
		}
	}

	#validateUniqueMenuNamesInOrder(orderedMenuArray) {
		const orderedMenuNamesArray =
			this.#createOrderedMenuNames(orderedMenuArray);

		if (orderedMenuNamesArray.length !== new Set(orderedMenuNamesArray).size) {
			throw new Error(ErrorMessage.invalidOrder());
		}
	}

	#validateMenuCountRangeInOrder(orderedMenuArray) {
		const orderedMenuCountArray =
			this.#createOrderedMenuCount(orderedMenuArray);

		if (orderedMenuCountArray.every((count) => count >= 1 && count <= 20)) {
			const totalOrderCount = orderedMenuCountArray.reduce(
				(acc, cur) => acc + cur,
				0
			);
			if (totalOrderCount > 20) {
				throw new Error(ErrorMessage.invalidOrder());
			}
		} else {
			throw new Error(ErrorMessage.invalidOrder());
		}
	}

	validateMenuOrder(orderMenu) {
		const orderedMenuArray = orderMenu.split(SEPARATOR.COMMA);
		this.#validateMenuNameInOrder(orderedMenuArray);
		this.#validateOnlyBeveragesInOrder(orderedMenuArray);
		this.#validateUniqueMenuNamesInOrder(orderedMenuArray);
		this.#validateMenuCountRangeInOrder(orderedMenuArray);
	}
}
