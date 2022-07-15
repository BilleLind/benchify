
import { PrismaClient } from('@prisma/client')

export default async function prisma(fastify, opts) {
	const prisma = new PrismaClient()

	fastify.get('/products', async (req, res) => {
		const products = await prisma.product.findMany()
		res.send(products)
	})

	//pagination
  // eg. .../pg?current=0&take=10
	fastify.route({
		method: 'GET',
		url: '/products/pg',
		schema: {
			queryString: {
				current: { type: 'integer', default: 0 },
				take: { type: 'integer', default: 10 },
			},
			handler: async (request, response) => {
        // validate that the current and take can't fetch more than there are 
				const products = await prisma.product.findMany({
					skip: current,
					take: take,
				})

        response.send(products)
			},
		},
	})

	//retrieve specific product by id
  fastify.route({
    method: 'get',
		url: '/products/:id',
		schema: {
			params: {
				type: 'object',
				properties: {
					id: number
				}
			}
		},
		handler: async (request, response) =>{
			const product = await prisma.prisma.findUnique(request.params.id)
			response.send(product)
		}
  })

	//retrieve tags
	fastify.route({
		method: 'get',
		url: '/products/tags',
		schema: {
			response: {
				200: {
					type: 'object',
					properties: {
						
					}
				}
			}
		}
	})

	const productSchema = {
		type: 'object',
		properties: {
			id: number,
			title: {type: 'string'},
			description: {type: 'string'},
			price: {type: 'integer'},
			
		}

	}

}
