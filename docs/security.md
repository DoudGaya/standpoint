# Security

## Implemented controls

- Sanity reads are centralized and GROQ uses parameters for user-controlled
  values.
- The public client uses published perspective and CDN semantics; drafts require
  a server-only Viewer token and signed Draft Mode.
- Revalidation uses a constant-time Bearer secret check, bounded JSON input,
  allowlisted document effects and no arbitrary URL fetch.
- Newsletter and contact actions validate length, format, honeypot and intent
  with Zod. Provider URLs stay server-side and absent providers never report
  success.
- Embeds accept HTTPS URLs from an explicit host/provider allowlist, normalize
  YouTube to the privacy-enhanced host and never render pasted iframe HTML.
- JSON-LD replaces `<` to prevent script termination.
- External new-window links receive `noopener noreferrer`.
- Security headers disable MIME sniffing, framing outside same-origin and
  unnecessary browser capabilities.
- Internal/private staff fields are not projected by public queries.

## Secrets

Never expose:

- `SANITY_API_READ_TOKEN`
- `SANITY_REVALIDATE_SECRET`
- provider credentials or webhook secrets
- tip-submission keys

Use the hosting platform's encrypted environment store, rotate on suspected
exposure and ensure logs redact Authorization headers and form contents.

## Sanity access

Sanity roles, not Studio field visibility, enforce staff authorization.
Commercial users must not receive ordinary editorial mutation access. Use
least-privilege custom roles and review project membership regularly. The
public website does not need a Sanity write token.

## Content Security Policy

A full CSP is intentionally deployment-specific because `/studio`, Visual
Editing, analytics, selected media providers and form adapters change the
required origins. Start in `Content-Security-Policy-Report-Only`, collect
violations, then enforce separate policies for the public site and Studio.

Public-site baseline:

```text
default-src 'self';
base-uri 'self';
object-src 'none';
frame-ancestors 'self';
img-src 'self' data: blob: https://cdn.sanity.io;
media-src 'self' https:;
frame-src https://www.youtube-nocookie.com https://player.vimeo.com
  https://open.spotify.com;
script-src 'self';
style-src 'self' 'unsafe-inline';
connect-src 'self' https://*.api.sanity.io https://*.apicdn.sanity.io
  wss://*.api.sanity.io;
form-action 'self';
upgrade-insecure-requests
```

Sanity Studio needs additional documented Sanity origins. Do not weaken the
public policy globally merely to make Studio work.

## Forms and tips

The general contact form is not a secure whistleblower channel. A production
tip service needs transport and at-rest encryption, attachment malware
scanning, strict retention/deletion, limited staff access, abuse controls and
clear risk guidance. Use a specialist service rather than storing sensitive
submissions in Sanity.

## Reader accounts and comments

These are adapter boundaries. Before enabling them, define authentication,
session rotation, CSRF, rate limiting, account recovery, deletion/export,
moderation, appeals, age policy and privacy retention. Entitlements must be
verified server-side. Comments must never be treated as trusted Portable Text.

## Dependency and incident operations

Run lockfile-based installs in CI, review advisories, patch Next.js/Sanity
promptly and test upgrades against their installed-version documentation.
Monitor failed draft/revalidation attempts, provider errors, CMS fallback usage
and suspicious form volume. Maintain incident contacts and an editorial
corrections path separately from technical rollback.
