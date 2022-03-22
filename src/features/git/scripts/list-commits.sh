
# arguments
git_dir="${1}"
since_commit="${2}"
branch="${3}"

# No arguments provided
if [[ $# -eq 0 ]]; then
    git --git-dir=${git_dir:-./.git} log --oneline --pretty=format:"%H"
    exit 0
fi

# Get only commits full hash
# git log --pretty=format:"%H"
git --git-dir=${git_dir:-./.git} log --oneline --pretty=format:"%H" $since_commit^..origin/${branch}

exit 0
