# Contributing

## Development

```sh
npm ci
npm test            # jest, with coverage thresholds
npm run lint
npm run format:check
npm run build
npm run docs:build  # typedoc + Docusaurus, same as CI
```

CI runs all of the above on every push and pull request, so run them locally before
opening a PR. Prettier and ESLint are auto-fixed by CI on pushes to branches.

## Documentation

API docs are generated from the TSDoc comments in `src/` (typedoc), so **document
every exported function and option there**; undocumented exports are excluded from
the site. These files are written by hand and must be kept in sync:

- `README.md` and its homepage copy `docs/static/PROJECTMARKDOWN.md`
- `docs/docs/API_REFERENCE.md`, `docs/docs/USAGE.md`
- `docs/docs/CHANGELOG.md`: add an entry for every user-visible change

Do not commit generated output (`docs/api`, `docs/docs/api`, `coverage/`).

## Releasing

Releases are published by `.github/workflows/publish.yaml` when a version tag is
pushed.

1. Add a `### vX.Y.Z - YYYY-MM-DD` section to `docs/docs/CHANGELOG.md`.
2. Bump the version: `npm version X.Y.Z --no-git-tag-version`, then open and merge a
   PR.
3. On `main`, tag and push: `git tag vX.Y.Z && git push origin vX.Y.Z`.

The workflow checks the tag matches `package.json` and is on `main`, runs the tests
and build, publishes to npm with provenance, and creates the GitHub release from the
changelog. Tags with a hyphen (`v1.2.0-beta.1`) publish under the `next` dist-tag and
are marked as pre-releases.

Publishing uses npm trusted publishing (OIDC), so no npm token is stored here. It is
configured on npmjs.com under the package's Settings, Trusted Publisher: GitHub
Actions, organization `The-Node-Forge`, repository `url-validator`, workflow
`publish.yaml`.

Versioning: stricter validation or any behaviour change that can flip a result is a
minor/major bump, not a patch.

## Security

See [SECURITY.md](SECURITY.md). Please report vulnerabilities privately.
