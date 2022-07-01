import multer from 'multer'
import path from 'path'
import fs from 'fs/promises';

const uploadDir = path.join(process.cwd(), 'tmp'); // задаем путь для папки для хранения временно загружаемых аватарок

const createFolderIsNotExist = async folder => { // Вспомогат.функция создания такой папки, если она еще не существует
  fs
    .stat(folder) // проверка существует ли уже такая папка
    .catch(async (err) => {
      if (err.message.includes('no such file or directory')) {
        await fs.mkdir(folder); //создание такой папки, если она еще не существует
      }
    })
}

createFolderIsNotExist(uploadDir); // Создаем папку для временного хранения загружаемых аватарок

const storage = multer.diskStorage({ // Создаем движок дискового пространства DiskStorage
  destination: (req, file, cb) => { // папка для временного хранения загруженных аватарок
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => { // название файла для временно загруженной аватарки
    cb(null, file.originalname); // (null, new Date().toISOString() + '-' + file.originalname)
  },
  limits: {
    fileSize: 2 * 1024 * 1024,
  },
});

const fileFilter = (req, file, cb) => { // проверка файла на соответствие типу
  const types = ['image/png', 'image/jpeg', 'image/jpg'] // типы допускаемых к загрузке файлов изображений

  if (types.includes(file.mimetype)) {
    cb(null, true)
    return
  }

  const err = new Error('Формат загруженного изображения не корректный')
  err.status = 400
  cb(err)
}

const upload = multer({ storage, fileFilter }); // Создаем экземпляр multer

const uploadImage = upload.single('avatar');

export default uploadImage