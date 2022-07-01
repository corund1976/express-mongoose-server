import Jimp from 'jimp';
import path from 'path'
import fs from 'fs/promises';

const storeDir = path.join(process.cwd(), 'public/avatars'); // задаем путь для папки для хранения обработанных аватарок

const createFolderIsNotExist = async folder => { // Вспомогат.функция создания такой папки, если она еще не существует
  fs
    .stat(folder) // проверка существует ли уже такая папка
    .catch(async (err) => {
      if (err.message.includes('no such file or directory')) {
        await fs.mkdir(folder); //создание такой папки, если она еще не существует
      }
    })
}

createFolderIsNotExist(storeDir); // Создаем папку для хранения обработанных аватарок

const manipulateImage = async (req, res, next) => {
  const { id } = req.user
  // req.file = {
  //   fieldname: 'avatar',
  //   originalname: 'Фото Резюме 1_1.jpg',
  //   encoding: '7bit',
  //   mimetype: 'image/jpeg',
  //   destination: 'C:\\Projects\\express-mongoose-server\\tmp',
  //   filename: 'Фото Резюме 1_1.jpg',
  //   path: 'C:\\Projects\\express-mongoose-server\\tmp\\Фото Резюме 1_1.jpg',
  //   size: 171399
  // }
  const { originalname, path: pathTempUploadedFile } = req.file;

  const fileName = id + '-' + originalname // при сохранении добавляем имя пользователя в имя файла аватарки
  // console.log('fileName = ', fileName); //  62bdb022846f8ca667342caa-Фото Резюме 1_1.jpg
  const filePath = path.join(storeDir, fileName);
  // console.log('filePath =', filePath); // C:\Projects\express-mongoose-server\public\avatars\62bdb022846f8ca667342caa-Фото Резюме 1_1.jpg
  try {
    const imageFile = await Jimp.read(pathTempUploadedFile)
    imageFile.resize(250, 250).quality(70).write(filePath); // resize, reduce & save to new folder
    await fs.unlink(pathTempUploadedFile); // удаляю загруженный файл из временной папки
  } catch (e) {
    console.error(e);
    next(e)
  }

  req.file.filename = fileName // перезаписываю в обьект запроса новое измененное имя файла

  next()
}

export default manipulateImage
