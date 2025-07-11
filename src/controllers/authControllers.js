import User from "@/models/User";
import { connectDB } from "@/config/connect";
import { comparePasswords, createToken, hashPassword } from "@/lib/auth";
import { NextResponse } from "next/server";
import { loginSchema, registerSchema } from "@/validators/authSchemas";

export async function signup(req) {
  try {
    await connectDB();

    const body = await req.json();

    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, password } = parsed.data;

    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return NextResponse.json(
        { message: "Email is already registered" },
        { status: 400 }
      );
    }

    const hashed = await hashPassword(password);

    const NewUser = await User.create({
      name,
      email,
      password: hashed,
    });

    return NextResponse.json(
      { message: "User registered successfully", User: NewUser },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function signin(req) {
  try {
    await connectDB();

    const body = await req.json();

    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { email, password } = parsed.data;

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid user details" },
        { status: 400 }
      );
    }

    const isMatched = await comparePasswords(password, user.password);
    if (!isMatched) {
      return NextResponse.json(
        { message: "Invalid user details" },
        { status: 400 }
      );
    }

    const token = createToken(user);

    return NextResponse.json(
      { message: "Login successful", token },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function getAllUser(req) {
  try {
    await connectDB();
    const user = await User.find().select("-password");
    if (!user) return NextResponse.json({ message: "User is not found" });
    return NextResponse.json({ message: "OK", user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}

export async function getUserById(id) {
  try {
    await connectDB();

    const user = await User.findById(id).select("-password");
    if (!user) return NextResponse.json({ message: "User is not found" });
    return NextResponse.json({ message: "OK", user }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
