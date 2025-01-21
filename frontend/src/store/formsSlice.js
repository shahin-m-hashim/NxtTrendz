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
        let result;

        const { register } = state.forms;

        register[field].value = value;

        if (field === "username") {
          result = usernameSchema.safeParse(value);
          if (!result.success) {
            register.username.error = result.error.issues[0].message;
          } else {
            register.username.error = null;
          }
        } else if (field === "password") {
          result = passwordSchema.safeParse(value);
          if (!result.success) {
            register.password.error = result.error.issues[0].message;
          } else {
            register.password.error = null;
          }
        } else if (field === "confirmPassword") {
          const { password, confirmPassword } = register;
          if (password.value !== confirmPassword.value) {
            register.confirmPassword.error = "Passwords do not match";
          } else {
            register.confirmPassword.error = null;
          }
        }
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
