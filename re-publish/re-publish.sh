#!/bin/bash

MAIN_REPO=https://github.com/ac-allal/client-repo.git
LOCAL_CLIENT_REMOTE_NAME=client-remote
TARGET_REMOTE_BRANCH=master

CLONE_REPO=https://git-codecommit.us-east-1.amazonaws.com/v1/repos/testCopy
CLONE_REPO_REMOTE_NAME=origin
CLONE_REPO_LOCAL_PATH=/Users/user203328/Documents/GitHub/TestBranchingCopy

MAIN_REPO_TARGET_BRANCH=master
PR_BRANCH_TO_PUSH=test

INITIAL_PWD=$PWD

echo "Check if remote url is set and valid ..."
cd $CLONE_REPO_LOCAL_PATH
if [ $(git remote get-url $LOCAL_CLIENT_REMOTE_NAME) = "$MAIN_REPO" ] 
    then
        echo "setting remote ($LOCAL_CLIENT_REMOTE_NAME) url to $MAIN_REPO" 
        if [[ $(git remote get-url $LOCAL_CLIENT_REMOTE_NAME) == *"No such remote"* ]] 
            then
                git remote add $LOCAL_CLIENT_REMOTE_NAME $MAIN_REPO 
            else
                git remote set-url $LOCAL_CLIENT_REMOTE_NAME $MAIN_REPO 
        fi
fi

# ________________________ branch to push (Dev branch) _______________________
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

# ________________________ target branch _______________________
if [ -z $TARGET_REMOTE_BRANCH ]
    then
        echo "No target branch was already specfied !"
    else
        echo "Client remote Target Branch ($TARGET_REMOTE_BRANCH) is selected! Do you want to change it ? (y|n)"
        read SHOULD_CHECK
        echo ">>>>>>>>$SHOULD_CHECK"
        if [ "$SHOULD_CHECK" = "y" ]
            then
                unset TARGET_REMOTE_BRANCH
        fi
fi

if [ -z $TARGET_REMOTE_BRANCH ]
    then
        echo "Enter the target branch:"
        read TARGET_REMOTE_BRANCH
fi

# _________________________ Pull remote Target branch ________________________
printf "\n\nPulling client target remote ($TARGET_REMOTE_BRANCH) branch\n"
printf "\nCheckout to $TARGET_REMOTE_BRANCH\n>>>\n"
git checkout $TARGET_REMOTE_BRANCH ||
(   
    echo "Branch doesn't exist! We are creating it ..." &&
    git checkout -b $TARGET_REMOTE_BRANCH
)

printf "\nPulling .....\n>>>\n"
git pull $LOCAL_CLIENT_REMOTE_NAME $TARGET_REMOTE_BRANCH

# _____________ PULL dev branch and push to client remote (for PR) ___________
printf "\n\nCheckout back to branch to push: $PR_BRANCH_TO_PUSH\n>>>\n"
git checkout $PR_BRANCH_TO_PUSH
printf "\nPush ($PR_BRANCH_TO_PUSH) to client remote\n>>>\n"
git pull $CLONE_REPO_REMOTE_NAME $PR_BRANCH_TO_PUSH
git push $LOCAL_CLIENT_REMOTE_NAME $PR_BRANCH_TO_PUSH

cd $INITIAL_PWD
