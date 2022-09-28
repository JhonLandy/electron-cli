"use strict";
(self["webpackChunk_vue_devtools_shell_chrome"] =
    self["webpackChunk_vue_devtools_shell_chrome"] || []).push([
    [4035],
    {
        44035: (e, n, t) => {
            t.r(n), t.d(n, { conf: () => k, language: () => m });
            var o = function (e) {
                    return "\\b" + e + "\\b";
                },
                r = "[_a-zA-Z]",
                i = "[_a-zA-Z0-9]",
                s = o("" + r + i + "*"),
                c = [
                    "targetScope",
                    "resource",
                    "module",
                    "param",
                    "var",
                    "output",
                    "for",
                    "in",
                    "if",
                    "existing",
                ],
                a = ["true", "false", "null"],
                l = "[ \\t\\r\\n]",
                g = "[0-9]+",
                k = {
                    comments: { lineComment: "//", blockComment: ["/*", "*/"] },
                    brackets: [
                        ["{", "}"],
                        ["[", "]"],
                        ["(", ")"],
                    ],
                    surroundingPairs: [
                        { open: "{", close: "}" },
                        { open: "[", close: "]" },
                        { open: "(", close: ")" },
                        { open: "'", close: "'" },
                        { open: "'''", close: "'''" },
                    ],
                    autoClosingPairs: [
                        { open: "{", close: "}" },
                        { open: "[", close: "]" },
                        { open: "(", close: ")" },
                        { open: "'", close: "'", notIn: ["string", "comment"] },
                        { open: "'''", close: "'''", notIn: ["string", "comment"] },
                    ],
                    autoCloseBefore: ":.,=}])' \n\t",
                    indentationRules: {
                        increaseIndentPattern: new RegExp(
                            "^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$"
                        ),
                        decreaseIndentPattern: new RegExp("^((?!.*?\\/\\*).*\\*/)?\\s*[\\}\\]].*$"),
                    },
                },
                m = {
                    defaultToken: "",
                    tokenPostfix: ".bicep",
                    brackets: [
                        { open: "{", close: "}", token: "delimiter.curly" },
                        { open: "[", close: "]", token: "delimiter.square" },
                        { open: "(", close: ")", token: "delimiter.parenthesis" },
                    ],
                    symbols: /[=><!~?:&|+\-*/^%]+/,
                    keywords: c,
                    namedLiterals: a,
                    escapes: "\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|'|\\${)",
                    tokenizer: {
                        root: [{ include: "@expression" }, { include: "@whitespace" }],
                        stringVerbatim: [
                            { regex: "(|'|'')[^']", action: { token: "string" } },
                            { regex: "'''", action: { token: "string.quote", next: "@pop" } },
                        ],
                        stringLiteral: [
                            {
                                regex: "\\${",
                                action: { token: "delimiter.bracket", next: "@bracketCounting" },
                            },
                            { regex: "[^\\\\'$]+", action: { token: "string" } },
                            { regex: "@escapes", action: { token: "string.escape" } },
                            { regex: "\\\\.", action: { token: "string.escape.invalid" } },
                            { regex: "'", action: { token: "string", next: "@pop" } },
                        ],
                        bracketCounting: [
                            {
                                regex: "{",
                                action: { token: "delimiter.bracket", next: "@bracketCounting" },
                            },
                            { regex: "}", action: { token: "delimiter.bracket", next: "@pop" } },
                            { include: "expression" },
                        ],
                        comment: [
                            { regex: "[^\\*]+", action: { token: "comment" } },
                            { regex: "\\*\\/", action: { token: "comment", next: "@pop" } },
                            { regex: "[\\/*]", action: { token: "comment" } },
                        ],
                        whitespace: [
                            { regex: l },
                            { regex: "\\/\\*", action: { token: "comment", next: "@comment" } },
                            { regex: "\\/\\/.*$", action: { token: "comment" } },
                        ],
                        expression: [
                            {
                                regex: "'''",
                                action: { token: "string.quote", next: "@stringVerbatim" },
                            },
                            {
                                regex: "'",
                                action: { token: "string.quote", next: "@stringLiteral" },
                            },
                            { regex: g, action: { token: "number" } },
                            {
                                regex: s,
                                action: {
                                    cases: {
                                        "@keywords": { token: "keyword" },
                                        "@namedLiterals": { token: "keyword" },
                                        "@default": { token: "identifier" },
                                    },
                                },
                            },
                        ],
                    },
                };
        },
    },
]);
