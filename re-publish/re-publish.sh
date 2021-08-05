#!/bin/bash

CLINET_REPO=https://github.com/ac-allal/client-repo.git
CLIENT_REPO_REMOTE_NAME=client-remote
CLIENT_REPO_TARGET_BRANCH=master

OUR_REPO=https://git-codecommit.us-east-1.amazonaws.com/v1/repos/testCopy
OUR_REPO_REMOTE_NAME=origin
OUR_REPO_LOCAL_PATH=/Users/user203328/Documents/GitHub/TestBranchingCopy

CLINET_REPO_TARGET_BRANCH=master
PR_BRANCH_TO_PUSH=test

INITIAL_PWD=$PWD

echo "Check if remote url is set and valid ..."
cd $OUR_REPO_LOCAL_PATH
if [ $(git remote get-url $CLIENT_REPO_REMOTE_NAME) = "$CLINET_REPO" ] 
    then
        echo "setting remote ($CLIENT_REPO_REMOTE_NAME) url to $CLINET_REPO" 
        if [[ $(git remote get-url $CLIENT_REPO_REMOTE_NAME) == *"No such remote"* ]] 
            then
                git remote add $CLIENT_REPO_REMOTE_NAME $CLINET_REPO 
            else
                git remote set-url $CLIENT_REPO_REMOTE_NAME $CLINET_REPO 
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
printf "\n\nPulling client target remote ($CLIENT_REPO_TARGET_BRANCH) branch\n"
printf "\nCheckout to $CLIENT_REPO_TARGET_BRANCH\n>>>\n"
git checkout $CLIENT_REPO_TARGET_BRANCH ||
(   
    echo "Branch doesn't exist! We are creating it ..." &&
    git checkout -b $CLIENT_REPO_TARGET_BRANCH
)

printf "\nPulling .....\n>>>\n"
git pull $CLIENT_REPO_REMOTE_NAME $CLIENT_REPO_TARGET_BRANCH

# _____________ PULL dev branch and push to client remote (for PR) ___________
printf "\n\nCheckout back to branch to push: $PR_BRANCH_TO_PUSH\n>>>\n"
git checkout $PR_BRANCH_TO_PUSH
printf "\nPush ($PR_BRANCH_TO_PUSH) to client remote\n>>>\n"
git pull $OUR_REPO_REMOTE_NAME $PR_BRANCH_TO_PUSH
git push $CLIENT_REPO_REMOTE_NAME $PR_BRANCH_TO_PUSH

cd $INITIAL_PWD
