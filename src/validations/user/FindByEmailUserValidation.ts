import * as yup from 'yup';

let UserSchema = yup.object().shape({
    email: yup.string().email().required()
});

const FindByEmailUserValidation = async (body: any): Promise<void> => {
    const isValid = await UserSchema.isValid(body);

    if (!isValid) {
        throw new Error('Missing or invalid parameters');
    }
};

export { FindByEmailUserValidation };
