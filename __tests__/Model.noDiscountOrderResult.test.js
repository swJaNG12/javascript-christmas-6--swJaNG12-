import { Model } from "../src/Model/Model";

let model;

beforeEach(() => {
	model = new Model();
});

test("noDiscountOrderResult 메서드 테스트(1000원 미만 주문)", () => {
	const totalAmount = 9000;
	const expectedArray = ["없음", ["없음"], "0원", "9000원", "없음"];
	const result = model.noDiscountOrderResult(totalAmount);

	expect(result).toStrictEqual(expectedArray);
});
