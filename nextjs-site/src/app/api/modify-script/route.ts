import { exec } from "child_process";
import { NextRequest, NextResponse } from "next/server";
import path from "path";

export async function POST(req: NextRequest) {
  const { param1, param2 } = await req.json();

  if (!param1 || !param2) {
    return NextResponse.json({ error: "Missing parameters" }, { status: 400 });
  }

  // Build and run Docker container
  const userInfo = { param1, param2 };

  exec(
    `SCRIPT_ARG='${JSON.stringify(userInfo)}' docker compose up --build`,
    { cwd: path.resolve("../") },
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${stderr}`);
        return NextResponse.json(
          { error: "Docker execution failed" },
          { status: 500 }
        );
      }

      console.log("Docker build logs:", stdout);

      if (stderr) {
        console.error("Docker error logs:", stderr);
      }

      return NextResponse.json({
        message: "Script started in Docker container",
      });
    }
  );

  return NextResponse.json({ message: "Script modified successfully" });
}
