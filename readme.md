# All-Build

This script helps you build all related projects when you have package depending on other local packages.

```json
{
  "name": "abc-project",
  "dependencies": {
    "bcd-project": "file:../bcd-project",
    "cde-project": "file:../cde-project"
  }
}
```

For the above _package.json_, all three projects _abc-project_, _bcd-project_ and _cde-project_ will be built by using the following command at _abc-project_.

```cmd
npx all-build
```

And they will be built in order according to the dependency tree. So, _bcd-project_ and _cde-project_ will be built first; and _abc-project_, last.

If _bcd-project_ or _cde-project_ as well depends on other local packages, those local packages will be built as well. Eventually, the whole tree of dependency will be built automatically.

---

## Command

By default, `npx --yes tsc` is used to build every project. But you can use whatever command as long as the first argument is provided.

For example, `npm run build` can be used to run the build script in every _package.json_.

```cmd
npx all-build "npm run build"
```

For another example, `npm i` can be also used to install all projects the first time after pulling your projects.

```cmd
npx all-build "npm i"
```

## Exports

If the basic function does not fulfill your need, you can import this npm package and use the following exported functions directly.

| function     | description                                                            |
| ------------ | ---------------------------------------------------------------------- |
| readProject  | read name and dependencies from the _package.json_ of a project        |
| readProjects | read _package.json_ of project and all the depending local projects    |
| getLayers    | group projects into layers according to the dependency tree            |
| execute      | execute a command and throw error if the command does not end properly |
| build        | the core function of this package                                      |
