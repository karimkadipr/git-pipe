
# git-republish

This repository contain different tools or scripts that help with git flow and git repo management! And republishing ! Exposed by an Express Server  

## scripts 
### Route /api/v1/git 

For now there is a bash script that help to git repos management

## scripts / publisher.sh ( InProgress ... ) 
### Route /api/v1/git/pulisher  - REST POST

This last one. With it, you can spicify a range for commits! And they will be commited again as fresh in another repo! One by one! Just like the work was done directly in the new repo! One by one! (The time however will be the time of the commiting)! So basically they will be all comitted at once! (as the principle is to get all commits! Then all changed files within each commit! And copy or remove! Depending on it! And commit with the same messages!


### For this purpos many helpers scripts was created

## scripts / get-commits-from.sh
### Route /api/v1/git/list-commit  - REST POST BODY { sinceCommit: "hash commit" , toCommit: "hash commit" }

Retrn the long hash for each commit is between 2 given commit 

### Arguments 
    - first Arguments / since_commit 
    - second Arguments / to_commit - HEAD by default
    - list All Commit if ther's no Arguments 


## scripts / get-commits-from.sh
### Route /api/v1/git/list-changes  - REST POST BODY { firstCommitHash, secondCommitHash, filter: A | C | D | M | R | T | U | X | B }

Retrn the list of all files changes and their changement status
- A Added
- C Copied
- D Deleted
- M Modified
- R Renamed
- T have their type (mode) changed
- U Unmerged
- X Unknown
- B have had their pairing Broken

### Arguments 
    - first Arguments / since_commit 
    - second Arguments / to_commit - HEAD by default
    - list All Commit if ther's no Arguments 



### TODO
- And commiting on the other repo and pushing



# Express Server 

## Dependencies

- NodeJS +12.x
- Typescript +3.8.3
- Jest

## Installation

```
 yarn install
```

## RUN APP

```

yarn start
```

## RUN TESTS

```
yarn test
```
