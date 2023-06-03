import FormItem from "./FormItem";

interface FormFields {
  [key: string]: string | number | null;
}

type ChangeListener = (formData: FormFields) => void;

class Form {
  private fields: FormFields = {};
  private formItems: FormItem[];
  private listeners: ChangeListener[] = [];

  constructor(formItems: FormItem[]) {
    this.formItems = formItems;

    this.formItems.forEach((formItem) => {
      const selector = formItem.getSelector();
      this.fields[selector] = null;

      formItem.subscribe((currentValue: number) => {
        this.fields[selector] = currentValue;

        this.fireListeners();
      });
    });
  }

  private fireListeners() {
    this.listeners.forEach((listener) => {
      new Promise(() => {
        listener(this.fields);
      });
    });
  }

  subscribe(cb: (formData: FormFields) => void) {
    this.listeners.push(cb);
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
