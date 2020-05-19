/* eslint-disable vars-on-top */
/* eslint-disable func-names */
/* eslint-disable no-var */
/* eslint-disable prettier/prettier */
export default function preProcessMichelsonScript(code) {
    var sections = new Map();
    const commentsRegex = /\s+(#.*)/g;
    sections.parameter = code.search(/(^|\s+)parameter/m);
    sections.storage = code.search(/(^|\s+)storage/m);
    sections.code = code.search(/(^|\s+)code/m);
    var boundaries = Object.values(sections).sort(function (a, b) { return Number(a) - Number(b); });
    sections[`${Object.keys(sections).find(function (key) { return sections[key] === boundaries[0]; })  }`] = code.substring(boundaries[0], boundaries[1]);
    sections[`${Object.keys(sections).find(function (key) { return sections[key] === boundaries[1]; })  }`] = code.substring(boundaries[1], boundaries[2]);
    sections[`${Object.keys(sections).find(function (key) { return sections[key] === boundaries[2]; })  }`] = code.substring(boundaries[2]);

    sections.code = sections.code.replace(commentsRegex, '\n');

    var parts = [sections.parameter, sections.storage, sections.code];
    return parts.map(function (p) { return p.trim().split('\n').map(function (l) { return l.replace(/\\#[\s\S]+$/, '').trim(); }).filter(function (v) { return v.length > 0; }).join(' '); });
}
