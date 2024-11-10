import mongoose from "mongoose"
import { Sequelize, DataTypes } from "sequelize"
import _ from "lodash"
import casual from "casual"

// MongoDB connection

async function connectMongo() {
	try {
		await mongoose.connect("mongodb://localhost:27017/widgets")
		console.log("Connected to MongoDB")
	} catch (error) {
		console.error("Error connecting to MongoDB", error)
	}
}

connectMongo()

const widgetSchema = new mongoose.Schema({
	name: String,
	description: String,
	price: Number,
	soldout: String,
	inventory: Number,
	stores: Array,
})

const Widgets = mongoose.model("Widgets", widgetSchema)

// SQLite3 connection

const sequelize = new Sequelize("sqlite::memory:")

const Categories = sequelize.define("Categories", {
	category: DataTypes.STRING,
	description: DataTypes.STRING,
})

async function syncAndSeedCategories() {
	try {
		await sequelize.sync({ force: true })
		console.log("SQLite connection established and Categories model synced")

		// Seed categories
		await Promise.all(
			_.times(5, () =>
				Categories.create({
					category: casual.word,
					description: casual.sentence,
				})
			)
		)

		console.log("Categories seeded")
	} catch (error) {
		console.log("Error with SQLite DB:", error)
	}
}

syncAndSeedCategories()

export { Widgets, Categories }
