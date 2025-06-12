import prisma from "@/utils/db";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (request: any) => {
  const { email, password } = await request.json();

  const existingUser = await prisma.user.findFirst({ where: { email } });

  if (existingUser) {
    return new NextResponse("Email is already in use", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 5);

  try {
    // Biarkan database yang membuat ID secara otomatis
    await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });
    return new NextResponse("user is registered", { status: 200 });
  } catch (err: any) {
    console.error("REGISTRATION ERROR:", err); // Mencetak error detail di terminal backend
    return new NextResponse(err.message, {
      status: 500,
    });
  }
};