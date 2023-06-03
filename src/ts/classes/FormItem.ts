import ValidationResponse from "../interfaces/ValidationResponse";
import css from "../utils/css";

abstract class FormItem {
  protected selector: string;
  protected rootElement: HTMLElement;
  protected errorElement: HTMLSpanElement;

  constructor(selector: string) {
    this.selector = selector;
    this.rootElement = document.querySelector(selector)!;
    this.errorElement = this.rootElement.querySelector("span")!;
  }

  showError(message: string) {
    this.rootElement.classList.add(css.groupError);
    this.errorElement.textContent = message;
  }

  clearError() {
    this.rootElement.classList.remove(css.groupError);
    this.errorElement.textContent = "";
  }

  getSelector() {
    return this.selector;
  }

  isValid() {
    return this.validate().valid;
  }

  abstract getCurrentValue(): string | number | null;

  abstract reset(): void;

  abstract validate(): ValidationResponse;

  abstract subscribe(listener: (currentValue: number) => void): void;
}

export default FormItem;
