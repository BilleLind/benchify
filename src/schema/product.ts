import type { FastifySchema, RouteShorthandOptions } from 'fastify'
import { FromSchema } from 'json-schema-to-ts'

export const productSchema = {
	$id: 'product',
	type: 'object',
	required: ['title', 'description', 'price', 'category'],
	properties: {
		id: { type: 'integer' },
		title: { type: 'string' },
		description: { type: 'string' },
		price: { type: 'integer' },
		featureImage: { type: 'string' },
		category: { type: 'string' },
		tags: {
			type: 'array',
			items: { type: 'string' },
		},
	},
	additionalProperties: false,
} as const

export type Product = FromSchema<typeof productSchema>

//object
export const categorySchema = {
	$id: 'category',
	type: 'object',
	properties: {
		title: 'string',
		products: { type: 'array', $ref: 'product#' },
	},
	required: ['title'],
} as const

export const specificProductId = {
	type: 'object',
	required: ['id'],
	properties: {
		id: { type: 'number' },
	},
	additionalProperties: false,
} as const

export type ProductId = FromSchema<typeof specificProductId>

export const errorSchema = {
	type: 'object',
	required: ['error'],
	properties: {
		error: { type: 'string' },
	},
	additionalProperties: false,
} as const

export type Error = FromSchema<typeof errorSchema>

export const productReplySchema = {
	type: 'object',
	required: ['product'],
	properties: {
		product: {
			type: 'object',
			required: ['title', 'description', 'price', 'category'],
			properties: {
				id: { type: 'integer' },
				title: { type: 'string' },
				description: { type: 'string' },
				price: { type: 'integer' },
				featureImage: { type: 'string' },
				category: { type: 'string' },
				tags: {
					type: 'array',
					items: { type: 'string' },
				},
			},
			additionalProperties: false,
		},
	},
	additionalProperties: false,
} as const

export type ProductReply = FromSchema<typeof productReplySchema>

export const productsReplySchema = {
	type: 'object',
	required: ['products'],
	properties: {
		products: {
			type: 'array',
				items: {
					type: 'object',
					required: ['title', 'description', 'price', 'category'],
					properties: {
						id: { type: 'integer' },
						title: { type: 'string' },
						description: { type: 'string' },
						price: { type: 'integer' },
						featureImage: { type: 'string' },
						category: { type: 'string' },
						tags: {
							type: 'array',
							items: { type: 'string' },
							additionalProperties: false,
						},
					},
					additionalProperties: false,
				},
		},
	},
	additionalProperties: false,
} as const

export type ProductsReply = FromSchema<typeof productsReplySchema>
