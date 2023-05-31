class TipCalculator {
  private billPrice = 0;
  private tipPercentage = 0;
  private numberOfPeople = 0;

  setBillPrice(price: number) {
    this.billPrice = price;
  }

  setTipPercentage(percentage: number) {
    this.tipPercentage = percentage;
  }

  setNumberOfPeople(people: number) {
    this.numberOfPeople = people;
  }

  private getTip(): number {
    return this.billPrice * (this.tipPercentage * 0.01);
  }

  getTipPerPerson(): string {
    return (this.getTip() / this.numberOfPeople).toFixed(2);
  }

  getTotalPerPerson(): string {
    return (
      this.billPrice / this.numberOfPeople +
      parseFloat(this.getTipPerPerson())
    ).toFixed(2);
  }

  reset() {
    this.billPrice = 0;
    this.tipPercentage = 0;
    this.numberOfPeople = 0;
  }
}

export default TipCalculator;
