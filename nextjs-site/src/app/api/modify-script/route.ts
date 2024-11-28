import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';

export async function POST(req: NextRequest) {
    const { param1, param2 } = await req.json();

    if (!param1 || !param2) {
        return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    // Modify the template script
    const templatePath = path.resolve('../template-script', 'index.ts');
    const modifiedScriptPath = path.resolve('../template-script', 'modified-index.ts');

    try {
        const template = fs.readFileSync(templatePath, 'utf-8');
        const modifiedScript = template
            .replace(/{{param1}}/g, param1)
            .replace(/{{param2}}/g, param2);

        fs.writeFileSync(modifiedScriptPath, modifiedScript, 'utf-8');
    } catch (error) {
        return NextResponse.json({ error: 'Error modifying template' }, { status: 500 });
    }

    // Build and run Docker container
    // exec('docker-compose up --build -d', { cwd: path.resolve('.') }, (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`Error: ${stderr}`);
    //         return NextResponse.json({ error: 'Docker execution failed' }, { status: 500 });
    //     }

    //     console.log(stdout);
    //     return NextResponse.json({ message: 'Script started in Docker container' });
    // });
}
