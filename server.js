import { build } from './app.js'

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
	},
})

server.listen({ port: process.env.PORT || 3000, host: '0.0.0.0'}, (err, address) => {
	if (err) {
		server.log.error(err)
		process.exit(1)
	}
})
