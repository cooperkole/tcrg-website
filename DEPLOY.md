# Deploying the TCRG site

The site builds and deploys itself. Every push to `main` runs `.github/workflows/deploy.yml`, which builds the Astro site and publishes it to GitHub Pages.

- Repo: https://github.com/cooperkole/tcrg-website
- Preview (now): https://cooperkole.github.io/tcrg-website/
- Target: https://www.tuftscapitalresearchgroup.com

This file covers moving `tuftscapitalresearchgroup.com` from the Wix site to GitHub Pages. Nothing here has been done yet. Nobody has changed the DNS or anything on Wix.

DNS values come from GitHub's docs as of 2026-11-25 ([managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [verifying a domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/verifying-your-custom-domain-for-github-pages), [HTTPS](https://docs.github.com/en/pages/getting-started-with-github-pages/securing-your-github-pages-site-with-https)). Check them against those pages before you change anything.

## What the domain looks like today

A public DNS lookup on 2026-11-25 showed:

| What | Value |
|---|---|
| Registrar | Wix.com Ltd. |
| Nameservers | `ns10.wixdns.net`, `ns11.wixdns.net` (Wix runs the DNS) |
| Apex `A` | 185.230.63.107, .171, .186 (Wix) |
| `www` | `CNAME cdn3.wixdns.net` (Wix) |
| `MX` (email) | none |
| `TXT` | none |

## 0. Before you start: check for email

Changing DNS can break email on the domain. The lookup found no MX records, so it looks like no email runs on `@tuftscapitalresearchgroup.com` today. Confirm that before you change anything:

- Ask the e-board and alumni whether anyone uses an `@tuftscapitalresearchgroup.com` address. Check for Wix mailboxes and Google Workspace too.
- In Wix, open the DNS records page (step 2) and look for `MX`, `TXT`/SPF, `CNAME` (DKIM, e.g. `google._domainkey`) or other records you don't recognize.
- **Change only the apex `A`/`AAAA` and the `www` `CNAME`.** Leave every `MX` and `TXT` record exactly as it is. Don't switch nameservers unless you also copy every record across.

Also note when the Wix plan and the domain renew. If the domain came free with a Wix Premium plan, cancelling the plan can affect the domain. Don't cancel or change anything on Wix as part of this. Settle the plan separately, once the new site is live.

## 1. Verify the domain on GitHub (stops takeovers)

Do this first. Once the domain is verified, no other GitHub account can publish a site on it.

1. On GitHub, open your **profile picture > Settings > Pages**. This is your account's settings, not the repo's.
2. Click **Add a domain**, enter `tuftscapitalresearchgroup.com`, then click **Add domain**.
3. GitHub shows a TXT record. Its name has the form `_github-pages-challenge-cooperkole`, and GitHub gives you the value.
4. Add that TXT record in Wix DNS (step 2). In Wix's host field, enter only the part before the domain: `_github-pages-challenge-cooperkole`.
5. Wait until this returns the value (anywhere from minutes to 24 hours):
   ```bash
   dig _github-pages-challenge-cooperkole.tuftscapitalresearchgroup.com +short TXT
   ```
6. Back in GitHub, open the domain's **...** menu, click **Continue verifying**, then **Verify**.
7. Leave the TXT record in DNS for good. Deleting it un-verifies the domain.

## 2. Set the custom domain on the repo

GitHub says to add the domain to the repo **before** you point DNS at it.

1. Repo **Settings > Pages > Custom domain**: enter `www.tuftscapitalresearchgroup.com` and click **Save**.
2. Use `www`, not the bare domain, because the site's canonical URLs, sitemap and `public/CNAME` all use `www`. GitHub sends the bare domain to `www` automatically once both record sets below exist.
3. The site deploys through GitHub Actions, so GitHub ignores `public/CNAME`. It stays in the repo as a record of the domain and does no harm.

## 3. Point DNS at GitHub Pages

### Option A (recommended): keep the domain at Wix and edit its DNS

In Wix: **Domains > (the domain) > ... > Manage DNS Records**. Wix moves its menus around. If these labels don't match, search Wix Help for "Updating your domain's DNS records".

