import { writeFileSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE_URL = "https://arnaquescan.fr";
const TODAY = new Date().toISOString().split("T")[0];

const ROUTES = [
  { path: "/",           priority: "1.0", changefreq: "weekly"  },
  { path: "/analyser",   priority: "0.9", changefreq: "monthly" },
  { path: "/auth",       priority: "0.7", changefreq: "monthly" },
  { path: "/historique", priority: "0.6", changefreq: "monthly" },
  { path: "/profil",     priority: "0.5", changefreq: "monthly" },
];

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${ROUTES.map(({ path, priority, changefreq }) => `  <url>
    <loc>${BASE_URL}${path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join("\n")}
</urlset>
`;

const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml, "utf-8");
console.log(`✓ sitemap.xml généré — ${ROUTES.length} URLs (${TODAY})`);
