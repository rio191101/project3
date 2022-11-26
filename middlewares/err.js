const err = (error, req, res, next) => {
  let code;
  let message;

  switch (error.name) {
    case 'SequelizeValidationError':
      code = 400;
      message = error.errors.map((error) => error.message);
      break;
    case 'SequelizeUniqueConstraintError':
      code = 400;
      message = error.errors.map((error) => error.message);
      break;
    case 'JsonWebTokenError':
      code = 401;
      message = 'Token JWT Error';
      break;
    case 'SequelizeForeignKeyConstraintError':
      code = 400;
      message = `Gagal menambahkan data ${error.table}. Data pada tabel yang berelasi tidak ditemukan`;
      break;
    case 'PageNotFound':
      code = 404;
      message = '404 Page Not Found';
      break;
    default:
      code = 500;
      message = 'Internal Server Error';
      break;
  }

  res.status(code).json({ message });
};

module.exports = err;
