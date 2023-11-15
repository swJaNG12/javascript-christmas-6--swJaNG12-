import { Model } from "../src/Model/Model";

let model;

beforeEach(() => {
	model = new Model();
	model.setOrderedMenuArray([
		["해산물파스타", "2"],
		["제로콜라", "1"],
	]);
});

test("calculateTotalAmount 메서드 테스트", () => {
	const totalAmount = model.calculateTotalAmount();
	const expectedTotalAmount = 73000;

	expect(totalAmount).toBe(expectedTotalAmount);
});

test("createOrderedMenuMessage 메서드 테스트", () => {
	const orderedMenuMessageArray = model.createOrderedMenuMessage();
	const expectedArray = ["해산물파스타 2", "제로콜라 1"];

	expect(orderedMenuMessageArray).toStrictEqual(expectedArray);
});
