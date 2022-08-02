import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const tags = [
	{
		title: 'first',
	},
	{
		title: 'second',
	},
	{
		title: 'third',
	},
	{
		title: 'fourth',
	},
]

const category = [
	{
		title: 'cate1',
	},
	{
		title: 'cate2',
	},
	{
		title: 'cate3',
	},
	{
		title: 'cate4',
	},
	{
		title: 'cate5',
	},
]

const products: Prisma.ProductCreateInput[] = [
	{
		title: 'first',
		description: 'descriptive text',
		price: 123,
		tags: { connect: [{ title: 'first' }] },
		categoryRef: { connect: { title: 'cate1' } },
	},
	{
		title: 'second',
		description: 'descriptive text',
		price: 1234,
		tags: { connect: [{ title: 'second' }] },
		categoryRef: { connect: { title: 'cate2' } },
	},
	{
		title: 'third',
		description: 'descriptive text',
		price: 1235,
		tags: { connect: [{ title: 'third' }] },
		categoryRef: { connect: { title: 'cate3' } },
	},
	{
		title: 'fourth',
		description: 'descriptive text',
		price: 10,
		tags: { connect: [{ title: 'first' }, { title: 'fourth' }] },
		categoryRef: { connect: { title: 'cate4' } },
	},
	{
		title: 'fifth',
		description: 'descriptive text',
		price: 123,
		tags: { connect: [{ title: 'first' }] },
		categoryRef: { connect: { title: 'cate5' } },
	},
]

async function main() {
	console.log(`Tags: Start seeding ...`)
	for (const u of tags) {
		const tags = await prisma.tags.create({
			data: u,
		})
		console.log(`Created tags with id: ${tags.title}`)
	}
	console.log(`Tags: Seeding finished.`)

	console.log(`Category: Start seeding ...`)

	for (const u of category) {
		const Category = await prisma.category.create({
			data: u,
		})
		console.log(`Created Category with id: ${Category.title}`)
	}
	console.log(`Category: Seeding finished.`)

	console.log(`products: Start seeding ...`)
	for (const u of products) {
		const product = await prisma.product.create({
			data: u,
		})
		console.log(`Created tags with id: ${product.title}`)
	}
	console.log(`products: Seeding finished.`)
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async (e) => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
