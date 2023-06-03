import ValidationResponse from "../interfaces/ValidationResponse";
import FormItem from "./FormItem";
import css from "../utils/css";

class FormRadio extends FormItem {
  private radioButtons: HTMLInputElement[];
  private checkedRadioButton: HTMLInputElement | null = null;
  private inputElement: HTMLInputElement | null = null;
  private currentValue: string | null = null;
  private listener: null | ((currentValue: number) => void) = null;

  constructor(selector: string) {
    super(selector);

    this.radioButtons = Array.from(
      this.rootElement.querySelectorAll('input[type="radio"]')
    ) as HTMLInputElement[];

    this.inputElement = this.rootElement.querySelector(css.radioCustom);

    this.setupRadioButtons();
    this.setupCustomInput();
  }

  //run once in constructor to setup listeners for radio buttons
  private setupRadioButtons() {
    this.radioButtons.forEach((radioButton) => {
      //update checked radio button and update current value
      radioButton.addEventListener("change", () => {
        this.checkedRadioButton = radioButton;
        this.setCurrentValue(this.checkedRadioButton.value);
        this.clearInput();
        this.clearError();
      });
    });
  }

  //run once in constructor to setup custom input listeners
  private setupCustomInput() {
    if (this.inputElement) {
      this.inputElement.addEventListener("focus", () => {
        this.uncheckRadioButton();
      });

      this.inputElement.addEventListener("input", () => {
        this.setCurrentValue(this.inputElement!.value);

        const validation = this.validate();

        if (!validation.valid) {
          this.showError(validation.message!);
        } else {
          this.clearError();
        }
      });
    }
  }

  private setCurrentValue(newValue: string) {
    this.currentValue = newValue;

    if (this.listener) {
      this.listener(parseFloat(this.currentValue));
    }
  }

  private clearCurrentValue() {
    this.currentValue = null;
  }

  private clearInput() {
    if (this.inputElement) {
      this.inputElement.value = "";
    }
  }

  private uncheckRadioButton() {
    if (this.checkedRadioButton) {
      this.checkedRadioButton.checked = false;
      this.checkedRadioButton = null;
    }
  }

  getCurrentValue() {
    return this.currentValue;
  }

  reset() {
    this.uncheckRadioButton();
    this.clearInput();
    this.clearCurrentValue();
  }

  subscribe(listener: (currentValue: number) => void) {
    this.listener = listener;
  }

  validate(): ValidationResponse {
    const currentValue = this.getCurrentValue();
    const validationResponse: ValidationResponse = { valid: false };

    if (!currentValue) {
      validationResponse.message = "Can't be empty";
    } else if (isNaN(currentValue as any)) {
      validationResponse.message = "Must be a number";
    } else if (parseFloat(currentValue) < 0 || parseFloat(currentValue) > 100) {
      validationResponse.message = "Must be between 0 and 100";
    } else {
      validationResponse.valid = true;
    }

    return validationResponse;
  }
}

export default FormRadio;
