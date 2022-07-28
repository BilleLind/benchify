import dotenv from 'dotenv'
dotenv.config()
import * as Fastify from 'fastify'

import {prismaRoutes} from './prisma/index'

function build(opts={}) {
  const fastify : Fastify.FastifyInstance = Fastify.fastify(opts)

  
  fastify.route ({
    method: 'GET',
    url: '/',
    schema: {
      response: {200:{
        type: 'object',
        properties : {
          route: {type: 'string'}
        }
      }
    }}as const,
    handler: async (request, reply) =>{
        reply.send({route: "Root"})
    }
  })

  fastify.register(prismaRoutes, {prefix: '/prisma'})

  return fastify
}

export default build
