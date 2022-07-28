import { PrismaClient } from '@prisma/client'
import { FastifyInstance, RouteShorthandOptions } from 'fastify'

import { ProductReply, productReplySchema, productsReplySchema, ProductsReply, ProductId, specificProductId, Error, errorSchema } from '../schema/product'

export const prismaRoutes = async function (fastify: FastifyInstance, opts) {
	const prisma = new PrismaClient()
	//Prisma check "/"
	fastify.get(
		'/',
		{
			schema: {
				response: {
					200: {
						type: 'object',
						properties: {
							route: { type: 'string' },
						},
					},
					404: {
						errorSchema,
					},
				},
			},
		},
		async function (request, reply) {
			try {
				reply.send({ route: 'prisma' })
			} catch (error) {
				reply.status(404).send({ error: 'Prisma Route Error' })
			}
		}
	)

	// All Products
	fastify.get<{ Reply: ProductsReply | Error }>(
		'/products',
		{
			schema: {
				response: {
					200: { productsReplySchema },
					404: {
						errorSchema,
					},
				},
			},
		},
		async function (request, reply) {
			const products = await prisma.product.findMany()
			if (products) {
				reply.send({ products })
			} else {
				reply.status(404).send({ error: 'Error retrieving Products' })
			}
		}
	)

	// Get Specific Product via id
	fastify.get<{ Params: ProductId; Reply: ProductReply | Error }>(
		'/product/:id',
		{
			schema: {
				params: {
					specificProductId,
				},
				response: {
					200: {
						productReplySchema,
					},
					404: {
						errorSchema,
					},
				},
			},
		} as const,
		async function (request, reply) {
			const { id } = request.params
			const product = await prisma.product.findUnique({ where: { id: id } })
			if (product) {
				reply.status(200).send({ product })
			} else {
				reply.status(404).send({ error: 'Product not found' })
			}
		}
	)

	/*
	//retrieve tags
	fastify.route({
		method: 'get',
		url: '/products/tags',
		schema: {
			response: {
				200: {
					type: 'object',
					properties: {
						titel: { type: String },
						products: { type: Array },
					},
				},
			},
		} as const,
	})
*/

	/*
//pagination
	// eg. .../pg?current=0&take=10
	const pg = {
		type: 'object',
		properties: {
			current: { type: 'integer', default: 0 },
			take: { type: 'integer', default: 10 },
		},
	} as const

	 fastify.route({
		method: 'GET',
		url: '/products/pg',
		schema: paginationSchema,
		handler: async (request, response) => {
			const { current, take } = request.query
			// validate that the current and take can't fetch more than there are
			const products = await prisma.product.findMany({
				skip: current,
				take: take,
			})

			response.send(products)
		},
	}) */
}
