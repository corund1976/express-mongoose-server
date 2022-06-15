import { listContacts, getContactById, addContact, updateContact, updateStatusContact, removeContact } from '../service/contactService.js'

const getAll = async (req, res, next) => {
  // ничего не получает
  // вызывает функцию listContacts
  // возвращает массив всех контактов в json - формате со статусом 200
  try {
    const result = await listContacts()
    res.json({
      status: 'Ok',
      code: 200,
      data: { contacts: result },
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const getById = async (req, res, next) => {
  // Не получает body, но Получает параметр id
  // вызывает функцию getById
  // если такой id есть, возвращает объект контакта в json - формате со статусом 200
  // если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
  const { id } = req.params

  try {
    const result = await getContactById(id)

    if (result) {
      res.json({
        status: 'Ok',
        code: 200,
        data: { contact: result },
      })
    } else {
      res.status(404).json({
        status: 'Not found',
        code: 404,
        message: `Not found contact id: ${id}`,
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const create = async (req, res, next) => {
  // Получает body в формате { name, email, phone } (все поля обязательны)
  // Если в body нет каких - то обязательных полей, возвращает json с ключом { "message": "missing required name field" } и статусом 400
  // Вызывает функцию addContact(body) для сохранения контакта 
  // По результату работы функции возвращает объект с добавленным id { id, name, email, phone } и статусом 201
  try {
    const newContact = req.body
    const result = await addContact(newContact)

    res.status(201).json({
      status: 'Created',
      code: 201,
      data: { contact: result }
    })
  } catch (e) {
    console.error(e)
    next(e)
  }
}

const update = (req, res) => {
  // Получает параметр id
  // Получает body в json - формате c обновлением любых полей name, email и phone
  // Если body нет, возвращает json с ключом { "message": "missing fields" } и статусом 400
  // Если с body все хорошо, вызывает функцию updateContact(contactId, body)(напиши ее) для обновления контакта в файле contacts.json
  // По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
}

const updateFavorite = (req, res) => {
  res.send('<h1>route = /todo/create</h1>')
  // Получает параметр contactId
  // Получает body в json - формате c обновлением поля favorite
  // Если body нет, возвращает json с ключом { "message": "missing field favorite" } и статусом 400
  // Если с body все хорошо, вызывает функцию updateStatusContact(contactId, body)(напиши ее) для обновления контакта в базе
  // По результату работы функции возвращает обновленный объект контакта и статусом 200. В противном случае, возвращает json с ключом "message": "Not found" и статусом 404
}

const remove = async (req, res, next) => {
  // Не получает body, но Получает параметр id
  // вызывает функцию removeContact 
  // если такой id есть, возвращает json формата { "message": "contact deleted" } и статусом 200
  // если такого id нет, возвращает json с ключом "message": "Not found" и статусом 404
  const { id } = req.params

  try {
    const result = await removeContact(id)

    if (result) {
      res.json({
        status: 'Ok',
        code: 200,
        message: 'Contact deleted'
      })
    } else {
      res.json({
        status: 'Not found',
        code: 404,
        message: `Not found contact id: ${id}`
      })
    }
  } catch (e) {
    console.error(e)
    next(e)
  }
}

// Для маршрутов, что принимают данные(POST и PUT), продумайте проверку(валидацию) 
// принимаемых данных.Для валидации принимаемых данных используйте пакет joi

export {
  getAll,
  getById,
  create,
  update,
  updateFavorite,
  remove,
}