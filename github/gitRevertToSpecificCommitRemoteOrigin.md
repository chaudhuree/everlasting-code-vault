## suppose i add some code in my codebase and pushed it in remore branch. now i find that code is a garbage. so i want to remove that code from my codebase. how can i do that? 

- first i have to find the commit id of that code. for that i have to go to my github repo and then go to commit history. then i have to find the commit id of that code. then i have to copy that commit id. (1️⃣)

```bash
git log
# after that i have to copy the commit id
#  press semicolon and enter to exit from git log
```


- then i have to go to my terminal and then i have to write this command
  > git revert commit_id

```bash
git revert commit_id
# press ctrl+c
# then type :qa or the written command to exit from git revert window
# press enter
```
- then i have to push the code in remote branch. for that i have to write this command
  > git push origin branch_name
- then i have to go to my github repo and then i have to check the commit history. then i have to see that the code is removed from my codebase.


> # anothe  way to do that (2️⃣)

```bash
git reset --hard HEAD~1
# here 1 is the number of commit i want to remove
git push origin branch_name -f
# here -f means force push
```

> # anothe  way to do that (3️⃣)

```bash
git revert HEAD
# here HEAD means the last commit
# a window will open
# write the title and description of the commit
# and close the window
git push origin branch_name
```