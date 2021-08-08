var studentModle = require('./Modules/Students');

class UpdateStudentDetails {
    async input(req, message) {
        message.REG_NUM = req.params.studentID
        message.NAME = req.body.name;
        message.PHONE = req.body.phone;
        message.GURDIAN_PHONE = req.body.gurdianPhone;
        message.EMAIL = req.body.email;
        message.CNIC = req.body.cnic;
        message.DOB = req.body.dateOfBirth;
        message.STU_STATUS = req.body.status;
    }
    async process(message) {

        try {
            message.STATUS = 'Success';
            message.STUDENT_DETAILS = await studentModle.getStudentDetailByRegNum(message)
            if (!message.STUDENT_DETAILS) {
                message.STATUS = 'NotFound';
                message.RESP_MSG = 'Student not found for this student ID.';

            }
            else {
                var status = await studentModle.getStudentStauts(message);
                if (status) {
                    await studentModle.updateStudent(message);
                    message.RESP_MSG = 'Student profile updated successfully.';
                }
                else {
                    message.RESP_MSG = 'Invalid student status provided.'
                    message.STATUS = 'BLError';
                }

            }
        }
        catch (ex) {
            console.log(ex)
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
module.exports = new UpdateStudentDetails();
