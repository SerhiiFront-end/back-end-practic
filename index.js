import express from "express"
// import jwt from "jsonwebtoken"
import { validationResult } from "express-validator"
import mongoose from "mongoose"
import { registerValidator } from "./validations/auth.js"

mongoose
	.connect(
		"mongodb+srv://admin:12345@db.nwmowaj.mongodb.net/?retryWrites=true&w=majority"
	)
	.then(() => console.log("DB ok"))
	.catch((err) => console.log("DB ERROR", err))

const app = express()

app.use(express.json())

app.get("/", (req, res) => {
	res.send("Hello")
})
app.post("/reg", registerValidator, (req, res) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		return res.status(400).json(errors.array())
	}
	res.json({
		success: true,
	})
})
app.listen("3333", (err) => {
	if (err) {
		return console.log(err)
	}
	console.log("Server is working!")
})
