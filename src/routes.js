import User from './db/schemas/user-schema.js'
import { encryptionPassword, comparePassword } from './utils/crypto-utils.js';
import jwt from 'jsonwebtoken'

export function registerRoutes(app) {
  // function qui récupère les données de la base de données
  app.get('/users', async function handler(request, reply) {
    const users = await User.find()
    return users
  })

  app.get('/users/:id', async function handler(request, reply) {
    const user = await User.findById(request.params.id)
    return user
  })

  app.post('/users', async function handler(request, reply) {
    const user = new User({
      username: request.body.username,
      email: request.body.email,
      password: await encryptionPassword(request.body.password)
    })
    await user.save()
    console.log('user saved')
    return request.body
  })


  app.post('/auth/token', async function handler(request, reply) {
    // on cherche l'utilisateur par son username ou son email
    const user = await User.findOne({
      $or: [
        { username: request.body.username },
        { email: request.body.username }
      ]
    })

    const email = user.email

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    console.log('email', email)
    console.log('user', user)

    if (user === null) {
      return reply.status(401).send({ error: 'this user doesn\'t exit' })
    }
    const isSamePassword = await comparePassword(request.body.password, user.password)
    if (!isSamePassword) {
      return reply.status(401).send({ error: 'password is incorrect' })
    }
    console.log('user connected')
    return reply.status(201).send({ email });

  })
}