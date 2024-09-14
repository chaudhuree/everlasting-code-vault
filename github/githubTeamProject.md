## first of all. we need to create required branches for all the developers

## there will be anothe branch for developers

## ai developers branch a kew code push korbe na.

## ai branch er access sudhu main developer or project manager er kase thakbe. manager sob code merge kobe. then sob bug test er pore main branch a merge kore dibe.

## demonstration

- first a akta repository create kore nei. suppose name team project.
- then aitay akta file rakhteci index.html (rakhteci mane repo github a gea create new repository theke create kore then ,git init,git add . aisob all command dea create kore nici.jeta repo create korle code gulo dekhay oigulo run korci like git commint -m "commit message", git remode u origin etc)

- branch ta kintu private branch tahkbe. then settign theke collaborators a gea developers der email add kore dite hobe.

- now branch create korar pala.
  > command:

```bash
git checkout -b "branch Name"
```
- branch ta local pc te ase akhn branch ta github a push korte nicher command
```bash
git push -u origin "branch Name"
```

> example:

```bash
git checkout -b "development"
```
- onno kono akta branch theke new brach korte chaile
  
```bash
git checkout -b ＜new-branch＞ ＜existing-branch＞
```
- ai command er por development name a akta branch create hoye jabe and automatically oi branch a chole jabe user.

- akhn dhori index file tay akta kicu likhlam. like, "new branch created".

- aita likhar por amara nicher commad dite pari.

```bash
git add .
git commit -m"new edit in brach development"
git push -u origin development
```

- ai command dewar por amra dekhte parbo j. new branch "development" er index file tay new text ta "new branch created" ai likha ta add hoye jabe (github a dhuke check korle dekhte parbo)

- but main branch er index file tay kintu ai likha ta thakbe na

.
.
.
.

## now imagine korlam amader duijon developer ase.

- develper one and developer two

- now, duita case hoite pare,like project manager already branch create kore diyeche.
- secolndly knono branch create kore deynai.

- now jodi branch already created thake tahole amader specific branch tar link dea dibe amra just clone kore niye amader kaj gulo korbo.
- r jodi na create kore dey tahole main branch tai clone kore then git checkout -b "dev-one-branch " type bash command dea personal branch create kore kaj korte thakbo.

- code push korar age obossoi terminal a dekhe nite hobe. branch konta te ache. jodi dekha jay bracket a likha ase (main) tahole obosshoi git checkout "dev-one-branch" aitay gea then push korte hobe.
  r jodi already dekhay j "dev-one-branch" a e ache then r kicu korte hobe na normally kaj korte parbe and push korte parbe.

- akhn dhori dev one tar branch a kicu code likhlo. then akhn she push korbe.

- code like: index.html a akta form create korlo.
- now jodi amra push korte chai. then just "git push" dea dei tahole akta waring dibe. oikhane likha thakbe

```bash
git push --set-upstream origin dev-one-branch
```

- ai command ta compy kore terminal a enter korle then push hoye jabe.
- aivabei dev one tar code github a push kore dite parbe nijer branch a.

- r jodi warning ta na chai tahole command dite hobe

```bash
git push // aita direct dewa jabe na
// dite hobe
git push -u origin dev-one-branch
```

- now devloper two er jonne o same
- devloper two akta branch create kore nibe. dev-two-branch
- then she akta file create korlo services.js
- then aitay code korlo and push kore dilo

```bash
git push -u origin dev-two-branch
```

## now pull request

> akhn dori devloper one coding sesh a github a dhuklo. mane repository tay. so tokhn she dekhte parbe oikhane likha ase,

`dev-one had recent pushed  and oitar pashe likha thakbe compare $ pull request.`

-now dhorlam amader project manager amader bole diyeche j obossoi pull request "development" branch a korba . main a na.

- akhn jokhn developer one compare and pull request button a press korbe then pore page a jabe

- oikhane dekhajabe upore duita button type ase .mane dropdown

- aktay likha ase base "main" r aktay compaser "dev-one-branch"

- project manager kintu bole diyeche main a khobordar push korba na

- so akhn dropdown theke development branch ta k select kore nite hobe

- then necessary comment box a text likhe request pull request a click korte hobe
- ak kajtuku korle develpment branch a akta pull request chole jabe

- same way te developer 2 o kaj kore dibe

- now project manager jokhn develpment branch a jabe then upore likha dekhabe
- pull request 2
- oi button a clikh korle kon kon pull request ashce seta dekhte parbe
- now dhorlar dev-two er pull request a gelo sekhane likha ase compare and merce pull request.
- then oitay click kore confirm merge a click korle dekha jabe deveopment branch a developer two er js file ta add hoye jabe.

## conflict

- dekha gelo developer one jokhn code korcilo oi index.js file tay e code korce. and jokhn code kore push korce dekha jabe j or oikhane conflict ashce.
- aita she nije pull requeste er time a o dekhte parbe plus project manager jokhn compare and merge a click korbe tokhn o show korbe.

- tokhn project manager developer one k knock dea bolbe vai tomar code conflick korce please check kore upload koro.

- now, developer one nijer code folder ashbe. and terminal a dibe

```bash
git pull origin "j branch a pull korbe"
// for our case
git pull  origin "development"
```

- aita korar sathe sathe dekha jabe development branch er joto code cilo sob e tar own brach a chole ashbe. and ai khetre developer two er service.js file tao tar codebox a dekhte parbe.

- now jehutu developer one index.html file tay code korce then dekah jabe oi file ta open hoye gece oikhane akta box er moto create hoice.
- box er green part ta hoitice j developer one er code. and box er baki code hocce development branch theke pull kora jonne j code ashce mane jetar sthe conflict hoice.

- now box tar akdom upore dekha jabe kicu option ashce. accept current change , accept incoming changes , accept both changes , compare changes

- accept current change mane jeta developer one code korce so oita theke jabe and development branch er code ta delete hoye jabe
- accept incoming changes mane jeta developement brach theke ashce oita thakbe and developer one er code baad
- accept both changes a click korle duitai theke jabe

- so akhn jodi sob code rakhte chay tahole accept both changes a click kore dibe and then abar ager command

```bash
git add .
git commit -m "merge conflict resolved"
git push -u origin dev-one-branch
```

- now developer one jodi nijer git a dhuke nijer brach a check kore then oikhane pull request korar jonne kono option pabe na. cz development branch a tar kata already pull request achei. so ai new ei new pull request authomatically agertay sahte gea join hoye jabe.

- akhn developer one project manager k knock dea bollo resolve korci check koren please.
- now jokhn pm development branch a gea check korbe then dekhte parbe j age j pull request ta chilo oita ase. then oitay click korle dekhte parbe kono conflict nai then merge pull request a click kore confirm korle development branch a devleoper one er code add hoye jabe,

- sob pull request sesh a pm korbe ki development brach er code ta k clone or kicu akta kore test korbe.sob test sesh a main branch a pull request dibe.next main branch theke pull request ta accept korle kaj finish

## to deleta a branch

```bash
git branch -d "branch name"
// for force delete
git branch -D "branch name"
```

## to create a branch with the same code of another branch

```bash
git checkout -b "new branch name" origin/"source branch name"
```

## suppose we have a git repo with many branch. we donot want to clone all the branch. we just want to clone a specific branch

```bash
git clone -b "branch name" "repo link"
```

## git pullfrom a specific branch

```bash
git pull origin "branch name"
# example
git pull origin "developer-one"
```


#### to check all branch(majhe majhe sob branch dekha jay na tokhn aivabe korte hobe)
```
git branch -a
```
