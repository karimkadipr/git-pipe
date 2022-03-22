# arguments
git_dir="${1}"
basebranch="${2}"
devbranch="${3}"

# No arguments provided
if [[ $# -eq 0 ]]; then
    echo "Not a Git Repository"
    exit 1
fi


if [ -z "${basebranch}" ]; then
    echo "No Base Branch"
fi

if [ -z "${devbranch}" ]; then
    echo "No Dev Branch"
fi

git --git-dir=${git_dir:-./.git} checkout -b develop
git --git-dir=${git_dir:-./.git} config pull.rebase false
git --git-dir=${git_dir:-./.git} branch --set-upstream-to=origin/develop develop
git --git-dir=${git_dir:-./.git} fetch
git --git-dir=${git_dir:-./.git} merge-base develop main