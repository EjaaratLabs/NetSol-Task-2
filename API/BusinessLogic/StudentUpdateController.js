const studentDelete = require('./DeleteStudentDetails');
const studentUpdate = require('./UpdateStudentDetails');

class StudentUpdateController {
    async input(req, message) {
        message.METHOD = req.method;
        if (req.method == "DELETE") {
            studentDelete.input(req, message)
        }
        else if (req.method == "PUT") {
            studentUpdate.input(req, message)
        }
    }
    async process(message) {
        if (message.METHOD == "DELETE") {
            await studentDelete.process(message)
        }
        else if (message.METHOD == "PUT") {
            await studentUpdate.process(message)
        }
    }
    async output(res, message) {
        if (message.METHOD == "DELETE") {
            studentDelete.output(res, message)
        }
        else if (message.METHOD == "PUT") {
            studentUpdate.output(res, message)
        }
    }
    inputValidation(req) {

    }

}
module.exports = new StudentUpdateController();
