
# Stream Deck Plugin Template

The `Stream Deck Plugin Template` is a template to let you get started quickly when writing a JavaScript plugin for [Stream Deck](https://developer.elgato.com/documentation/stream-deck/). `Stream Deck Plugin Template` requires Stream Deck 6.0 or later.

## Description

`Stream Deck Plugin Template` is a complete plugin that shows you how to

- load and save settings using Stream Deck's persistent store
- setup and communicate with the Property Inspector
- pass messages directly from Property Inspector to the plugin (and vice versa)
- localize your Property Inspector's UI to another language

## Features

- code written in Javascript
- cross-platform (macOS, Windows)
- localization support
- styled [Property Inspector](https://developer.elgato.com/documentation/stream-deck/sdk/property-inspector/) included
- Property Inspector contains all required boilerplate code to let you instantly work on your plugin's code.

## Quick Start Guide

A short guide to help you get started quickly.

### Clone the repo

```git clone https://github.com/elgatosf/streamdeck-plugin-template```

### Replace Name

Rename the folder as well as any references.

`com.elgato.template.sdPlugin` with `my.domain.plugin-name.sdPlugin`

> [!IMPORTANT]  
> When sym-linking the plugin, the folder name must end with `.sdPlugin`.

### Get the latest library

You can either clone the javascript library or add it as a submodule to your repository.

#### Clone

```git clone https://github.com/elgatosf/streamdeck-javascript-sdk src/my.domain.plugin-name/libs```

#### Add Submodule

```git submodule add https://github.com/elgatosf/streamdeck-javascript-sdk src/my.domain.plugin-name/libs```

### Start Coding

You can get started in app.js!

```javascript
const myAction = new Action('com.elgato.template.action');

/**
 * The first event fired when Stream Deck starts
 */
$SD.onConnected(({ actionInfo, appInfo, connection, messageType, port, uuid }) => {
  console.log('Stream Deck connected!');
});

myAction.onKeyUp(({ action, context, device, event, payload }) => {
  console.log('Your key code goes here!');
});

myAction.onDialRotate(({ action, context, device, event, payload }) => {
  console.log('Your dial code goes here!');
});
```
