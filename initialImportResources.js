import fs from 'fs';
import path from 'path';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function importResources() {
  const filePath = path.join(process.cwd(), 'public', 'gcse_log_json.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));

  console.log('Clearing existing resources...');
  await prisma.rating.deleteMany({});
  await prisma.resource.deleteMany({});

  for (const item of data) {
    await prisma.resource.create({
      data: {
        resourceId: String(item["Resource ID"]),
        type: item["Resource Type"],
        title: item["Resource Title"],
        level: item["Study Level"],
        subject: item["Subject"],
        examBoard: item["Exam Board"],
        link: item["Link"],
        author: item["Resource Author"],
        description: item["Resource Description"],
        averageRating: item["Average Rating"] || 0,
      },
    });
    console.log(`Imported resource ID ${item["Resource ID"]}`);
  }

  await prisma.$disconnect();
  console.log('All resources imported successfully.');
}

importResources().catch((e) => {
  console.error(e);
  prisma.$disconnect();
});
