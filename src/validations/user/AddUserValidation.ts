import * as yup from 'yup';

let UserSchema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required()
});

const AddUserValidation = async (body: any): Promise<void> => {
    const isValid = await UserSchema.isValid(body);

    if (!isValid) {
        throw new Error('Missing or invalid parameters');
    }
};

export { AddUserValidation };
