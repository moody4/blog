---
lang: en
title: 'n8ive.Finder: Additional Features'
description: Details about the plugin and its less obvious features
date: 2025-05-15
tags:
  - finder
  - illustrator
  - plugin
---

# n8ive.Finder: Additional Features

In the [plugin overview](../finder-overview/index.md), I aimed to avoid overwhelming readers with excessive details. This post clarifies key points and explores some of the plugin’s more subtle features.

## Repeat Last Command

You can assign a hotkey to repeat the last command executed through the plugin. This feature is available in the *Edit > Repeat Last Command (n8ive.Finder)* menu.

## Display Modes

In the plugin settings, you can choose how to display search results: as a tree or a list (the *Tree View* option). This is a global setting. However, the bookmark manager also allows you to configure the display mode individually for each bookmark. Toggling between modes is done via a checkbox, which can be in one of three states:

- 🟦 — List
- ☑️ — Tree
- ⏹️ — Follow global settings

<video controls autoplay="true" loop playsinline src="/mp4/finder-details/vid-1.mp4" />

::: info NOTE
In tree mode, `Alt+click` a folder to collapse/expand all peers at its nesting level.
:::

## About Regular Expressions

For users leveraging regular expressions ("regex"), note the following:

- **n8ive.Finder** uses *ECMAScript-standard* regex
- Patterns automatically include the *case-insensitive* flag, making searches case-agnostic
- Searches always target the full command path. For example, the regex `^Tools / Pen Tool$` matches the *Pen Tool* precisely

## Nested Bookmarks

Complex filters don’t require intricate regex — you can chain simpler ones instead. The plugin supports nested bookmarks and expands them dynamically.

Take a look at the bookmark manager in this screenshot.

![pic-1](/pic/finder-details/pic-1.png)

The second bookmark incorporates the first, creating a valid multi-step filter. If you enter `#pt` in the search bar, the `#p` bookmark will be applied first (finding all commands containing the word *perspective*), then the regex `^tools` will be applied to the results, finding all tools.

::: info NOTE
Only one nested `#alias` is allowed per filter. Additional aliases are treated as part of the query.
:::

::: tip TIP
Test patterns directly in the search bar. Once satisfied, select *Add Bookmark* from the menu — the manager auto-fills most fields, leaving only the name and alias to assign.
:::

## Excluding Files from the Scripts Folder

This feature is designed primarily for script developers. While developing, you may use additional tools, libraries, or modules that share the same file extensions as scripts — such as *`.js`*, *`.jsx`*, or *`.jsxbin`* — but you likely don’t want them cluttering Illustrator’s scripts panel.

With **n8ive.Finder**, you can exclude specific paths when scanning the scripts folder. If you’ve used *git* and are familiar with `.gitignore`, the concept is the same. Just create a `.finderignore` file in your scripts folder and list the paths you want to ignore.

::: details Example
```
.vscode
node_modules
tools
test.jsx
./recent drafts/new.js
```

::: info NOTE
In this example, `test.jsx` will exclude all files with that name at all nesting levels. If you want to ignore only a specific file, specify the path from the root `./test.jsx`.
:::

## Linking the Actions Panel with the Actions Folder

The plugin settings include an option disabled by default: *Link Actions Panel*. When enabled, it links Illustrator’s Actions Panel to the plugin’s actions folder `session/`. This allows actions added to or removed from the folder to automatically load or unload in the panel. However, due to Illustrator’s limitations, this synchronization only works one way: changes in the folder update the panel, but changes in the panel do not affect the folder.

::: danger WARNING
If you enable this option, make sure all action names are unique. The plugin can only link *`.aia`* files to action sets in the panel by their set name. Failing to follow this may cause unintentional deleting or changing actions in the Actions Panel.
:::

## Bookmark with Opened documents

All open documents in Illustrator appear in the *Window* menu, this can be used to create a bookmark for switching and searching between files. The exact regex pattern will vary based on your file naming conventions, but a general option is `^window.+\s@`. However, this may not work if the filenames are too long, as Illustrator shortens them, making the pattern ineffective.
