
# arguments
git_dir="${1}"
since_commit="${2}"
to_commit="${3}"

# No arguments provided
if [[ $# -eq 0 ]]; then
    git --git-dir=${git_dir:-./.git} log --oneline --pretty=format:"%H : %as : %an : %s"
    exit 0
fi

git --git-dir=${git_dir} log --oneline --pretty=format:"%H : %as : %an : %s" $since_commit..${to_commit:-HEAD}

exit 0
