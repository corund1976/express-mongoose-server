import createError from 'http-errors'

const checkValidId = (req, res, next) => {
  const { id } = req.params

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    res.status(400).json({
      status: 'Bad request',
      code: 400,
      message: `Not valid contact id ${id}`,
    })
    // next({ status: 400 })
    next(createError(400));
  }

  next()
}

export default checkValidId