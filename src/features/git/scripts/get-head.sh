# arguments
git_dir="${1}"

git --git-dir=${git_dir:-./.git} rev-parse HEAD
