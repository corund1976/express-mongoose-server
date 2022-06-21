const validateId = (req, res, next) => {
  const { id } = req.params
  // const objId = /^[0-9a-fA-F]{24}$/
  const objId = new RegExp(/^[0-9a-fA-F]{24}$/)

  if (!id.match(objId)) {
    return res
      .status(400)
      .json({
        status: 'Bad request',
        code: 400,
        message: `Not valid contact id ${id}`,
      })
  }

  next()
}

export { validateId }