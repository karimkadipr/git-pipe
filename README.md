
# git-republish

This repository contain different tools or scripts that help with git flow and git repo management! And republishing ! Exposed by an Express Server  

## Description 

You can spicify a range for commits! And they will be commited again as fresh in another repo! One by one! Just like the work was done directly in the new repo! One by one! (The time however will be the time of the commiting)! So basically they will be all comitted at once! (as the principle is to get all commits! Then all changed files within each commit! And copy or remove! Depending on it! And commit with the same messages!


## Dependencies

- NodeJS +12.x
- Typescript +3.8.3

## Installation

```
 yarn install
```

## RUN APP

# For now update src/publisher.ts file , set the repos url, master branch name and develop branch name then 

```
    yarn publisher 

    npm run publisher

```


