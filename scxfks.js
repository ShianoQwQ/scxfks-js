// ==UserScript==
// @name        四川学法考法平台 - scxfks.com
// @namespace   Violentmonkey Scripts
// @match       *://xxpt.scxfks.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.03
// @author      ShianoQwQ
// @description 2023/4/12 Original author:cutesun(greasyfork.org/zh-CN/users/888826-cutesun)
// @license MIT
// ==/UserScript==
(function () {
    'use strict';
    console.log("location.hostname:", location.hostname)
    console.log("location.href:", location.href)
    var myDate = new Date();
    var dt = myDate.toLocaleDateString();
    if (GM_getValue("dt", "1") != dt) {
        GM_setValue("limit", 0);
        GM_setValue("dt", dt);
    }
    if (GM_getValue("limit", 0) == 1 && GM_getValue("dt", "1") == dt) {
        document.title = "已到达今日上限";
    }
    if (location.href.indexOf("xxpt.scxfks.com/study/course/") != -1 && location.href.indexOf("chapter") == -1 && GM_getValue("limit", 0) == 0) {
        const more_element = document.querySelectorAll("div")
        // var i=GM_getValue("n",20);
        var i = 14;
        var run1 = setInterval(() => {
            console.log(i - 19);
            console.log(more_element[i].innerHTML);
            if (more_element[i].innerHTML.indexOf("&nbsp; &nbsp;") != -1) {
                console.log("点击未学");
                // GM_setValue("n",i+2);
                clearInterval(run1);
                more_element[i].click();

            }
            i = i + 2;
        }, 10);
    }

    if (location.href.indexOf("http://xxpt.scxfks.com/study/courses/require") != -1) {
        const more_element = document.querySelector("body > section > div > div.contblock > div:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a")
        run1 = setInterval(() => {
            console.log(more_element);
            console.log("进入课程");
            clearInterval(run1);
            more_element.click();


        }, 10);
    }

    if (location.href == "http://xxpt.scxfks.com/study/login") {
        var run3 = setInterval(() => {
            const limit = document.getElementById("know")
            if (limit != null) {
                console.log("input.know")
                limit.click();
                clearInterval(run3);
            }
        }, 100)
    }
    if (location.href == "http://xxpt.scxfks.com/study/index") {
        var run4 = setInterval(() => {
            const limit = document.querySelector("#indexkejian > a")
            if (limit != null) {
                console.log(limit.innerHTML)
                limit.click();
                clearInterval(run4);
            }
        }, 100)
    }

    if (location.href.indexOf("xxpt.scxfks.com/study/course/") != -1 && GM_getValue("limit", 1) == 1) {
        var buttonClear = document.createElement("a");
        buttonClear.className = "menu_item";
        buttonClear.innerText = "重置";
        buttonClear.onclick = function () {
            GM_setValue("limit", 0);
            alert("已重置当日学习进度，请刷新后开始学习！");
        }
        document.querySelectorAll("div.content.nav div")[0].appendChild(buttonClear);
    }

    if (location.href.indexOf("xxpt.scxfks.com/study/course/") != -1 && location.href.indexOf("chapter") != -1) {
        const limit = document.querySelector("div.limit")
        if (limit != null) {
            if (limit.innerHTML.indexOf("已到达今日上限") != -1) {
                console.log("已到达今日上限")
                GM_setValue("limit", 1);
                GM_setValue("dt", dt);
                //GM_setValue("n", 20);
            }
        }
        var run2 = setInterval(() => {
            if (GM_getValue("limit", 0) == 0) {
                const button1 = document.querySelector("button")
                console.log("学完返回")
                button1.click();
            } else {
                const button1 = document.querySelector("button")
                button1.click();
                console.log("已到达今日上限");
                document.title = "已到达今日上限";
            }
        }, 10000 + Math.random() * 5000);
    }
})()
