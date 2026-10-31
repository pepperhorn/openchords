#!/usr/bin/env bash
# Fails if any commit in <base>..<head> lacks a Signed-off-by matching its author email.
set -euo pipefail
base=$1; head=$2; bad=0
for c in $(git rev-list "$base..$head"); do
  email=$(git log -1 --format=%ae "$c")
  if ! git log -1 --format=%B "$c" | grep -qiF "Signed-off-by:" || ! git log -1 --format=%B "$c" | grep -i "^Signed-off-by:" | grep -qF "<$email>"; then
    echo "::error::$c has no Signed-off-by for $email"; bad=1
  fi
done
exit $bad
