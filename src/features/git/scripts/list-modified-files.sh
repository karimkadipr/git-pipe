# arguments
first_commit_hash=${1}
second_commit_hash=${2}

filter="${3}"
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
    git diff --name-status
    exit 0
fi

# check filter argument
if [ -z ${filter} ]; then
    git diff --name-status ${first_commit_hash}...${second_commit_hash:-HEAD}
else
    git diff --name-status --diff-filter=${filter:-*} ${first_commit_hash}...${second_commit_hash:-HEAD}
fi

exit 0
