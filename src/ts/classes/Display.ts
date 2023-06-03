import css from "../utils/css";

class Display {
  private tipElement: HTMLParagraphElement;
  private totalElement: HTMLParagraphElement;
  private resetElement: HTMLButtonElement;
  private resetListener: null | Function;

  constructor() {
    this.tipElement = document.querySelector(
      css.tipAmount
    ) as HTMLParagraphElement;

    this.totalElement = document.querySelector(
      css.totalAmount
    ) as HTMLParagraphElement;

    this.resetElement = document.querySelector(
      css.resetButton
    ) as HTMLButtonElement;

    this.resetListener = null;

    this.resetElement.addEventListener("click", () => {
      this.reset();
    });
  }

  private reset() {
    if (this.resetListener) {
      this.resetListener();
    }

    this.updateTipAmount("0.00");
    this.updateTotalAmount("0.00");
    this.disableResetButton();
  }

  updateTipAmount(newAmount: string) {
    this.tipElement.textContent = `$${newAmount}`;
  }

  updateTotalAmount(newAmount: string) {
    this.totalElement.textContent = `$${newAmount}`;
  }

  addResetListener(listener: () => void) {
    this.resetListener = listener;
  }

  enableResetButton() {
    this.resetElement.classList.remove(css.resetDisabled);
  }

  disableResetButton() {
    this.resetElement.classList.add(css.resetDisabled);
  }
}

export default Display;
