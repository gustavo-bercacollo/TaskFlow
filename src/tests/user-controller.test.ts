import request from "supertest"
import { app } from "@/app"
import { db } from "@/database/dbConfig"

describe("UserController", () => {
  
  let user_id: string

  afterAll(async () => {
    await db.user.delete({ where: { id: user_id } });
  });

  it("should authenticate and get access token", async () => {
    const response = await request(app).post("/users").send({
      name: "Test User",
      email: "testuser@example.com",
      password: "password123"
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Test User");

    user_id = response.body.id;
  });

  it("should throw an error if user with the same email already exists", async () => {
    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "testuser@example.com",
      password: "password123"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("User with same email already exists");
  });

  it("should throw a validation error if email is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: "Duplicate User",
      email: "false-email",
      password: "password123"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("should throw a validation error if name is invalid", async () => {
    const response = await request(app).post("/users").send({
      name: 123,
      email: "123@email.com",
      password: "password123"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("should throw a validation error if name doesn't have the minimum of characters", async () => {
    const response = await request(app).post("/users").send({
      name: "j",
      email: "j@email.com",
      password: "password123"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("should throw a validation error if password doesn't have the minimum of characters", async () => {
    const response = await request(app).post("/users").send({
      name: "Guy with the wrong password",
      email: "guywrongpassword@email.com",
      password: "12345"
    });

    expect(response.status).toBe(400);
    expect(response.body.message).toBe("Validation error");
  });

  it("should list all users", async () => {
    const login = await request(app).post("/sessions").send({
      email: "testuser@example.com",
      password: "password123"
    })

    expect(login.status).toBe(200)

    const token = login.body.token

    const response = await request(app).get("/users").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200)
    expect(Array.isArray(response.body)).toBe(true)
  
  })

  it("should edit user", async () => {
  
    const loginUserTest = await request(app).post("/sessions").send({
        email: "ana@gmail.com",
        password: "ana3000"
    });
  
    const idUserTest = loginUserTest.body.id;
    expect(loginUserTest.status).toBe(200);
    
    
    const login = await request(app).post("/sessions").send({
      email: "gustavo@gmail.com",
      password: "gustavo3000"
    });
  
    const token = login.body.token;

    expect(login.status).toBe(200);
    
    const response = await request(app)
      .put(`/users/${idUserTest}`) 
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Test User Updated",
        email: "testuser@example.com",
        password: "password123"
      });
  
    expect(response.status).toBe(200);  
    expect(response.body.name).toBe("Test User Updated"); 
    expect(response.body.email).toBe("testuser@example.com"); 
  });
  

})
