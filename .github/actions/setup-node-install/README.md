# setup-node-install (composite action)

Reusable action to set up Node and install dependencies.

## Inputs

- `node-version` (default: `18`)

## Behavior

- Uses `actions/setup-node@v4` with npm caching.
- Runs `npm ci` when `package-lock.json` is present, otherwise falls back to `npm install`.

## Usage

```yaml
- uses: ./.github/actions/setup-node-install
  with:
    node-version: "20"
```
