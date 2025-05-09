// ==UserScript==
// @name         Mätningstid
// @namespace    http://tampermonkey.net/
// @version      2025-04-03
// @description  try to take over the world!
// @author       B22samer
// @match        http://localhost:5173/*
// @icon         none
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const totalRuns = 51;

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
    }
})();