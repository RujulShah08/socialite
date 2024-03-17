const checkValidatorRules = {

    sigupValidation: {
        first_name: "required",
        last_name: "required",
        dob: "required",
        mobile: "required|digits_between:10,14",
        email: "required|email",
        password: "required",
        // token: "required",
        // device_type: "required|in:A,I"
    },

    otpValidation: {
        email: "required",
        otp: "required"
    },

    resendotpValidation: {
        mobile: "required"
    },

    loginValidation: {
        emailmobile: "required",
        password: "required"
    },

    updatePasswordValidation: {
        mobile: "required",
        new_password: "required"
    }
}

module.exports = checkValidatorRules;

