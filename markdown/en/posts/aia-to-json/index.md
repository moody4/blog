---  
lang: en
title: 'Converting Actions to JSON Format'  
description: A post about converting .aia files to JSON  
date: 2025-05-04  
tags:  
  - actions
  - illustrator
  - tools
---  

# Converting Actions to JSON Format  

## The Problem  

While working on a **[plugin](../finder-overview)** that required running Illustrator actions, I needed to convert *`.aia`* files into JSON. The existing tools I found failed to correctly convert most actions in my test batch. This prompted me to build my own converter.

## The Structure of .aia Files  

An action file is a collection of properties with values and multiple levels of nesting. In this sense, it resembles JSON — the main differences lie in syntax and the fact that many values in *`.aia`* files are encoded in hex or decimal formats.  

Like JSON, *`.aia`* files can be minified, and the order of properties doesn’t matter. As long as the syntax is correct, Illustrator will load the file and execute the action without issues.  

Property names in action files always start with a forward slash `/prop-name`. Values can be of several types:  
- Numbers (including negative and floating-point)  
- Strings — enclosed in parentheses  
- Encoded strings in decimal or hex format.  

::: details Example Data in an Action File  
```aia{11,13,20}  
/action-1 {  
    /name [ 22  
        4f706163697479203630202873656c656374696f6e29  
    ]  
    /keyIndex 0  
    /colorIndex 7  
    /isOpen 1  
    /eventCount 1  
    /event-1 {  
        /useRulersIn1stQuadrant 1  
        /internalName (ai_plugin_transparency) // plain string  
        /localizedName [ 12  
            5472616e73706172656e6379 // hex-encoded string  
        ]  
        /isOpen 0  
        /isOn 1  
        /hasDialog 0  
        /parameterCount 1  
        /parameter-1 {  
            /key 1869635939 // decimal-encoded string  
            /showInPalette 1  
            /type (unit real)  
            /value 60.0000038147  
            /unit 592474723  
        }  
    }  
}  
```  
:::  

## How the Converter Works  

As mentioned earlier, every property in an *`.aia`* file starts with a slash, which serves as its only marker. This key feature makes parsing the file relatively straightforward. By using the slash as a delimiter, we can reliably split the text into `key-value` segments. The only challenge lies in determining the nesting level of each property — in other words, ensuring that children are correctly assigned to their parents.

In an ideal scenario, we could simply count the tabs `\t` before a property to determine its nesting level. However, we can’t rely on ideal cases: even a single missing character could break the conversion, whereas Illustrator would still load such a file without issues.

Fortunately, when iterating through properties in nested data structures, we can guarantee that a parent always precedes its children. This allows us to track nesting by maintaining a special array where properties are added and removed in FILO (First In, Last Out) order. The last element in the array will always be the direct parent of the current property, and the array’s length will represent its nesting level.  

## How to Use It  

The converter accepts two parameters:  
- `content:` a string in valid *`.aia`* format  
- `decode:` a boolean flag to determine whether hex and decimal-encoded strings should be converted to readable text  

```js  
const content = fs.readFileSync('./samples/Default Actions.aia', 'utf8');  
const decode = true;  
const actionSet = aiaToJSON(content, decode);  

console.log(actionSet.actions[0]);  
```  

::: details Example Output  
```json  
{  
  "name": "Opacity 60 (selection)",  
  "keyIndex": 0,  
  "colorIndex": 7,  
  "isOpen": 1,  
  "eventCount": 1,  
  "events": [  
    {  
      "useRulersIn1stQuadrant": 1,  
      "internalName": "(ai_plugin_transparency)",  
      "localizedName": "Transparency",  
      "isOpen": 0,  
      "isOn": 1,  
      "hasDialog": 0,  
      "parameterCount": 1,  
      "parameters": [  
        {  
          "key": "opac",  
          "showInPalette": 1,  
          "type": "(unit real)",  
          "value": 60.0000038147,  
          "unit": "#Prc"  
        }  
      ]  
    }  
  ]  
}  
```  
:::  

::: tip NOTE  
The converter was built for environments supporting Node.js API and ES6 standard. To use it directly in Illustrator’s scripting environment, it would need to be ported to ES3.  
:::  

## Links  

https://github.com/moody4/aiaToJSON  