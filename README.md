# Set Masked Env

Set masked environment variables in workflow.  
The log when using the set environment variable will remain `masked` If you read the information registered in GitHub Secrets and set it in the environment variable.

## Example

- FILE (github secrets)
```
USER=user
PASS=password
```

- ci.yml
```yml
name: example
on: [push]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v1

      - name: Restore Env File
        run: echo "${{ secrets.FILE }}" > ./.env
      
      - name: set masked environment variables
        uses: koheing/set-masked-env@v1.2
        with:
          filePath: ./.env
          # mask: false // option

      - name: Print out
        run: echo $USER $PASS
        # Output: *** ***
        # Output: user password (if mask is set to `false`)
```

## Inputs

### **filePath** (**required**)
The path of the file you'd like to import as an environment variable.

### mask (option)
Default `true`. Set to false if you wouldn't like to mask.
