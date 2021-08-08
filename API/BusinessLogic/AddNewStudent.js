var studentModle = require('./Modules/Students');
var sysConfig = require('./Modules/SystemConfigurations');

function pad2(num, size) {
    num = num.toString();
    while (num.length < size)
        num = "0" + num;
    return num;
}

class AddNewStudent {
    async input(req, message) {
        message.NAME = req.body.name;
        message.PHONE = req.body.phone;
        message.GURDIAN_PHONE = req.body.gurdianPhone;
        message.EMAIL = req.body.email;
        message.CNIC = req.body.cnic;
        message.DOB = req.body.dateOfBirth;
    }
    async process(message) {

        try {
            message.STATUS = 'Success';

            var studentDetails = await studentModle.getStudentByCnic(message);
            if (!studentDetails) {
                var regId = await sysConfig.getNextSeqValue("regnum");
                message.REG_NUM = pad2(regId, 5);
                await studentModle.createNewStudent(message);
                message.RESP_MSG = 'Student added successfully.'
            }
            else {
                message.RESP_MSG = 'Student already registered with this CNIC.'
                message.STATUS = 'BLError';
            }
        }
        catch (ex) {
            message.RESP_MSG = 'Technical error occured, contact support.'
            message.STATUS = 'InternalServerError';
        }
    }
    async output(res, message) {
        res.responseBody.message = message.RESP_MSG;
        res.responseBody.regNum = message.REG_NUM;
        res.status = message.STATUS;
    }
    inputValidation(req) {

    }

}
module.exports = new AddNewStudent();
