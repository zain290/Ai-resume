import { Router, Request, Response } from 'express'
import db from '../database.js'

const router = Router()

function getSiteUrl(req: Request): string {
  const envUrl = process.env.SITE_URL
  if (envUrl) return envUrl.replace(/\/$/, '')
  const proto = req.headers['x-forwarded-proto'] || 'http'
  const host = req.headers.host || 'localhost:5322'
  return `${proto}://${host}`
}

const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' as const },
  { path: '/about', priority: '0.8', changefreq: 'monthly' as const },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' as const },
  { path: '/privacy-policy', priority: '0.5', changefreq: 'yearly' as const },
  { path: '/terms', priority: '0.5', changefreq: 'yearly' as const },
]

function getDynamicPaths(): { path: string; lastmod: string }[] {
  try {
    const rows = db.prepare('SELECT id, created_at FROM analyses ORDER BY created_at DESC LIMIT 50').all() as { id: number; created_at: string }[]
    return rows.map(r => ({
      path: `/analysis/${r.id}`,
      lastmod: new Date(r.created_at).toISOString(),
    }))
  } catch {
    return []
  }
}

router.get('/sitemap_index.xml', (req: Request, res: Response) => {
  const siteUrl = getSiteUrl(req)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${siteUrl}/sitemap.xml</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
  </sitemap>
</sitemapindex>`
  res.header('Content-Type', 'application/xml')
  res.send(xml)
})

router.get('/sitemap.xml', (req: Request, res: Response) => {
  const siteUrl = getSiteUrl(req)
  const dynamicPaths = getDynamicPaths()
  const urls = staticPages.map(p => {
    const now = new Date().toISOString()
    return `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`
  }).join('\n')

  const dynamicUrls = dynamicPaths.map(p => `  <url>
    <loc>${siteUrl}${p.path}</loc>
    <lastmod>${p.lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
${dynamicUrls ? '\n' + dynamicUrls : ''}
</urlset>`
  res.header('Content-Type', 'application/xml')
  res.send(xml)
})

router.get('/sitemap.txt', (req: Request, res: Response) => {
  const siteUrl = getSiteUrl(req)
  const dynamicPaths = getDynamicPaths()
  const lines = staticPages.map(p => `${siteUrl}${p.path}`)
  lines.push(...dynamicPaths.map(p => `${siteUrl}${p.path}`))
  res.header('Content-Type', 'text/plain')
  res.send(lines.join('\n'))
})

export default router
