import { body } from "express-validator"

export const registerValidator = [body("email").isEmail()]
