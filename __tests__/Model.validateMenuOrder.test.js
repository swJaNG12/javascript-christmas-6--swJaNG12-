import { Model } from "../src/Model/Model";
import { ErrorMessage } from "../src/Utils/ErrorMessage";

jest.mock("../src/Model/MenuOrderValidator.js", () => {
	return {
		MenuOrderValidator: jest.fn().mockImplementation(() => {
			return {
				validateMenuOrder: jest.fn((menu) => {
					if (
						menu === "해산물파스타-2 제로콜라-1" ||
						menu === "타파스-1-제로콜라-1" ||
						menu === "제로콜라-1,레드와인-1" ||
						menu === "타파스-1,타파스-1" ||
						menu === "타파스-21" ||
						menu === "타파스-20, 제로콜라-0"
					) {
						throw new Error(
							"[ERROR] 유효하지 않은 주문입니다. 다시 입력해 주세요."
						);
					}
				}),
			};
		}),
	};
});

describe("Model 클래스 validateMenuOrder 메서드 테스트", () => {
	let model;

	beforeEach(() => {
		model = new Model();
	});

	test("validateMenuOrder 유효한 경우", () => {
		const mockData = "해산물파스타-2,제로콜라-1";
		model.validateMenuOrder(mockData);

		expect(model.menuOrderValidator.validateMenuOrder).toHaveBeenCalledWith(
			mockData
		);

		expect(() =>
			model.menuOrderValidator.validateMenuOrder(mockData)
		).not.toThrow();
	});

	test.each([
		["해산물파스타-2 제로콜라-1"],
		["타파스-1-제로콜라-1"],
		["제로콜라-1,레드와인-1"],
		["타파스-1,타파스-1"],
		["타파스-21"],
		["타파스-20, 제로콜라-0"],
	])("validateMenuOrder 유효하지 않은 경우", (invalidMenu) => {
		expect(() =>
			model.menuOrderValidator.validateMenuOrder(invalidMenu)
		).toThrow(ErrorMessage.invalidOrder());
	});
});
