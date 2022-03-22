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
# git --git-dir=${git_dir:-./.git} fetch origin origin/$devbranch
# git --git-dir=${git_dir:-./.git} checkout origin/$devbranch
# git --git-dir=${git_dir:-./.git} config pull.rebase true
# git --git-dir=${git_dir:-./.git} branch --set-upstream-to=origin/develop develop
# git --git-dir=${git_dir:-./.git} pull --rebase
# git --git-dir=${git_dir:-./.git} remote update

# git --git-dir=${git_dir:-./.git} branch -r | grep -v '\->' | while read remote; do git branch --track "${remote#origin/}" "$remote"; done
# git --git-dir=${git_dir:-./.git} fetch --all
# git --git-dir=${git_dir:-./.git} pull --all
git --git-dir=${git_dir:-./.git} merge-base origin/$devbranch $basebranch

exit 0