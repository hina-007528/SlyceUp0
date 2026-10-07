---
name: External build portability
description: Registry URL portability when preparing Replit projects for external CI and hosting
---

Check lockfile download URLs before sending a project to external CI or hosting.

**Why:** Replit package installation can write internal registry URLs into the lockfile. Those packages can install locally while an external Vercel or GitHub build cannot reach the internal host.

**How to apply:** After a successful firewall-validated installation, retain the approved package versions and integrity hashes but use their public registry URLs for external builds. Never use this to bypass a blocked package or vulnerability decision.
