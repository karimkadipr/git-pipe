# arguments
git_dir="${1}"
first_commit_hash=${2}
second_commit_hash=${3}

filter="${4}"
### filter possible values list

# A Added
# C Copied
# D Deleted
# M Modified
# R Renamed
# T have their type (mode) changed
# U Unmerged
# X Unknown
# B have had their pairing Broken

# No arguments provided
if [[ $# -eq 0 ]]; then
    git --git-dir=${git_dir:-./.git} diff --name-status
    exit 0
fi

# check filter argument
if [ -z ${filter} ]; then
    git --git-dir=${git_dir} diff --name-status ${first_commit_hash}...${second_commit_hash:-HEAD}
else
    git --git-dir=${git_dir} diff --name-status --diff-filter=${filter:-*} ${first_commit_hash}...${second_commit_hash:-HEAD}
fi

exit 0
