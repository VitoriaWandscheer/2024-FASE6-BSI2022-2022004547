import { connect } from '../database'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import { refresh, sign, verify } from '../services/jwt'
import bcrypt from 'bcrypt'

export const createToken: RequestHandler = async (req, res) => {
    console.log(1)
}

export const verifyToken: RequestHandler = (req, res) => {
    console.log(2)
}

export const refreshToken: RequestHandler = (req, res) => {
    console.log(3)
}

export default {
    createToken,
    verifyToken,
    refreshToken
}