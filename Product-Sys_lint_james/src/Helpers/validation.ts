import Joi from 'joi'

export const RegisterSchema = Joi.object(
    {
        NAME: Joi.string().required(),
        EMAIL: Joi.string().required().email(),
        PASSWORD: Joi.string().required().pattern(
            new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        )

    }
)

