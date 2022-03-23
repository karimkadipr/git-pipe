
# arguments
git_dir=${1}
commit=${2}
branch=${3}


if [ -z ${git_dir} ]; then
    echo "Not a Git Repository"
    exit 1
fi


if [ -z ${commit} ]; then
    echo "No commit found"
    exit 1
fi

if [ -z ${branch} ]; then
    echo "No branch found"
    exit 1
fi

git --git-dir=${git_dir} show --quiet --pretty=format:"%B,,,,%ai" ${commit}
