# Desplegar pedromarquezg.com

Sitio hecho con [Quartz v4](https://quartz.jzhao.xyz) a partir del vault de Obsidian.
Contenido en `content/Korean 2A/` (importado, sin los PDFs del libro).

## Comandos locales
```bash
cd "/Users/pedro/Documents/Proyectos/pedromarquezg-site"
npx quartz build --serve      # previsualizar en http://localhost:8080
npx quartz build              # generar el sitio en public/
```

## Actualizar el contenido desde el vault
Cuando cambies notas en Obsidian, re-importa y publica:
```bash
rsync -a --delete --exclude 'books/' --exclude 'AI-Context.md' \
  "/Users/pedro/Documents/Obsidian Vault/Korean 2A/" \
  "/Users/pedro/Documents/Proyectos/pedromarquezg-site/content/Korean 2A/"
git add -A && git commit -m "update notes" && git push
```
Cloudflare reconstruye solo con cada push.

---

## 1. Subir a GitHub
```bash
# crea el repo en github.com (privado o público, da igual) llamado pedromarquezg-site, luego:
cd "/Users/pedro/Documents/Proyectos/pedromarquezg-site"
git remote add origin https://github.com/<TU_USUARIO>/pedromarquezg-site.git
git push -u origin main
```
> `upstream` ya apunta a Quartz oficial, así que en el futuro puedes traer mejoras con `git pull upstream v4.5.2`.

## 2. Cloudflare Pages (hosting gratis)
1. Entra a [dash.cloudflare.com](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → **Pages** → **Connect to Git**.
2. Elige el repo `pedromarquezg-site`.
3. Configuración de build:
   - **Framework preset:** None
   - **Build command:** `npx quartz build`
   - **Build output directory:** `public`
4. **Save and Deploy**. En ~2 min tendrás una URL `*.pages.dev` funcionando.

## 3. Dominio pedromarquezg.com (DNS en Porkbun)
En el proyecto de Cloudflare Pages → **Custom domains** → **Set up a domain** → escribe `pedromarquezg.com`. Cloudflare te dará un registro **CNAME** (algo como `pedromarquezg-site.pages.dev`).

Luego en **Porkbun** → tu dominio → **DNS**:
- Añade un registro **CNAME**: Host `` (raíz) → Answer `pedromarquezg-site.pages.dev`
  (Porkbun soporta CNAME en la raíz vía ALIAS automático.)
- Para `www`: **CNAME** Host `www` → `pedromarquezg-site.pages.dev`

> Alternativa más integrada: cambiar los **nameservers** de Porkbun a los de Cloudflare (Cloudflare te los indica) y gestionar todo el DNS desde Cloudflare. Es opcional.

El certificado HTTPS lo emite Cloudflare automáticamente.

## 4. (Opcional) No aparecer en Google — `noindex`
Si prefieres el sitio accesible pero fuera de buscadores, crea `content/robots.txt`... **no** — en Quartz añade a `quartz.config.ts` un meta noindex, o sube un archivo `public/_headers` en Cloudflare con:
```
/*
  X-Robots-Tag: noindex
```
Dilo y lo dejo configurado.
