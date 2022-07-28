import build from './app'
import { JsonSchemaToTsProvider } from '@fastify/type-provider-json-schema-to-ts'
import {FastifyInstance} from 'fastify'
import { Server, IncomingMessage, ServerResponse } from 'http';

const server = build({
  logger: {
    transport:
			process.env.NODE_ENV === 'development'
				? {
						target: 'pino-pretty',
						options: {
							translateTime: 'HH:MM:ss Z',
							ignore: 'pid,hostname',
						},
				  }
				: undefined,
  }
}).withTypeProvider<JsonSchemaToTsProvider>()

server.listen({port: 3002, host: "0.0.0.0"}, (err, address)=> {
  if(err) {
    server.log.error(err)
    process.exit(1)
  }
})
