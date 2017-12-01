/// <reference path="../../globals/util.js" />

GETJSON('./imgs/list.json', data => {
    Object.keys(data).forEach((key) => {
        let value = data[key];
        console.log(`${key}, By: ${value.author && value.author.name || "Unknown"}${value.author && value.author.link ? `\nMore of their work can be found here: ${value.author.link}` : ""}\nThis piece was submitted by: ${value.submitted}\nAnd can be found here: ${location.origin}${location.pathname}imgs/${value.src}`, data[key]);
    })
});