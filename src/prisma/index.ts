'use strict'
import { PrismaClient } from '@prisma/client'
import { FastifyInstance, RouteShorthandOptions } from 'fastify'

import { ProductReply, productReplySchema, productsReplySchema, ProductsReply, ProductId, specificProductId, Error, errorSchema } from '../schema/product'

import { getProductsSchema, getSpecificProductSchema,getSpecificTagProductsSchema, getSpecificCategoryProductsSchema } from '../schema/product'

// individual schema
import { productSchema, productsSchema, titleSchema } from '../schema/product'

//Types
import { Title } from '../schema/product'

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
			schema: {
				response: {
					200: productsSchema,
					404: errorSchema
				},
			},
		},
		async function (request, reply) {
			try {
				const products = await prisma.product.findMany()
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
			schema: {
				params: specificProductId,
				response: {
					200: productSchema,
					404: errorSchema,
				},
			},
		},
		async function (request, reply) {
			try {
				const { id } = request.params
				var int_id = await parseInt(id)
				const product = await prisma.product.findUnique({ where: { id: int_id }, include: { tags: true } })
				reply.code(200).send({ product: product })
			} catch (error) {
				reply.code(404).send({ error: 'Product not found' })
			}
		}
	)

	// Get Products from Tag
	fastify.get<{ Params: Title }>(
		'/products/tags/:title',
		{
			schema: {
				params: titleSchema,
				response: {
					200: getSpecificTagProductsSchema,
					404: errorSchema,
				},
			},
		},
		async function (request, reply) {
			try {
				const { title } = request.params
				const tag = await prisma.tags.findUnique({ where: { title: title }, include: { products: true } })
				reply.code(200).send({tag})
			} catch (error) {
				reply.code(404).send({ error: 'Tag or products not found not found' })
			}
		}
	)

	// Get Products from Category
	fastify.get<{ Params: Title }>(
		'/products/category/:title',
		{
			schema: {
				params: titleSchema,
				response: {
					200: getSpecificCategoryProductsSchema,
					404: errorSchema,
				},
			},
		},
		async function (request, reply) {
			try {
				const { title } = request.params
				const category = await prisma.category.findUnique({ where: { title: title }, include: { products: true } })
				reply.code(200).send({category})
			} catch (error) {
				reply.code(404).send({ error: 'Tategory not found' })
			}
		}
	)

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
