import ValidationResponse from "../interfaces/ValidationResponse";
import FormItem from "./FormItem";

class FormInput extends FormItem {
  private inputElement: HTMLInputElement;

  constructor(selector: string) {
    super(selector);
    this.inputElement = this.rootElement.querySelector("input")!;
  }

  private clearInput() {
    this.inputElement.value = "";
  }

  getCurrentValue() {
    return this.inputElement.value;
  }

  reset() {
    this.clearError();
    this.clearInput();
  }

  validate(): ValidationResponse {
    const currentValue = this.getCurrentValue();
    const validationResponse: ValidationResponse = { valid: false };

    if (!currentValue) {
      validationResponse.message = "Can't be zero";
    } else if (isNaN(currentValue as any)) {
      validationResponse.message = "Must be a number";
    } else if (parseInt(currentValue) < 0) {
      validationResponse.message = "Must be positive";
    } else {
      validationResponse.valid = true;
    }

    return validationResponse;
  }

  subscribe(listener: (currentValue: number) => void) {
    this.inputElement.addEventListener("input", (event) => {
      const validation = this.validate();

      if (!validation.valid) {
        this.showError(validation.message!);
      } else {
        this.clearError();
      }

      listener(parseFloat(this.getCurrentValue()));
    });
  }
}

export default FormInput;
