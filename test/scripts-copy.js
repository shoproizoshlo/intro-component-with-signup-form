// creating function that get form selector
const validateForm = (formSelector) => {
  const formElement = document.querySelector(formSelector);

  // items in array have object and 3 properties
  const validationOptions = [
    {
      attribute: "required",
      isValid: (input) => input.value.trim() !== "",
      errorMessage: (input, label) => `${label.textContent} cannot be empty`,
    },
  ];

  // validate single form group
  const validateSingleFormGroup = (formGroup) => {
    const input = formGroup.querySelector("input, textarea");
    const label = formGroup.querySelector("label");
    const errorContainer = formGroup.querySelector(".error");
    const errorIcon = formGroup.querySelector(".error-icon");

    let formGroupError = false;
    // validation rules that loop through then check the input egainst each of rules and trigger right error message
    for (const option of validationOptions) {
      if (input.hasAttribute(option.attribute) && !option.isValid(input)) {
        errorContainer.textContent = option.errorMessage(input, label);
        formGroupError = true;
      }
    }
    if (!formGroupError) {
      errorContainer.textContent = "";
    }
  };

  // disabling HTML standart validation
  formElement.setAttribute("novalidate", "");

  //adding our validation
  formElement.addEventListener("submit", (event) => {
    // prevent page reload after submit
    event.preventDefault();

    validateAllFormGroups(formElement);
  });

  // validate all formGroup
  const validateAllFormGroups = (formToValidate) => {
    const formGroups = Array.from(
      formToValidate.querySelectorAll(".formGroup")
    );

    formGroups.forEach((formGroup) => {
      validateSingleFormGroup(formGroup);
    });
  };
};

validateForm("#registrationForm");
