# arguments
git_dir=${1}

# No arguments provided
if [[ $# -eq 0 ]]; then
    echo "Not a Git Repository"
    exit 1
fi

git --git-dir=${git_dir:-./.git} push
