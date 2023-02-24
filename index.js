import express from "express"
// import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import mongoose from "mongoose"

import userModel from "./models/users.js"
import { registerValidator } from "./validations/auth.js"

mongoose
	.connect(
		"mongodb+srv://admin:1@cluster0.yjj74tp.mongodb.net/blog?retryWrites=true&w=majority"
	)
	.then(() => console.log("DB ok"))
	.catch((err) => console.log("DB ERROR", err))

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
	res.send("Hello")
})
app.post("/reg", registerValidator, async (req, res) => {
	try {
		const errors = validationResult(req)
		if (!errors.isEmpty()) {
			return res.status(400).json(errors.array())
		}

		const doc = new userModel({
			email: req.body.email,
		})
		const user = await doc.save()

		res.json(user)
	} catch (err) {
		res.status(500).json({
			success: false,
		})
	}
})
app.listen("3333", (err) => {
	if (err) {
		return console.log(err)
	}
	console.log(`Server started on port: ${3333}`)
})
