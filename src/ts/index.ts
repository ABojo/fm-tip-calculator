import "../sass/main.scss";
import TipCalculator from "./classes/TipCalculator";
import Form from "./classes/Form";
import FormInput from "./classes/FormInput";
import FormRadio from "./classes/FormRadio";
import Display from "./classes/Display";
import css from "./utils/css";

const calc = new TipCalculator();
const display = new Display();

const billGroup = new FormInput(css.billGroup);
const tipGroup = new FormRadio(css.tipGroup);
const peopleGroup = new FormInput(css.peopleGroup);

const form = new Form([billGroup, tipGroup, peopleGroup]);

//whenever the form fields change run this callback
form.subscribe((formData) => {
  if (form.isEmpty()) {
    display.disableResetButton();
  } else {
    display.enableResetButton();
  }

  if (form.isValid()) {
    //update calculators memory with new data
    const billValue = formData[css.billGroup];
    const tipValue = formData[css.tipGroup];
    const peopleValue = formData[css.peopleGroup];

    if (
      typeof billValue === "number" &&
      typeof peopleValue === "number" &&
      typeof tipValue === "number"
    ) {
      calc.setBillPrice(billValue);
      calc.setTipPercentage(tipValue);
      calc.setNumberOfPeople(peopleValue);
    }

    //render the new calculations to the display
    display.updateTipAmount(calc.getTipPerPerson());
    display.updateTotalAmount(calc.getTotalPerPerson());
  }
});

//when the reset button is clicked clear the form and the calculators memory
display.addResetListener(() => {
  form.reset();
  calc.reset();
});
