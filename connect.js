const mysql = require('mysql2/promise');
require('dotenv').config();

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

async function connectToDatabase() {
  try {
    // Kiểm tra kết nối bằng cách lấy một kết nối từ pool
    const connection = await pool.getConnection();
    console.log('Kết nối cơ sở dữ liệu thành công');
    connection.release(); // Giải phóng kết nối
  } catch (error) {
    console.error('Kết nối cơ sở dữ liệu thất bại:', error.message);
    throw error;
  }
}

(async () => {
  try {
    await connectToDatabase();
    // Thực hiện các thao tác với cơ sở dữ liệu
  } catch (error) {
    console.error('Không thể kết nối cơ sở dữ liệu:', error.message);
  }
})();

// (async () => {
//   try {
//     await connectToDatabase();
//     const [rows] = await pool.query('SELECT * FROM nguoidung');
//     console.log('Dữ liệu bảng NGUOIDUNG:', rows);
//   } catch (error) {
//     console.error('Không thể lấy dữ liệu từ cơ sở dữ liệu:', error);
//   }
// })();


module.exports = pool;