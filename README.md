# benchify
 
 Goal of benchify is to benchmark the different database connections
 
 The schema consists of a simple schema for at e-commerce database, with the tables
 * Product
  - titel: string(varChar(255))
  - description String (text)
  - price int
  - category String(text)
  - tags array
  - featureImage String(text)
 * Category
  - titel: string(varChar(255))
  - products[]: ref => product
 * Tags
  - titel: string(varChar(255))
  - products[]: ref => tags

 ## benchmarks criteria
  showcase normal queries used in the day to day, eg.
  - get all products
  - get products, paginated
  - get specific products
  - get products by tag
  - get products by category
  
  Possible additional
  - create product
  - edit product, eg. price, text
  

## Included
  WIP

## Roadmap

ORM's
---
- [ ] Prisma
- [ ] TypeOrm
- [ ] Sequlize
- [ ] Knex
  
SQL
---
- [ ] [Postgres](https://github.com/fastify/fastify-postgres)


NoSQL
---
- [ ] [MongoDB](https://github.com/fastify/fastify-mongodb)

ODM's
---
- [ ] Mongoose




### Prisma
---

Database Creation:
  npx prisma migrate dev --name init
