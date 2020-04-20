# node-config-refactor

`config-refactor` helps you to refactor your configurations which you load by [node-config](https://github.com/lorenwest/node-config).
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

```js
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

```sh
$ NODE_CONFIG_DIR=... npx config-refactor \
  -c development:foo \
  -c development:bar \
  -c production:foo \
  -c production:bar
```

By default, `config-refactor` outputs generated JSON to the stdout.
To output config files, use `-o/--out` option.

```sh
$ NODE_CONFIG_DIR=... npx config-refactor \
  ... \
  -o path/to/configDir
```

### Atomic config object

Sometimes we want to treat data object as a set.

```js
# config A
{ "obj": { "a": "A", "x": "common" } }

# config B
{ "obj": { "b": "B", "x": "common" } }
```

if keys are specified by `-a/--atomic` option, the value is treated as atomic.

```sh
$ config-refactor ...
# outputs following
{
  "default": { "obj": { "x": "common" } }
  "A": { "obj": { "a": "A" } }
  "B": { "obj": { "b": "B" } }
}

$ config-refactor ... --atomic obj
{
  "default": {}
  "A": { "obj": { "a": "A", "x": "common" } }
  "B": { "obj": { "b": "B", "x": "common" } }
}
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