1. **Apex `A` records** (host blank or `@`): **delete the three Wix A records** (185.230.63.x), then add four:
   ```
   185.199.108.153
   185.199.109.153
   185.199.110.153
   185.199.111.153
   ```
2. **Apex `AAAA` records** (host blank or `@`), if Wix offers the AAAA type:
   ```
   2606:50c0:8000::153
   2606:50c0:8001::153
   2606:50c0:8002::153
   2606:50c0:8003::153
   ```
3. **`www` CNAME**: change the value from `cdn3.wixdns.net` to `cooperkole.github.io`. Don't add the repo name, and don't use the `*.pages.github.io` address that Pages settings shows.
4. Don't add a wildcard (`*`) record. GitHub warns that wildcards expose you to domain takeovers.
5. Leave no stray `A`/`AAAA` records on the apex and no other `CNAME` on `www`. Leftover Wix records stop GitHub from issuing the HTTPS certificate.

Wix may warn you that the domain is no longer connected to your Wix site. That is expected. It means the domain is now pointing at GitHub.

### Option B: transfer the domain out of Wix

Moving the registration to a registrar such as Cloudflare or Namecheap means Wix isn't involved at all, but it takes longer and has more steps: unlock the domain in Wix, get the transfer (EPP) code, start the transfer at the new registrar, pay for a year, and wait up to about 5–7 days.

Before you start a transfer, copy every existing DNS record to the new provider, or email and verification records will break. Transferring also doesn't fit "don't change anything on Wix", so do it only once the Wix plan is being wound down anyway. Then add the same records as in Option A at the new DNS provider.

## 4. Switch the build from the preview URL to the domain

Make this change **as soon as the domain shows green in Settings > Pages**. Until you do, the build still points every link at `/tcrg-website/`, and the live domain will show broken links.

In `.github/workflows/deploy.yml`, delete these lines from the `build` job:

```yaml
    # Temporary: build for the project URL ...
    # DELETE these env lines ...
    env:
      SITE_URL: https://cooperkole.github.io
      BASE_PATH: /tcrg-website
```

Commit and push. The site then builds with `site = https://www.tuftscapitalresearchgroup.com` and `base = /` (the defaults in `astro.config.mjs`). After that, `cooperkole.github.io/tcrg-website/` redirects to the domain.

## 5. Enforce HTTPS

1. GitHub requests a Let's Encrypt certificate after DNS resolves. The **Enforce HTTPS** option in Settings > Pages can take up to 24 hours to appear.
2. If it's still greyed out long after DNS is correct: click **Remove** next to the custom domain, re-enter `www.tuftscapitalresearchgroup.com`, and **Save** again. This restarts the certificate.
3. Tick **Enforce HTTPS**.

## 6. Check it worked

DNS can take up to 24 hours to update everywhere.

```bash
dig tuftscapitalresearchgroup.com +short A
```

```bash
dig www.tuftscapitalresearchgroup.com +short CNAME
```

```bash
curl -sI http://tuftscapitalresearchgroup.com | head -5
```

The first should list the four `185.199.x.153` addresses, and the second `cooperkole.github.io.`. The bare domain should redirect to `https://www.tuftscapitalresearchgroup.com/`. Then open these and confirm each one loads:

- https://www.tuftscapitalresearchgroup.com/ (all pages, logo, photos)
- https://www.tuftscapitalresearchgroup.com/blank-1 (should land on /about/)
- https://www.tuftscapitalresearchgroup.com/sitemap.xml and /robots.txt
- https://www.tuftscapitalresearchgroup.com/og-image.jpg and /favicon-32.png
- A share preview (paste the URL into LinkedIn's Post Inspector)

## If something goes wrong

To go back to Wix, restore the old records: apex `A` 185.230.63.107, 185.230.63.171, 185.230.63.186 and `www CNAME cdn3.wixdns.net`. Then remove the custom domain from the repo's Pages settings. Keep the verification TXT record either way.

If you ever turn Pages off or delete the repo while DNS still points at GitHub, remove those DNS records straight away so nobody else can claim the domain.
