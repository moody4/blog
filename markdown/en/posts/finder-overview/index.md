---
lang: en
title: 'n8ive.Finder: Plugin Overview'
description: 'A command palette for Adobe Illustrator'
date: 2025-04-23
tags:
  - finder
  - illustrator
  - plugin
---

# n8ive.Finder: Plugin Overview

## Introduction

**n8ive.Finder** is a quick-search panel for menus, tools, scripts, and actions in *Adobe Illustrator*. Essentially, it’s what most other applications call a *command palette*, but with additional features.

The plugin significantly speeds up workflow by allowing users to navigate hundreds of commands without constantly digging through menus or trying to remember hotkeys.

<video controls autoplay="true" loop playsinline src="/mp4/finder-overview/vid-1.mp4" />

### Key Features:
- Search commands using **[fuzzy search](#fuzzy-search)** or **[regular expressions](#regular-expressions)**
- Run **[scripts](#scripts)** from folders of your choice
- Run **[actions](#actions)** directly from *`.aia`* files
- Save frequent queries as **[bookmarks](#bookmarks)** and filter commands by pattern
- Add commands to **[favorites](#history-and-favorites)** for instant access
- Choose how to display results — as a **tree or list**

Now, let’s see how this works in practice.

## Fuzzy Search

You don’t need to remember exact command names — the plugin understands even misspelled or partial queries. For example, instead of `Expand Appearance`, you can type `exp apr`, and instead of `User Interface`, simply `ui`.  

<video controls autoplay="true" loop playsinline src="/mp4/finder-overview/vid-2.mp4" />

## Regular Expressions

You can also search using regular expressions — special patterns that help find text matching a specific format. For example, you can find all commands with numbers — `\d+` or those starting with *Effect* — `^effect`.

While this mode is rarely used on its own, it allows flexible command filtering. For instance, you can display only tools, which is how **[bookmarks](#bookmarks)** work in the plugin.

To enable regular expression search, check the box in the search bar. 

<video controls autoplay="true" loop playsinline src="/mp4/finder-overview/vid-3.mp4" />

## Bookmarks

Bookmarks can be used to save frequently used queries. However, their true power lies in searching commands within a pre-filtered list — for instance, limiting results to just tools, menus, scripts, or actions. This is the default set of bookmarks in the plugin, but you can add your own via the bookmark manager.

The bookmarks bar is located below the search bar. You can switch between them using the **`Tab`** and **`Shift+Tab`** keys. When you select a bookmark, its tag (e.g.,  `#t`, `#m`) is added to the search bar — this is the bookmark’s shorthand alias. This also works in reverse: typing the alias directly into the search field will open the corresponding bookmark.

<video controls autoplay="true" loop playsinline src="/mp4/finder-overview/vid-4.mp4" />

The bookmark manager offers the following settings:

- **Pinning to the panel** — if a bookmark is unpinned, it can still be activated by typing its alias, but only pinned bookmarks can be cycled through with **`Tab`** / **`Shift+Tab`**.
- **Search type** — plain query or regular expression.
- **Result display mode** — list, tree, or auto (as in global settings).

<video controls autoplay="true" loop playsinline src="/mp4/finder-overview/vid-5.mp4" />

To recap briefly: a bookmark is just a filter. After applying it, you can refine your search further.

## Scripts

**n8ive.Finder** also serves as a script panel. You can add your own script folders in the plugin settings. The contents of these folders are tracked in real-time — scripts added to the folder become instantly available in the plugin. 

<video controls autoplay="true" loop playsinline src="/mp4/finder-overview/vid-6.mp4" />

## Actions

In **n8ive.Finder**, you can run actions:
- From the *Actions Panel*, but only those available in the panel at the application startup — this is a limitation of Illustrator.
- Directly from *`.aia`* files, making the use of the *Actions Panel* optional.

Finder stores actions in a root folder, which contains two subfolders:
- `session/` — contains actions from the *Actions Panel* (automatically updated when Illustrator starts).
- `persistent/` — drop *`.aia`* files here to make them instantly available for running in the plugin.

You can open the actions folder or change its path in the plugin settings. 

The default actions folder path is:

```
%UserProfile%/documents/n8ive/n8ive.finder/actions
```

## History and Favorites

Your recently used commands appear on the homepage (when the search bar is empty).

Pin your favorite commands and rearrange them as needed. To pin a command directly from search results, hold **`Ctrl`** and click the pin icon on the right.

<video controls autoplay="true" loop playsinline src="/mp4/finder-overview/vid-7.mp4" />

## Quick Access (Popup Panel)

Each of the videos above displays the plugin’s main window — a standard Illustrator panel. To open it, go to *Window > n8ive.Finder* in the menu.

But the plugin also has a quick-access panel: *Window > n8ive.Finder Popup*. Its key differences are:
- It closes automatically when it loses focus
- It can be opened at the cursor position

This resembles a context menu and is more convenient in certain situations. For example, when frequently accessing favorites, working in a cluttered workspace, or when the main panel is occupied (e.g., used as a stationary script panel). 

<video controls autoplay="true" loop playsinline src="/mp4/finder-overview/vid-8.mp4" />

::: info NOTE
The quick-access panel menu only includes settings for the quick-access panel itself.
:::

## Installation

To install the plugin, unzip the archive and place the `n8ive/` folder in one of the following paths (the Illustrator version number may vary):

```
%appdata%/Adobe/Adobe Illustrator 29 Settings/en_US/x64/Plug-ins
```
or
```
%programfiles%/Adobe/Adobe Illustrator 2025/Plug-ins
```


