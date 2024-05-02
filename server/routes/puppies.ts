import express from 'express'
import * as store from '../store'

const router = express.Router()

router.get('/', async (req, res) => {
  const data = await store.getPuppies()
  res.json(data)
})

router.get('/:id', async (req, res) => {
  const id = Number(req.params.id)
  console.log(id)
  const puppy = await store.getPuppyById(id)

  if (puppy) {
    res.json(puppy)
  } else {
    res.sendStatus(404)
  }
})

router.patch('/:id', async (req, res) => {
  try {
    const id = Number(req.params.id)
    await store.updatePuppy(id, req.body)
    res.sendStatus(204)
  } catch (error) {
    console.error(error)
    res.sendStatus(500)
  }
})

export default router
