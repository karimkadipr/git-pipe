

# arguments
commit=${1}
git_dir=${2}

# No arguments provided
if [[ $# -eq 0 ]]; then
    echo "No commit found"
    exit 1
fi

_separator_="<separator>"
git --git-dir=${git_dir:-./.git} show --quiet --pretty=format:"%H$_separator_%as$_separator_%an" ${commit}

