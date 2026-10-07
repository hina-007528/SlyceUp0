---
name: GitHub authorization boundaries
description: Connected GitHub API access does not automatically authorize shell Git commands
---

Treat the managed GitHub integration and the shell Git credential helper as separate authorization paths.

**Why:** The connected integration had repository and workflow write access while shell `git push` still failed because it could not obtain a password. Reconnecting an already-working integration would not address that shell error.

**How to apply:** Verify the authorized API access before requesting more credentials. Prefer the managed connection or the Replit Git pane; never extract a token from the integration. If transferring Git history through the API, verify original object hashes and use fast-forward-only branch updates so the workaround does not lose history or overwrite others' work.
