# arguments
git_dir=${1}
commit=${2}

# No arguments provided
if [[ $# -eq 0 ]]; then
    echo "No commit found"
    exit 1
fi

if [ -z ${git_dir} ]; then
    echo "not a git repository"
fi

if [ -z ${commit} ]; then
    echo "No Commit found"
fi

echo "git --git-dir=${git_dir} checkout ${commit}"

git --git-dir=${git_dir} checkout ${commit}
