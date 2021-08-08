var studentModle = require('./Modules/Students');

class GetAllStudents {
    async input(req, message) {

    }
    async process(message) {

        try {
            message.STATUS = 'Success';
            message.STUDENTS = await studentModle.getAllStudents(message);
        }
        catch (ex) {
            message.RESP_MSG = 'Technical error occured, contact support.'
            message.STATUS = 'InternalServerError';
        }
    }
    async output(res, message) {
        res.responseBody.message = message.RESP_MSG;
        res.responseBody.students = message.STUDENTS;
        res.status = message.STATUS;    
    }
    inputValidation(req) {

    }

}
module.exports = new GetAllStudents();
