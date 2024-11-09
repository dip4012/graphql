import { buildSchema } from "graphql"

const schema = buildSchema(`   
    type Store {
        store: String
    }

    enum Soldout {
        SOLDOUT
        ONSALE
    }

    type Product {
        id: ID,
        name: String,
        description: String,
        price: Float,
        soldout: Soldout,
        inventory: Int
        stores: [Store]!
    }

    type Query {
        getProduct(id: ID): Product
    }

    input StoreInput {
        store: String
    }

    input ProductInput {
        name: String,
        description: String,
        price: Float,
        soldout: Soldout,
        inventory: Int
        stores: [StoreInput]!
    }

    type Mutation {
        createProduct(input: ProductInput): Product
    }
`)

export default schema
