# Tip Calculator

I built this app using SASS, TypeScript, and plain DOM manipulation. This app is very simple so it would've been easier to build an inflexible monolith of code but I wanted to practice with TypeScript and building efficiently within the OOP paradigm. I created numerous classes that allowed me to encapsulate the different responsibilities in the app and provide convenient abstractions through their interfaces. This made it easy for me to allow these individual objects to work together via their interfaces and decouple unrelated logic.

The design for the app can be found [here](https://www.frontendmentor.io/challenges/tip-calculator-app-ugJNGbJUX)

If you want to test the app click [here](https://abojo-tip-calculator.netlify.app/).

## Classes

- Tip Calculator - memorizes the currently entered numbers and does the math to return the correct tip amounts
- Display - controls the display portion of the calculator. You can update the tip amounts, toggle the reset buttons state, clear the display, and attach reset event listeners through its interface.
- FormItem- an abstract class that holds the basic methods for all form items. It provides implementations for showing errors, clearing errors, retrieving the selector, and checking its own validity. It also guarantees that all sub classes will implement methods to reset, validate, subscribe, and get the current value.
- FormInput - a concrete implementation of the FormItem class that will be used to access the validity, the current value, and state updates of the text inputs.
- FormRadio- a concrete implementation of the FormItem class that will be used to access the validity, the current value, and state updates of the radio inputs.
- Form - this object will wrap all of the form items in the app and attach event listeners to them so it can store an up to date representation of the form. The form will provide an interface to allow consumers to check the validity of the form, find out if the form is empty, and reset the entire form.

## Orchestration

These objects work together via their interfaces and the ability to attach event listeners.

- When the form data changes an event listener will check if the form is empty and toggle the reset buttons state based on that condition

- When the form data changes an event listener will check if the form is valid and update the calculator's memory/update the display based on those new calculations.

- The display's reset button will clear the display, the calculator's memory, and the forms inputs.
