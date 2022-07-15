import dotenv from 'dotenv'
dotenv.config()
import Fastify from "fastify";


function build(opts={}) {
  const fastify = Fastify(opts)


  fastify.get('/', async(request,reply) => {
    reply.send({route: "root"})
  })


  return fastify
}

export default build
