'use strict'
import { PrismaClient } from '@prisma/client'
import { FastifyInstance, RouteShorthandOptions } from 'fastify'

import { ProductReply, productReplySchema, productsReplySchema, ProductsReply, ProductId, specificProductId, Error, errorSchema } from '../schema/product'

import { getProductsSchema, getSpecificProductSchema } from '../schema/product'

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
	fastify.get(
		'/products',
		{
			schema: getProductsSchema,
		},
		async function (request, reply) {
			try {
				const products = await prisma.product.findMany()
				fastify.log.info('sending products')
				fastify.log.info({ products })
				reply.status(200).send({ products: products })
			} catch (error) {
				reply.status(404).send({ error: 'Error retrieving Products' })
			}
		}
	)

	// Get Specific Product via id
	fastify.get<{ Params: ProductId; Reply: ProductReply | Error }>(
		'/products/:id',
		{
			schema: getSpecificProductSchema
		},
		async function (request, reply) {
			try {
				const { id } = request.params
				var int_id = await parseInt(id)
				fastify.log.info(id + ' | ' + int_id)
				const product = await prisma.product.findUnique({ where: { id: int_id }, include: { tags: true } })
				fastify.log.info(product)
				reply.code(200).send({ product: product })
			} catch (error) {
				reply.code(404).send({ error: 'Product not found' })
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
