import * as Yup from "yup"

export const validationSchema = Yup.object().shape({
    email: Yup.string().required("email_required").email("email_required"),
    password: Yup.string()
        .required("password_required")
        .min(8, "password_length")
        .max(20, "password_exceed"),
})

export const emailvalidationSchema = Yup.object().shape({
    email: Yup.string().required("email_required").email("email_required"),
})

export const passwordvalidationSchema = Yup.object().shape({
    password: Yup.string()
        .required("password_required")
        .min(8, "password_length")
        .max(20, "password_exceed"),
    confirmPassword: Yup.string().oneOf([Yup.ref("password"), null], "password_match"),
})
