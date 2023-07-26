## page not found problem.

> if directly uploaded the file using github.then follow this

- create a file named netlify.toml in the root directory of your project.
- add the following code in the file

```toml
[[redirects]]
from="/*"
to="/index.html"
status=200
```

- save it and push it to github. done.

> if push after build in local machine then

- create a file named _redirects in the public folder of your project.
- incase of vite create it in the root directory of your project.
- that means where index.html is located. at the same stage

- add the following code in the file

```toml
/*    /index.html   200
```

- save it and again build and then deploy it.
