import * as yup from 'yup';

let UserSchema = yup.object().shape({
    token: yup.string().required()
});

const TokenUserValidation = async (body: any): Promise<void> => {
    const isValid = await UserSchema.isValid(body);

    if (!isValid) {
        throw new Error(
            'Missing or invalid parameters! Required fields: token'
        );
    }
};

export { TokenUserValidation };
