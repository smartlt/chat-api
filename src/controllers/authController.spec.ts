import { login, register } from "../../src/controllers/authController";
import bcrypt from "bcrypt";
import User from "../models/Users";

jest.mock("../models/Users");
jest.mock("bcrypt");

describe("Auth Controller - register", () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockReq = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should register a new user", async () => {
    (User.findOne as jest.Mock).mockResolvedValue(null);
    (bcrypt.hash as jest.Mock).mockResolvedValue("hashedPassword");
    (User.prototype.save as jest.Mock).mockResolvedValueOnce({});

    await register(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.hash).toHaveBeenCalledWith("password123", 10);
    expect(User.prototype.save).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(201);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User registered successfully.",
    });
  });

  it("should return 400 if user already exists", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({ _id: "someid" });
    await register(mockReq, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "User with this email already exists.",
    });
  });

  it("should return 500 on server error", async () => {
    (User.findOne as jest.Mock).mockRejectedValue(new Error("DB error"));

    await register(mockReq, mockRes);
    expect(mockRes.status).toHaveBeenCalledWith(500);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Server error.",
    });
  });
});

describe("Auth Controller - login", () => {
  let mockReq: any;
  let mockRes: any;

  beforeEach(() => {
    mockReq = {
      body: {
        email: "test@example.com",
        password: "password123",
      },
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should login", async () => {
    (User.findOne as jest.Mock).mockResolvedValue({
      email: "test@example.com",
      password: "password123",
    });

    await login(mockReq, mockRes);

    expect(User.findOne).toHaveBeenCalledWith({ email: "test@example.com" });
    expect(bcrypt.compare).toHaveBeenCalled();
    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: "Logged in successfully.",
    });
  });
});
