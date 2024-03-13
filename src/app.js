import Fastify from 'fastify'
import cors from '@fastify/cors'

import { registerRoutes } from './routes.js';


const app = Fastify({
    logger: true
})

await app.register(cors, {
    // put your options here
})

registerRoutes(app)

export default app

