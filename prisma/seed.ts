// Seeds the menu into the database. Run with:  npm run db:seed
// Edit this list to change what's on the menu at launch.

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const MENU = [
  { slug: "xiu-latte",   name: "Xíu Latte",        nameVi: "house pour",      description: "Our house matcha latte, whisked airy and barely sweet.", priceCents: 600 },
  { slug: "sua-da",      name: "Sữa Đá Matcha",    nameVi: null,              description: "Matcha over ice with Vietnamese condensed milk.",        priceCents: 650 },
  { slug: "matcha-dua",  name: "Matcha Dừa",       nameVi: "coconut",         description: "Toasted coconut milk, matcha, a pinch of salt.",         priceCents: 700 },
  { slug: "hojicha-sua", name: "Hojicha Sữa",      nameVi: "roasted",         description: "Roasty roasted-green-tea latte for the non-matcha friend.", priceCents: 600 },
  { slug: "soda-chanh",  name: "Soda Chanh Matcha", nameVi: "lime soda",      description: "Matcha, lime, soda. Bright and cold, no milk.",          priceCents: 600 },
  { slug: "usucha",      name: "Usucha",           nameVi: "straight",        description: "Just matcha and hot water, whisked to foam.",            priceCents: 500 },
];

async function main() {
  for (const item of MENU) {
    await prisma.menuItem.upsert({
      where: { slug: item.slug },
      update: item,
      create: item,
    });
  }
  console.log(`Seeded ${MENU.length} menu items.`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
