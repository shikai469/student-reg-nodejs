const express = require('express');
const { establishConnection, query } = require('./localdb');

const app = express();
app.use(express.json()); 
establishConnection();

// 1. READ
app.get('/api/students', async (req, res) => {
    try {
        const results = await query('SELECT * FROM STUDENT');
        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi truy vấn dữ liệu' });
    }
});

// 2. CREATE
app.post('/api/students', async (req, res) => {
    const { SID, SNAME, EMAIL, Tutor_Id } = req.body;
    const tutorVal = Tutor_Id ? `'${Tutor_Id}'` : 'NULL';
    const sql = `INSERT INTO STUDENT (SID, SNAME, EMAIL, Tutor_Id) VALUES ('${SID}', '${SNAME}', '${EMAIL}', ${tutorVal})`;
    
    try {
        await query(sql);
        res.status(201).json({ message: 'Thêm sinh viên thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi thêm sinh viên' });
    }
});

// 3. UPDATE
app.put('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    const { SNAME, EMAIL, Tutor_Id } = req.body;
    const tutorVal = Tutor_Id ? `'${Tutor_Id}'` : 'NULL';
    const sql = `UPDATE STUDENT SET SNAME='${SNAME}', EMAIL='${EMAIL}', Tutor_Id=${tutorVal} WHERE SID='${id}'`;
    
    try {
        await query(sql);
        res.json({ message: 'Cập nhật thông tin thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi cập nhật' });
    }
});

// 4. DELETE
app.delete('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    const sql = `DELETE FROM STUDENT WHERE SID='${id}'`;
    
    try {
        await query(sql);
        res.json({ message: 'Xóa sinh viên thành công' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Lỗi khi xóa' });
    }
});

app.listen(3399, () => {
    console.log('Server is running on port 3399');
});