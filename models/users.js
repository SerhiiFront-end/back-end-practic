import mongoose from "mongoose"

const UsersSchema = new mongoose.Schema({
	fullname: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		uniqut: true,
	},
    passwordHash: {
        type: String,
        required: true
    }
    avatarUrl: String,
},{
    timestamps: true,
})

export default mongoose.model('User', UsersSchema)