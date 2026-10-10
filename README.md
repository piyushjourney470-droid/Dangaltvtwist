# Dangal TV Twist — Android-friendly static website

This package has been flattened so every deployable file is in one folder. It was generated from the Blogger Takeout backup.

## Contents
- 30 live posts in individual HTML files
- About Us, Contact Us, Disclaimer and Privacy Policy pages
- Responsive homepage, search and show/category filter
- SEO titles/descriptions/canonical tags, sitemap, robots.txt and Vercel headers

## Upload from Android
1. Extract this ZIP in your phone's Files app.
2. Open `piyushjourney470-droid/Dangaltvtwistt` on GitHub.
3. Tap **Add file → Upload files**.
4. Choose all files inside the extracted folder (not the ZIP file) and commit them to `main`. All site files live in the same folder, so no nested folders need to be preserved.
5. In Vercel, add your GitHub account as a login connection first if prompted. Then import `piyushjourney470-droid/Dangaltvtwistt`; select **Other/static HTML**, leave build/install commands empty, and deploy from the repository root.

## Important
- The generated pages use images hosted by Blogger, rather than uploading the 126 MB Takeout image collection into GitHub.
- Blogger comments, widgets, ads and live feed behavior are not migrated to static HTML. Keep the original Blogger site live until the new site is verified.
- The supplied theme XML included an obfuscated external script loader; it was intentionally not copied.
- Only entries marked `LIVE` were included. All `SOFT_TRASHED` entries were excluded.
- Canonical URLs currently assume `https://dangaltvtwistt.vercel.app`. If Vercel assigns another domain, update the canonical links in the HTML files and the URLs in `sitemap.xml` / `robots.txt`.
