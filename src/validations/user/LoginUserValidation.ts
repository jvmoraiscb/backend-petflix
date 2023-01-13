import * as yup from 'yup';

let UserSchema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required()
});

const LoginUserValidation = async (body: any): Promise<void> => {
    const isValid = await UserSchema.isValid(body);

    if (!isValid) {
        throw new Error(
            'Missing or invalid parameters! Required fields: email and password'
        );
    }
};

export { LoginUserValidation };
