# arguments
git_dir=${1}
commit=${2}
branch=${3}

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

if [ -z ${branch} ]; then
    echo "No branch found"
fi

echo "git --git-dir=${git_dir} checkout ${commit}"

cd ${git_dir}/..
git checkout origin/${branch}
git checkout ${commit}
