# arguments
repos_url=${1}
repos_name=${2}
branch_name=${3}

# No arguments provided
if [[ $# -eq 0 ]]; then
    echo "No Repository url found"
    exit 1
fi

# check filter argument
if [ -z ${repos_url} ]; then
    echo "No Repository url found"
    exit -1
else
    if [ -z ${branch_name} ]; then
        git clone $repos_url $repos_name
    else
        git clone --single-branch --branch $branch_name $repos_url $repos_name
    fi
fi
