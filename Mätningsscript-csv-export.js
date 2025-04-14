// ==UserScript==
// @name         Mätningsscript
// @namespace    http://tampermonkey.net/
// @version      2025-04-03
// @description  try to take over the world!
// @author       B22samer
// @match        http://localhost:5174/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const totalRuns = 50;

    const now = Date.now();

    if (!localStorage.getItem('startRender')) {
        localStorage.setItem('startRender', now);
        return;
    }

    const start = +localStorage.getItem('startRender');
    const diff = now - start;

    const diffs = JSON.parse(localStorage.getItem('renderTimeDiffs')) || [];

    diffs.push(diff);
    localStorage.setItem('renderTimeDiffs', JSON.stringify(diffs));

    const runCount = diffs.length;

    if (runCount < totalRuns) {
        setTimeout(() => {
            localStorage.setItem('startRender', Date.now());
            window.location.reload();
        }, 1000); // Liten paus mellan mätningarna så att hela sidan hinner laddas ner innan nästa mätning sker
    } else {
        console.log("Mätning klar:", diffs);
        localStorage.removeItem('startRender');

    const titleKeys = JSON.parse(localStorage.getItem('renderTimeDiffs')) || [];
    console.table(titleKeys);

    let csvContent = 'Render Time (ms)\n';
        titleKeys.forEach(time => {
        csvContent += `${time}\n`;
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const objUrl = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', objUrl);
    link.setAttribute('download', 'render.csv');

    document.body.appendChild(link); // Append link to the body
    link.click(); // Simulate click to start download
    document.body.removeChild(link); // Remove the link after download

    URL.revokeObjectURL(objUrl);
    }


})();