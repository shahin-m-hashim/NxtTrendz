import passwordSchema from "schemas/passwordSchema";
import usernameSchema from "schemas/usernameSchema";

const initialLoginForm = {
  username: "",
  password: "",
  showPassword: false,
};

const initialRegisterForm = {
  username: {
    value: "",
    error: null,
  },
  password: {
    value: "",
    error: null,
    showValue: false,
  },
  confirmPassword: {
    value: "",
    error: null,
    showValue: false,
  },
};

const createFormsSlice = (set) => ({
  forms: {
    login: initialLoginForm,
    register: initialRegisterForm,
  },

  setLoginFormField: (field, value) => {
    set(
      (state) => {
        state.forms.login[field] = value;
      },
      undefined,
      "setLoginFormField"
    );
  },

  setRegisterFormField: (field, value) => {
    set(
      (state) => {
        const { register } = state.forms;
        register[field].value = value;

        const validators = {
          username: () => {
            const result = usernameSchema.safeParse(value);
            register.username.error = !result.success
              ? result.error.issues[0].message
              : null;
          },

          password: () => {
            const result = passwordSchema.safeParse(value);
            register.password.error = !result.success
              ? result.error.issues[0].message
              : null;

            if (register.confirmPassword.value) {
              register.confirmPassword.error =
                value !== register.confirmPassword.value
                  ? "Passwords do not match."
                  : null;
            }
          },

          confirmPassword: () => {
            register.confirmPassword.error =
              value !== register.password.value
                ? "Passwords do not match."
                : null;
          },
        };

        validators[field]();
      },
      undefined,
      "setRegisterFormField"
    );
  },

  setShowPasswordValue: (form, show) => {
    set(
      (state) => {
        if (form === "register") {
          state.forms.register.password.showValue = show;
        } else {
          state.forms.login.showPassword = show;
        }
      },
      undefined,
      "setShowPasswordValue"
    );
  },

  setShowConfirmPasswordValue: (show) => {
    set(
      (state) => {
        state.forms.register.confirmPassword.showValue = show;
      },
      undefined,
      "setShowConfirmPasswordValue"
    );
  },

  resetForm: (form) => {
    set(
      (state) => {
        if (form === "login") {
          state.forms.login = initialLoginForm;
        } else if (form === "register") {
          state.forms.register = initialRegisterForm;
        }
      },
      undefined,
      "resetForm"
    );
  },
});

export default createFormsSlice;
