# arguments
git_dir="${1}"
branch="${2}"

git --git-dir=${git_dir:-./.git} rev-parse origin/$branch
