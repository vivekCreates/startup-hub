import prisma from "@/lib/db";
import { userSchema } from "@/validation/userSchema";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs"
import { ZodError } from "zod";
// import { User } from "@/utils/User";


export async function POST(request: NextRequest) {
  try {
    const { name, email, password } = await request.json();
    // const validateData = userSchema.parse(body);
    const userExist = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userExist) {
      return NextResponse.json(
        {
          success: false,
          message: "user already exist",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    if (!hashedPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "something wrong while hashing the password",
        },
        { status: 500 }
      );
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "user registered successfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      console.log(error);
      const errors = error.errors.map((err) => ({
        field: err.path[0],
        message: err.message,
      }));
      return NextResponse.json(
        {
          success: false,
          message: "validation failed",
          errors,
        },
        {
          status: 400,
        }
      );
    }
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    );
  }
}
