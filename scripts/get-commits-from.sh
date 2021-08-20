#!/usr/bin/env bash

# arguments
since_commit="${1}"
to_commit="${2}"

# No arguments provided
if [[ $# -eq 0 ]]; then
    git log --oneline --pretty=format:"%H"
    exit 1
fi

# Get only commits full hash
# git log --pretty=format:"%H"

git log --oneline --pretty=format:"%H" $since_commit..${to_commit:-HEAD}

exit 1
