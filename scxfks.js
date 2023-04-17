// ==UserScript==
// @name        四川学法考法平台 - scxfks.com
// @namespace   Violentmonkey Scripts
// @match       *://xxpt.scxfks.com/*
// @grant       GM_getValue
// @grant       GM_setValue
// @version     1.05
// @author      ShianoQwQ
// @description 2023/4/13 Original author:cutesun(greasyfork.org/zh-CN/users/888826-cutesun)
// @license MIT
// ==/UserScript==
(function () {
    'use strict';
    console.log("location.hostname:", location.hostname)
    console.log("location.href:", location.href)
    var myDate = new Date();
    var dateToday = myDate.toLocaleDateString();
    if (GM_getValue("dt", "1") != dateToday) {
        // 检查已完成的日期是否是当天
        GM_setValue("limit", 0);
        GM_setValue("dt", dateToday);
    }

    if (GM_getValue("limit", 0) == 1 && GM_getValue("dt", "1") == dateToday) {
        // 当天已完成则修改标题
        document.title = "已到达今日上限";
    }

    if (location.href.indexOf("xxpt.scxfks.com/study/course/") != -1 && location.href.indexOf("chapter") == -1 && GM_getValue("limit", 0) == 0) {
        const chapterElement = document.querySelectorAll("li.c_item div")
        // 选择课程li下的div元素，每两个元素对应一个章节课程，
        let divIndex = 0;
        var intervalCourse = setInterval(() => {
            // 遍历每个章节
            console.log(divIndex);
            if (divIndex >= chapterElement.length) {
                // 如果index超出上限，则返回首页
                clearInterval(intervalCourse);
                document.querySelectorAll("a.menu_item")[0].click();
            }
            else {
                console.log(chapterElement[divIndex].innerText);
                if (chapterElement[divIndex + 1].innerHTML.indexOf("&nbsp; &nbsp;") != -1) {
                    // 寻找未学习章节
                    console.log("点击未学");
                    clearInterval(intervalCourse);
                    chapterElement[divIndex + 1].click();
                }
            }
            divIndex = divIndex + 2;
        }, 100);
    }

    if (location.href.indexOf("http://xxpt.scxfks.com/study/courses/require") != -1) {
        // 从课程推荐进入课程
        const courseElement = document.querySelector("body > section > div > div.contblock > div:nth-child(3) > table > tbody > tr:nth-child(3) > td:nth-child(4) > a")
        var intervalRequire = setInterval(() => {
            console.log(courseElement);
            console.log("进入课程");
            clearInterval(intervalRequire);
            courseElement.click();
        }, 10);
    }

    if (location.href == "http://xxpt.scxfks.com/study/login") {
        var intervalLogin = setInterval(() => {
            const limit = document.getElementById("know")
            if (limit != null) {
                console.log("input.know")
                limit.click();
                clearInterval(intervalLogin);
            }
        }, 100)
    }

    if (location.href == "http://xxpt.scxfks.com/study/index") {
        let courseList = document.querySelectorAll('ul.film_focus_nav > li');
        let courseIndex = 0;
        let intervalIndex = setInterval(() => {
            const course = document.querySelectorAll("div.linebar:not([style='width: 100%;'])");
            console.log(course)
            if (course.length > 0) {
                console.log(course[0]);
                course[0].parentElement.parentElement.lastChild.click();
                clearInterval(intervalIndex);
            }
            courseIndex += 1;
            if (courseIndex >= courseList.length) { clearInterval(intervalIndex); }
            courseList[courseIndex].click();
        }, 2000);
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
                GM_setValue("dt", dateToday);
            }
        }
        var intervalChapter = setInterval(() => {
            if (GM_getValue("limit", 0) == 0) {
                const buttonBack = document.querySelector("button")
                console.log("学完返回")
                buttonBack.click();
            } else {
                const buttonBack = document.querySelector("button")
                buttonBack.click();
                console.log("已到达今日上限");
                document.title = "已到达今日上限";
            }
        }, 10000 + Math.random() * 5000);
    }
})()
