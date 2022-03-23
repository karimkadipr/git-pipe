# arguments
git_dir=${1}
description="${2}"
date="${3}"

# No arguments provided
if [[ $# -eq 0 ]]; then
    echo "Not a Git Repository"
    exit 1
fi


if [ -z "${description}" ]; then
    echo "No description message"
fi

if [ -z "${date}" ]; then
    echo "No date"
fi

cd ${git_dir}/..

git add .

GIT_AUTHOR_DATE=format:iso8601:"${date}" GIT_COMMITTER_DATE=format:iso8601:"${date}" git commit -m "${description}"

# git push
