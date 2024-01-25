import * as Yup from 'yup';

const userValidationSchema = Yup.object().shape({
  userName: Yup.string().required().min(3).max(20),
  email: Yup.string().required().email(),
  password: Yup.string()
    .required()
    .matches(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must be strong with at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character.')
    .min(8)
    .max(20),
});

export default userValidationSchema;