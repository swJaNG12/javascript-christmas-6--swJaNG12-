import { Model } from "../src/Model/Model";
import { DiscountOrderHelper } from "../src/Model/DiscountOrderHelper";

jest.mock("../src/Model/DiscountOrderHelper.js");

describe("model 클래스 discountOrderResult 메서드 테스트", () => {
	let model;

	test("discountOrderResult 메서드 호출 테스트", () => {
		mockDiscountOrderResult = jest.fn();
		DiscountOrderHelper.mockImplementation(() => {
			return {
				discountOrderResult: mockDiscountOrderResult,
			};
		});

		model = new Model();

		const totalAmount = 142000;
		const dateOfVisit = 3;

		model.discountOrderResult(totalAmount, dateOfVisit);

		expect(mockDiscountOrderResult).toHaveBeenCalledWith(
			totalAmount,
			dateOfVisit
		);
	});
});
