var studentModle = require('./Modules/Students');

class DeleteStudentDetails {
    async input(req, message) {
        message.REG_NUM = req.params.studentID
    }
    async process(message) {

        try {
            message.STATUS = 'Success';
            message.STUDENT_DETAILS = await studentModle.getStudentDetailByRegNum(message)
            if (!message.STUDENT_DETAILS) {
                message.STATUS = 'NotFound';
                message.RESP_MSG = 'Student not found for this student ID.';
 
            }
            else{
                await studentModle.deleteStudent(message);
                message.RESP_MSG = 'Student deleted successfully.';

            }
        }
        catch (ex) {
            message.RESP_MSG = 'Technical error occured, contact support.'
            message.STATUS = 'InternalServerError';
        }
    }
    async output(res, message) {
        res.responseBody.message = message.RESP_MSG;
        res.status = message.STATUS;
    }
    inputValidation(req) {

    }

}
module.exports = new DeleteStudentDetails();
