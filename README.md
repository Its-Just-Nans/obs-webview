# obs-webview-poc

## Usage

```sh
npm install
node server.js
# go to http://localhost:8080 on a browser
# or
# go on obs and create a "browser" source linked to http://localhost:8080
```

Then you can edit the page, when you have finish, just hit `[Enter]` to reload

## Improvements idea

> This project is just a POC, I don't think I will updated it

- [ ] create a system to design the page on a new URL like `/studio` (with a button "update")
- [x] try to have only one server for websocket and webserver

## Infos

This first version was using an fetch on an interval, but it's not clean

```js
setInterval(() => {
    fetch("http://localhost:8100/needRefresh").then(async (resp) => {
        const txt = await resp.text();
        if (txt === "yes") {
            location.reload();
        }
    }).catch((e) => {
    })
}, 1000)
```
