```sh
git commit --amend --date="YYYY-MM-DD HH:MM:SS"
git commit --amend --date="2022-02-20 11:12:13" -m"message"
git commit --amend --date="2022-02-14 11:12:13" --no-edit
git commit --amend --date="2023-01-20 11:12:13" --no-edit --allow-empty
empty commit
git commit --allow-empty -m "Empty-Commit"


git refusing to merge unrelted histories
git pull origin master --allow-unrelated-histories


reedit last commit message 
git commit --amend -m "New commit message"

git push --force-with-lease
combining rules together
# multiple rules
git add .; git commit -m "using external data"; git push origin vuejs_ostad
```