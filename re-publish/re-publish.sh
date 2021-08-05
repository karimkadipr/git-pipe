#!/bin/bash

# _______ Client Repo
CLIENT_REPO=https://github.com/ac-allal/client-repo.git
CLIENT_REPO_REMOTE_NAME=client-remote
CLIENT_REPO_TARGET_BRANCH=master

# _______ Our Repo
OUR_REPO=https://git-codecommit.us-east-1.amazonaws.com/v1/repos/testCopy
OUR_REPO_REMOTE_NAME=origin
OUR_REPO_LOCAL_PATH=/Users/user203328/Documents/GitHub/TestBranchingCopy
PR_BRANCH_TO_PUSH=test

INITIAL_PWD=$PWD
SCRIPT_DIR=$(dirname "$0")

# _________ Default to current directory. If no our repo local path was set _________
printf "Setting OUr repo local directory ....\n"
if [ -z $OUR_REPO_LOCAL_PATH ]
    then
        echo "No 'our repo local path' was configured in this script !"
        echo  "Defaulting to script location directoy (Directory in file system)"
        if [ -d "$SCRIPT_DIR/.git" ]
            then
                echo ".git found > selecting the script current directory"
                OUR_REPO_LOCAL_PATH=$SCRIPT_DIR
            else
                echo "The directory is not a git repository (no .git directory found)!"
                echo "Check the script is in the right git repo. And the repo is init and contains .git folder"
                echo "Exiting ..."
                exit
        fi
fi

# ________________________ Check if client repo remote is set _______________________
echo "Check if client repo remote url is set and valid ..."
cd $OUR_REPO_LOCAL_PATH
if [ $(git remote get-url $CLIENT_REPO_REMOTE_NAME) = "$CLIENT_REPO" ] 
    then
        echo "setting remote ($CLIENT_REPO_REMOTE_NAME) url to $CLIENT_REPO" 
        if [[ $(git remote get-url $CLIENT_REPO_REMOTE_NAME) == *"No such remote"* ]] 
            then # if include 'No such remote' (no remote)
                git remote add $CLIENT_REPO_REMOTE_NAME $CLIENT_REPO 
            else
                git remote set-url $CLIENT_REPO_REMOTE_NAME $CLIENT_REPO 
        fi
fi

# ________________________ Set our repo branch to push (Dev PR branch) _______________________
printf "Set our repo branch to push (Dev PR branch)\n>>>\n"

if [ -z $PR_BRANCH_TO_PUSH ]
    then
        echo "No branch already specfied !"
    else
        echo "Branch ($PR_BRANCH_TO_PUSH) is selected! Do you want to change it ? (y|n)"
        read SHOULD_CHECK
        echo ">>>>>>>>$SHOULD_CHECK"
        if [ "$SHOULD_CHECK" = "y" ]
            then
                unset PR_BRANCH_TO_PUSH
        fi
fi

if [ -z $PR_BRANCH_TO_PUSH ]
    then
        echo "Enter the branch you want to push:"
        read PR_BRANCH_TO_PUSH
fi

printf "\nBranch to push: $PR_BRANCH_TO_PUSH\n\n"

# ________________________ Set Client repo  target branch _______________________
printf "Set Client repo target branch\n>>>\n"

if [ -z $CLIENT_REPO_TARGET_BRANCH ]
    then
        echo "No target branch was already specfied !"
    else
        echo "Client remote Target Branch ($CLIENT_REPO_TARGET_BRANCH) is selected! Do you want to change it ? (y|n)"
        read SHOULD_CHECK
        echo ">>>>>>>>$SHOULD_CHECK"
        if [ "$SHOULD_CHECK" = "y" ]
            then
                unset CLIENT_REPO_TARGET_BRANCH
        fi
fi

if [ -z $CLIENT_REPO_TARGET_BRANCH ]
    then
        echo "Enter the target branch:"
        read CLIENT_REPO_TARGET_BRANCH
fi

# _________________________ Pull remote Target branch ________________________
printf "\n\nPulling client repo target ($CLIENT_REPO_TARGET_BRANCH) branch\n"
printf "\nPulling .....\n>>>\n"
git pull $CLIENT_REPO_REMOTE_NAME $CLIENT_REPO_TARGET_BRANCH:$CLIENT_REPO_TARGET_BRANCH

# _____________ PULL Our repo dev PR branch and push to client remote (for PR) ___________
printf "\n\nPULL Our repo dev PR branch and push it to client remote (for PR)\n>>>\n"

printf "\nPulling ($PR_BRANCH_TO_PUSH) branch from our repo\n>>>\n"
git pull $OUR_REPO_REMOTE_NAME $PR_BRANCH_TO_PUSH:$PR_BRANCH_TO_PUSH

printf "\nPush ($PR_BRANCH_TO_PUSH) to client remote\n>>>\n"
git push $CLIENT_REPO_REMOTE_NAME $PR_BRANCH_TO_PUSH:$PR_BRANCH_TO_PUSH

cd $INITIAL_PWD
