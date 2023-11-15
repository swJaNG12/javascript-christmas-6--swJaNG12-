import { Model } from "../src/Model/Model";
import { ErrorMessage } from "../src/Utils/ErrorMessage.js";

jest.mock("../src/Model/VisitDateValidator.js", () => {
	return {
		VisitDateValidator: jest.fn().mockImplementation(() => {
			return {
				validateDateOfVisit: jest.fn((date) => {
					if (date === "0" || date === "a") {
						throw new Error(
							"[ERROR] 유효하지 않은 날짜입니다. 다시 입력해 주세요."
						);
					}
				}),
			};
		}),
	};
});

describe("Model 클래스 메서드 테스트", () => {
	let model;
	let mockDate;

	beforeEach(() => {
		model = new Model();
		mockDate = "25";
	});

	describe("VisitDateValidator 모듈 테스트", () => {
		test("validateDateOfVisit 메서드 호출 테스트", () => {
			model.validateDateOfVisit(mockDate);

			expect(model.visitDateValidator.validateDateOfVisit).toHaveBeenCalledWith(
				mockDate
			);
		});

		test("validateDateOfVisit 메서드 동작 테스트 (유효한 경우)", () => {
			model.validateDateOfVisit(mockDate);

			expect(() =>
				model.visitDateValidator.validateDateOfVisit(mockDate)
			).not.toThrow();
		});

		test("validateDateOfVisit 메서드 동작 테스트 (범위를 벗어난 경우)", () => {
			mockDate = "0";

			expect(() =>
				model.visitDateValidator.validateDateOfVisit(mockDate)
			).toThrow(ErrorMessage.invalidDateOfVisit());
		});

		test("validateDateOfVisit 메서드 동작 테스트 (숫자가 아닌 경우)", () => {
			mockDate = "a";

			expect(() =>
				model.visitDateValidator.validateDateOfVisit(mockDate)
			).toThrow(ErrorMessage.invalidDateOfVisit());
		});
	});
});
