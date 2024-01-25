
import * as Yup from 'yup';

const postValidationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).max(255),
  content: Yup.string().required().min(10).max(500),
  userId: Yup.string().required(),
});

export default postValidationSchema;
