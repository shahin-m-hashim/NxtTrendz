const initialLoginForm = {
  error: "",
  username: "",
  password: "",
  isValid: false,
  isSubmitting: false,
};

const createFormsSlice = (set) => ({
  forms: {
    login: initialLoginForm,
  },

  setLoginFormField: (field, value) => {
    set(
      (state) => {
        state.forms.login[field] = value;

        if (state.forms.login.username && state.forms.login.password) {
          state.forms.login.isValid = true;
        } else {
          state.forms.login.isValid = false;
        }
      },
      undefined,
      "setLoginFormField"
    );
  },

  setLoginFormError: (error) => {
    set(
      (state) => {
        state.forms.login.error = error;
      },
      undefined,
      "setLoginFormError"
    );
  },

  setIsLoginFormSubmitting: (isSubmitting) => {
    set(
      (state) => {
        state.forms.login.isSubmitting = isSubmitting;
      },
      undefined,
      "setIsLoginFormSubmitting"
    );
  },

  resetLoginForm: () => {
    set(
      (state) => {
        state.forms.login = initialLoginForm;
      },
      undefined,
      "resetLoginForm"
    );
  },
});

export default createFormsSlice;
