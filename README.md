# node-config-refactor

`config-refactor` helps you to refactor your configurations which you load by node-config.
This tool generates config files from your actual configurations.

For example, from following configurations,

```js
# NODE_CONFIG_ENV=development NODE_APP_INSTANCE=foo
{
    "a": "default",
    "b": "development",
    "c": "foo",
    "d": "development-foo",
}
# NODE_CONFIG_ENV=development NODE_APP_INSTANCE=bar
{
    "a": "default",
    "b": "development",
    "c": "bar",
    "d": "development-bar",
}
# NODE_CONFIG_ENV=production NODE_APP_INSTANCE=foo
{
    "a": "default",
    "b": "production",
    "c": "foo",
    "d": "production-foo",
}
# NODE_CONFIG_ENV=production NODE_APP_INSTANCE=bar
{
    "a": "default",
    "b": "production",
    "c": "bar",
    "d": "production-bar",
}
```

Generates following files.

```
# default.json
{ a: "default" }

# default-foo.json
{ c: 'foo' }

# default-bar.json
{ c: 'bar' }

# development.json
{ b: 'development' }

# development-foo.json
{ d: 'development-foo' }

# development-bar.json
{ d: 'development-bar' }

# production.json
{ b: 'production' }

# production-foo.json
{ d: 'production-foo' }

# production-bar.json
{ d: 'production-bar' }
```

## Usage

If your environments are like followings,

- `NODE_CONFIG_ENV=development NODE_APP_INSTANCE=foo`
- `NODE_CONFIG_ENV=development NODE_APP_INSTANCE=bar`
- `NODE_CONFIG_ENV=production NODE_APP_INSTANCE=foo`
- `NODE_CONFIG_ENV=production NODE_APP_INSTANCE=bar`

Execute the following command.

```
$ NODE_CONFIG_DIR=... npx config-refactor \
  -c development:foo \
  -c development:bar \
  -c production:foo \
  -c production:bar
```

## Note

This tool currently supports `deployment` and `instance`. See [https://github.com/lorenwest/node-config/wiki/Configuration-Files#file-load-order](Configuration-Files) about `deployment` and `instance`.

```
default.EXT
default-{instance}.EXT
{deployment}.EXT
{deployment}-{instance}.EXT
```

`EXT` of the input file can be the formats `node-config` supports.
But this tool outputs only json format.
