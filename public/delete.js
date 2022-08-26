//* /-----------------------Students--------------------------/

describe("Test40-   GET /api/Students", () => {
    //describe("GET", () => {
    test("status: 200 and returns an array of students", () => {
      return request(app)
        .get("/api/students")
        .expect(200)
        .then((res) => {
          //console.log(res)
          expect(res.body.students).toBeInstanceOf(Array);
          expect(res.body.students).toHaveLength(3);
          res.body.students.forEach((student) => {
            expect(student).toMatchObject({
              student_id: expect.any(Number),
              student_firstname: expect.any(String),
              student_lastname: expect.any(String),
              student_password: expect.any(String),
              student_active: expect.any(Boolean),
              student_image: expect.any(String),
              student_grade: expect.any(Number),
             student_targetgrade: expect.any(Number),
             student_notes: expect.any(String),
             student_progressbar: expect.any(Number),
             student_email: expect.any(String),
            });
          });
        });
    });
    test("QUERY: status 200 : quizzes are sorted by student_id", () => {
      return request(app)
        .get("/api/students")
        .expect(200)
        .then((res) => {
          //  console.log(res);
          expect(res.body.students).toBeSortedBy("student_id");
        });
    });
    test("QUERY: status 200: student are sorted by passed query", () => {
      return request(app)
        .get("/api/students?sort_by=student_id")
        .expect(200)
        .then((res) => {
          expect(res.body.students).toBeSortedBy("student_id");
        });
    });
    test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
      return request(app)
        .get("/api/students?sort_by=not_a_column")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("bad request");
        });
    });
  });
  describe("Test41- GET   /api/students/:student_id", () => {
    test("status: 200 and return a student object", () => {
      return request(app)
        .get("/api/students/1")
        .expect(200)
        .then((res) => {
          expect(res.body.student).toEqual({
            student_id: expect.any(Number),
            student_firstname: expect.any(String),
            student_lastname: expect.any(String),
            student_password: expect.any(String),
            student_active: expect.any(Boolean),
            student_image: expect.any(String),
            student_grade: expect.any(Number),
           student_targetgrade: expect.any(Number),
           student_notes: expect.any(String),
           student_progressbar: expect.any(Number),
           student_email: expect.any(String),
          });
        });
    });
    test("Error: student_id, non existent but valid. status 404 and an error message", () => {
      return request(app)
        .get("/api/students/invalid_id")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid input");
        });
    });
    test("ERROR  -status: 404 and returns an error message", () => {
      return request(app)
        .get("/api/students/1000")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
  describe("Test42- POST /api/students", () => {
    test("status: 201 and return the new questions", () => {
      return request(app)
        .post("/api/students")
        .send({
          student_firstname: "Posted- Student1FN",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: "password",
          student_active: true,
          student_image: "/student/student1.png",
          student_grade: 2,
          student_targetgrade: 5,
          student_notes: "Working well",
          student_progressbar: 3,
        })
        .expect(201)
        .then((res) => {
          expect(res.body.student).toEqual({
            student_id: 4,
            student_firstname: "Posted- Student1FN",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: "password",
          student_active: true,
          student_image: "/student/student1.png",
          student_grade: 2,
          student_targetgrade: 5,
          student_notes: "Working well",
          student_progressbar: 3,
          });
        });
    });
  });
  describe("Test43-  DELETE /api/students/:student_id", () => {
    test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
      return request(app).delete("/api/students/1").expect(204);
    });
    test("status 400 and returns an error message if it is a bad request", () => {
      return request(app)
        .delete("/api/students/Invalid_id")
        .expect(400)
        .then((res) => expect(res.body.msg).toBe("Invalid input"));
    });
    test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
      return request(app)
        .delete("/api/students/1000")
        .expect(404)
        .then((res) => expect(res.body.msg).toBe("Not found"));
    });
  });
  describe("Test44- PATCH /api/students/:student_id", () => {
    test("Status 200: and return a updated student object  ", () => {
      return request(app)
        .patch("/api/students/1")
        .send({
          student_firstname: "Pathched Student1FN",
          student_lastname: "Student1LN",
          student_email: "csheraz@hotmail.com",
          student_password: "password",
          student_active: true,
          student_image: "/student/student1.png",
          student_grade: 2,
          student_targetgrade: 5,
          student_notes: "Working well",
          student_progressbar: 3,
        })
        .expect(200)
        .then((res) => {
          expect(res.body.updatedStudent).toEqual({
            student_firstname: "Pathched Student1FN",
            student_lastname: "Student1LN",
            student_email: "csheraz@hotmail.com",
            student_password: "password",
            student_active: true,
            student_image: "/student/student1.png",
            student_grade: 2,
            student_targetgrade: 5,
            student_notes: "Working well",
            student_progressbar: 3,
            student_id: 1
          });
        });
    });
  });
  
  //--------------------------Tutors--------------------------/
  
  describe("Test45-   GET /api/tutors", () => {
    //describe("GET", () => {
    test("status: 200 and returns an array of tutors", () => {
      return request(app)
        .get("/api/tutors")
        .expect(200)
        .then((res) => {
          //console.log(res)
          expect(res.body.tutors).toBeInstanceOf(Array);
          expect(res.body.tutors).toHaveLength(1);
          res.body.tutors.forEach((tutor) => {
            expect(tutor).toMatchObject({
              tutor_id: expect.any(Number),
              tutor_firstname: expect.any(String),
              tutor_lastname: expect.any(String),
              tutor_email: expect.any(String),
              tutor_password: expect.any(String),
              tutor_active: expect.any(Boolean),
              tutor_image: expect.any(String),
            });
          });
        });
    });
    test("QUERY: status 200 : tutors are sorted by tutor_id", () => {
      return request(app)
        .get("/api/tutors")
        .expect(200)
        .then((res) => {
          //  console.log(res);
          expect(res.body.tutors).toBeSortedBy("tutor_id");
        });
    });
    test("QUERY: status 200:tutor are sorted by passed query", () => {
      return request(app)
        .get("/api/tutors?sort_by=tutor_id")
        .expect(200)
        .then((res) => {
          expect(res.body.tutors).toBeSortedBy("tutor_id");
        });
    });
    test("ERROR HANDLING - status 400: for an invalid sort_by column ", () => {
      return request(app)
        .get("/api/tutors?sort_by=not_a_column")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("bad request");
        });
    });
  });
  describe("Test46- GET   /api/tutors/:tutor_id", () => {
    test("status: 200 and return a tutor object", () => {
      return request(app)
        .get("/api/tutors/1")
        .expect(200)
        .then((res) => {
          expect(res.body.tutor).toEqual({
            tutor_id: expect.any(Number),
            tutor_firstname: expect.any(String),
            tutor_lastname: expect.any(String),
            tutor_email: expect.any(String),
            tutor_password: expect.any(String),
            tutor_active: expect.any(Boolean),
            tutor_image: expect.any(String),
          });
        });
    });
    test("Error: tutor_id, non existent but valid. status 404 and an error message", () => {
      return request(app)
        .get("/api/tutors/invalid_id")
        .expect(400)
        .then((res) => {
          expect(res.body.msg).toBe("Invalid input");
        });
    });
    test("ERROR  -status: 404 and returns an error message", () => {
      return request(app)
        .get("/api/tutors/1000")
        .expect(404)
        .then((res) => {
          expect(res.body.msg).toBe("Not found");
        });
    });
  });
  describe("Test47- POST /api/tutors", () => {
    test("status: 201 and return the new tutors", () => {
      return request(app)
        .post("/api/tutors")
        .send({
          tutor_firstname: "Sheraz",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_password: "password",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
        })
        .expect(201)
        .then((res) => {
          expect(res.body.tutor).toEqual({
            tutor_id: 2,
            tutor_firstname: "Sheraz",
            tutor_lastname: "Cheema",
            tutor_email: "csheraz@hotmail.com",
            tutor_password: "password",
            tutor_active: true,
            tutor_image: "/tutor/tutor1.png",
          });
        });
    });
  });
  describe("Test48-  DELETE /api/tutors/:tutor_id", () => {
    test(" ERROR HANDLING - status 204 and return with empty reponse body", () => {
      return request(app).delete("/api/tutors/1").expect(204);
    });
    test("status 400 and returns an error message if it is a bad request", () => {
      return request(app)
        .delete("/api/tutors/Invalid_id")
        .expect(400)
        .then((res) => expect(res.body.msg).toBe("Invalid input"));
    });
    test("ERROR HANDLING - status 404 and returns an error message if the ID does not exist", () => {
      return request(app)
        .delete("/api/tutors/1000")
        .expect(404)
        .then((res) => expect(res.body.msg).toBe("Not found"));
    });
  });
  describe("Test49- PATCH /api/tutors/:tutor_id", () => {
    test("Status 200: and return a updated student object  ", () => {
      return request(app)
        .patch("/api/tutors/1")
        .send({
          tutor_firstname: "Patched Sheraz",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_password: "password",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
        })
        .expect(200)
        .then((res) => {
          expect(res.body.updatedTutor).toEqual({
            tutor_firstname: "Patched Sheraz",
          tutor_lastname: "Cheema",
          tutor_email: "csheraz@hotmail.com",
          tutor_password: "password",
          tutor_active: true,
          tutor_image: "/tutor/tutor1.png",
            tutor_id: 1
          });
        });
    });
  });
  