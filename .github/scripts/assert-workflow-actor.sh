#!/usr/bin/env bash
# Fail unless github.actor is in PORTAL_WORKFLOW_ACTORS (comma-separated GitHub usernames).
# Default allowlist: rikinptl
set -euo pipefail

ACTOR="${GITHUB_ACTOR:?GITHUB_ACTOR is required}"
ALLOWED="${PORTAL_WORKFLOW_ACTORS:-rikinptl}"

trim() {
  echo "$1" | sed 's/^[[:space:]]*//;s/[[:space:]]*$//'
}

IFS=',' read -ra USERS <<< "$ALLOWED"
for raw in "${USERS[@]}"; do
  user="$(trim "$raw")"
  [[ -z "$user" ]] && continue
  if [[ "$ACTOR" == "$user" ]]; then
    echo "Authorized GitHub user: $ACTOR"
    exit 0
  fi
done

echo "::error::Only authorized maintainers can run portal workflows (actor: ${ACTOR})."
echo "Allowed GitHub usernames: ${ALLOWED}"
echo "To grant access, set repo variable PORTAL_WORKFLOW_ACTORS (comma-separated usernames)."
exit 1
