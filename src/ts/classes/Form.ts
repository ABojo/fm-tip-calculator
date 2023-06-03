import FormItem from "./FormItem";

interface FormFields {
  [key: string]: string | number | null;
}

class Form {
  private fields: FormFields = {};
  private formItems: FormItem[];
  private listener: null | ((formData: FormFields) => void) = null;

  constructor(formItems: FormItem[]) {
    this.formItems = formItems;

    this.formItems.forEach((formItem) => {
      const selector = formItem.getSelector();
      this.fields[selector] = null;

      formItem.subscribe((currentValue: number) => {
        this.fields[selector] = currentValue;

        if (this.listener) {
          this.listener(this.fields);
        }
      });
    });
  }

  subscribe(cb: (formData: FormFields) => void) {
    this.listener = cb;
  }

  isValid(): boolean {
    return this.formItems.every((formItem) => {
      return formItem.isValid();
    });
  }

  isEmpty(): boolean {
    return this.formItems.every((formItem) => {
      return !formItem.getCurrentValue();
    });
  }

  reset() {
    this.formItems.forEach((formItem) => {
      formItem.reset();
    });
  }

  getFields(): FormFields {
    return this.fields;
  }
}

export default Form;
