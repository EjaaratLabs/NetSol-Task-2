module.exports = {
    "/una/student": {
        controller: "AddNewStudent",
        allowedMethod: ['POST']
    },
    "/una/students": {
        controller: "GetAllStudents",
        allowedMethod: ['GET']
    },
    "/una/students/:studentID": {
        controller: "GetStudentDetails",
        allowedMethod: ['GET']
    },
    "/una/student/:studentID": {
        controller: "StudentUpdateController",
        allowedMethod: ['DELETE', 'PUT']
    },

}
