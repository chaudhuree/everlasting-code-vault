## Error:

```
PS1 Can Not Be Loaded Because Running Scripts Is Disabled On This System
```

## Solution:

- run below three command in the terminal one by one

```bash
1. set-ExecutionPolicy RemoteSigned -Scope CurrentUser
2. Get-ExecutionPolicy
3. Get-ExecutionPolicy -list
```
