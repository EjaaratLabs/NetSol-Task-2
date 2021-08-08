const { param } = require('express-validator');
const dbmgr = require('../../../custom_modules/dbInstance');
var client = dbmgr.getDbClient();

class Students {
    async createNewStudent(message) {

        var results = await client.Query("insert into students(regnum,name,phone,gurdianphone,email,status,dateofbirth,cnic) values(?,?,?,?,?,?,STR_TO_DATE(?, '%Y-%m-%d'),?)",
            [message.REG_NUM, message.NAME, message.PHONE, message.GURDIAN_PHONE, message.EMAIL, '1', message.DOB, message.CNIC]);
    }
    async getStudentByCnic(message) {
        var results = await client.Query("select 	regnum,name from students where cnic=? and students.status!='0'",
            [message.CNIC]);
        return results && results.length > 0 ? results[0] : null
    }
    async getAllStudents(message) {
        var results = await client.Query("select 	students.regnum as regNum,students.name,students.phone,students.gurdianphone as gurdianPhone,students.createdon as createdOn,students.email,students.dateofbirth as dateOfBirth,students.cnic,student_status.name as status from students inner join student_status on student_status.id=students.status where students.status!='0'",
            []);
        return results && results.length > 0 ? results : null
    }
    async getStudentStauts(message) {
        var results = await client.Query("select id,name from student_status where id=?",
            [message.STU_STATUS]);
        return results && results.length > 0 ? results[0] : null
    }
    async getStudentDetailByRegNum(message) {
        var results = await client.Query("select 	students.regnum as regNum,students.name,students.phone,students.gurdianphone as gurdianPhone,students.createdon as createdOn,students.email,students.dateofbirth as dateOfBirth,students.cnic,student_status.name as status from students inner join student_status on student_status.id=students.status where students.regnum=? and students.status!='0'",
            [message.REG_NUM]);
        return results && results.length > 0 ? results[0] : null
    }
    async deleteStudent(message) {

        var results = await client.Query("update students set status='0' where regnum=?",
            [message.REG_NUM]);
    }
    async updateStudent(message) {
        var updateQuery = '';
        var params = [];
        if (message.NAME) {
            updateQuery += 'name=?,'
            params.push(message.NAME);
        }
        if (message.PHONE) {
            updateQuery += 'phone=?,'
            params.push(message.PHONE);
        }
        if (message.GURDIAN_PHONE) {
            updateQuery += 'gurdianphone=?,'
            params.push(message.GURDIAN_PHONE);
        }
        if (message.EMAIL) {
            updateQuery += 'email=?,'
            params.push(message.EMAIL);
        }
        if (message.STU_STATUS) {
            updateQuery += 'status=?,'
            params.push(message.STU_STATUS);
        }
        if (message.DOB) {
            updateQuery += 'dateofbirth=?,'
            params.push(message.DOB);
        }
        if (message.CNIC) {
            updateQuery += 'cnic=?,'
            params.push(message.CNIC);
        }
        if (updateQuery) {
            params.push(message.REG_NUM);
            updateQuery = updateQuery.substr(0, updateQuery.length - 1);
            var query = "update students set " + updateQuery + " where regnum=?";
          
            var results = await client.Query(query,
                params);
        }
    }

}
module.exports = new Students();