import crypto from "node:crypto"
import { Widgets } from "./dbConnections"

class Product {
	constructor(id, { name, description, price, soldout, inventory, stores }) {
		this.id = id
		this.name = name
		this.description = description
		this.price = price
		this.soldout = soldout
		this.inventory = inventory
		this.stores = stores
	}
}

const productDatabase = {}

const resolvers = {
	getProduct: async ({ id }) => {
		try {
			const product = await Widgets.findById(id)
			return product
		} catch (error) {
			throw new Error(error)
		}
	},
	getAllProducts: async () => {
		try {
			return await Widgets.find({})
		} catch (error) {
			throw new Error(error)
		}
	},
	createProduct: async ({ input }) => {
		const newWidget = new Widgets({
			name: input.name,
			description: input.description,
			price: input.price,
			soldout: input.soldout,
			inventory: input.inventory,
			stores: input.stores,
		})

		newWidget.id = newWidget._id

		try {
			await newWidget.save()
			return newWidget
		} catch (error) {
			throw new Error(error)
		}
	},
	updateProduct: async ({ input }) => {
		try {
			const updatedWidget = await Widgets.findByIdAndUpdate(input.id, input, {
				new: true,
			})
			return updatedWidget
		} catch (error) {
			throw new Error(error)
		}
	},
	deleteProduct: async ({ id }) => {
		try {
			await Widgets.deleteOne({ _id: id })
			return "Successfully removed the product!"
		} catch (error) {
			throw new Error(error)
		}
	},
}

export default resolvers
