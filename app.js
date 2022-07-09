import dotenv from 'dotenv'
dotenv.config()

import fastify from 'fastify'

export const build = (opts = {}) => {
	const app = fastify(opts)

	// Plugins go here
	
  
	return app
}


