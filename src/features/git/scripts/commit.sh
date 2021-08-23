# arguments
git_dir=${1}

git --git-dir=${git_dir:-./.git} add .

git --git-dir=${git_dir:-./.git} commit -m  " Auto Republished Commit "

git --git-dir=${git_dir:-./.git} push

