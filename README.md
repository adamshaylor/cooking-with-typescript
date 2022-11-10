# Cooking with TypeScript

*A collection of patterns for TypeScript 4.8*

## Purpose

Ever since I discovered the Elm programming language, I’ve been inspired by the idea of [making impossible states impossible](https://www.youtube.com/watch?v=IcgmSRJHu_8). Elm's designers pride themselves on having produced a language from which (nearly) no runtime exceptions can occur. After completing a year-long project in TypeScript, we logged runtime exceptions on the front-end as well as the back-end. For the first time in my career as a web developer, I saw front-end runtime exceptions and bug reports dip far below the back-end. In fact, there have been almost none other than ones I threw intentionally for logging purposes. I therefore believe that, used properly, a TypeScript codebase can achieve nearly the level of quality that Elm does.

TypeScript is a superset of JavaScript and is designed for incremental adoption. This is a strength in that the cost of adopting *some* TypeScript in an organization or existing codebase is virtually zero. But it’s also a weakness in that the benefits of TypeScript vary wildly from one code base to another. Getting Elm levels of code quality does not come for free.

This repository is a demonstration of TypeScript’s features and a collection patterns for using them rigorously. It is not a package to be used as a dependency. There are many packages published on npm that serve that role. I am not interested in competing with them.

## Audience

This is for JavaScript developers, willing and unwilling. I personally love JavaScript and have enjoyed working with it over the last 15 years or so. It warmed me to some wonderful functional programming concepts I had seen before in college but didn’t fully appreciate until I encountered them again as a professional. JavaScript is also the most universal and prolific programming language as it can run in anyone’s web browser as well as on servers.

If you’re an “unwilling” JavaScript developer, which is to say, you’ve been asked to write JavaScript but you’d rather be doing just about anything else, you don’t have to share my love of JavaScript to get something out of TypeScript. If you’re coming from an object oriented language, I encourage you to explore TypeScript’s features beyond those that resemble C#. Underneath the interfaces, inheritance, and enums, I found a surprisingly expressive type system. I hope you find it, too.

This is not for first-time programmers. I am doubtful as to whether TypeScript makes a good first language. JavaScript is idiosyncratic enough on its own without the additional mental overhead of a fully erasable type system or a compiler with fairly cryptic errors. If you’re contemplating TypeScript as a first language, I recommend learning JavaScript first. It is possible to learn fundamental programming concepts in JavaScript and then learn about type correctness and theory later. If you’re looking for a more ergonomic first language but still want it to run in a web browser, I strongly encourage you to consider Elm. It’s the language I wish existed when I was first learning to program.

## Installation

The tools we’ll need are:

1. An editor and possibly an extension for it that support TypeScript. Visual Studio Code comes with TypeScript support out of the box, but there are many others you can use. A list of editor support for TypeScript can be found [here on TypeScript’s wiki](https://github.com/Microsoft/TypeScript/wiki/TypeScript-Editor-Support).
2. Node.js. See the `engines` field in `package.json` for version compatibility.

After cloning this repository, we’ll need to install dependencies, which should be mainly limited to TypeScript itself:

```
cd cooking-with-typescript
npm install
```

Now we should be able to browse through and play with the contents with the benefit of inline TypeScript code hints.

## Configuration

This repository is already configured by `tsconfig.json`. I bring configuration up here because I don’t cover it as a topic in the contents.

There are many styles of TypeScript usage largely characterized by their configuration. They can be roughly categorized as *strict* or *permissive*. In the spirit of making impossible states impossible, I prefer a strict configuration and have set this repository up accordingly.
