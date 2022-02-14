import { hash, compare } from 'bcryptjs'

export const hashPassword = async (password) => await hash(password, 12)

export const verifyPassword = async (password, hashedPassword) =>
  await compare(password, hashedPassword)
