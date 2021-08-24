# arguments
git_dir=${1}
description="${2}"

# No arguments provided
if [[ $# -eq 0 ]]; then
    echo "Not a Git Repository"
    exit 1
fi


if [ -z "${description}" ]; then
    echo "No description message"
fi

cd ${git_dir}/..

git add .

git commit -m "${description}"

# git push
