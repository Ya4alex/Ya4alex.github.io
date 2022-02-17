function setThemeCookie(thm) {
    var exd = new Date();
    exd.setDate(exd.getDate() + 365);
    var c_value = (+thm) + "; expires=" + exd.toUTCString();
    document.cookie = 'theme' + "=" + c_value;
}

function getTheme() {
    var i, x, y, arr_c = document.cookie.split(";");
    for (i = 0; i < arr_c.length; i++) {
        x = arr_c[i].substr(0, arr_c[i].indexOf("="));
        y = arr_c[i].substr(arr_c[i].indexOf("=") + 1);
        x = x.replace(/^\s+|\s+$/g, "");
        if (x == 'theme') {
            return !!Number(y);
        }
    }
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
}
function setTheme(dark) {
    theme = dark;
    setThemeCookie(dark);
    el = document.querySelector('body');
    head = document.querySelector('header');
    if (dark) {
        document.getElementById('switch-theme-light').classList.add('hide-op');

        head.classList.remove('light-back');
        head.classList.add('dark-back');

        el.classList.remove('light-theme');
        el.classList.add('dark-theme');
    } else {
        document.getElementById('switch-theme-light').classList.remove('hide-op');

        head.classList.add('light-back');
        head.classList.remove('dark-back');

        el.classList.add('light-theme');
        el.classList.remove('dark-theme');
    }
    head.animate({
        'background-position-x': '10%',
    }, 10000, 'linear');
}
function changeNav(pos) {
    if (pos > 0) {
        document.getElementById('navbar').classList.add("nav-painted");
        document.getElementById('mobile-head').classList.remove("hide-op");
    } else {
        document.getElementById('navbar').classList.remove("nav-painted");
        document.getElementById('mobile-head').classList.add("hide-op");

    }
}

function openSkill(id) {
    document.getElementById('click-me').classList.add('hide-op');
    el = document.getElementById(id);
    if (el.style.height == '0px') {
        el.style.height = el.scrollHeight + 'px';
    } else {
        el.style.height = '0px';
    }
}

function resizeProjectItem() {
    project_item_width = window.innerWidth - 200;
    if (window.innerWidth < 660) {
        project_item_width += 100;
    } else if ((window.innerWidth - 200) / 2 > 500) {
        project_item_width = (window.innerWidth - 200) / 2 - 30;
    }
    el = document.getElementsByClassName('project-slide');
    for (var i = 0; i < el.length; i++) {
        el[i].style = "min-width:" + project_item_width + "px";
    }
    slideProject(project_index);
}

function slideProject(index) {
    project_index = index;
    d = (project_item_width + 60) * index;
    document.getElementById('project-container').scroll({
        top: 0,
        left: d,
        behavior: 'smooth'
    });
}
function slideProjectRelative(rindex) {
    slideProject(project_index + rindex);
}

function clickHendler(e) {
    el = document.getElementById("b_menu");
    ch = document.getElementById("b_menu_button");
    lb = document.getElementById("b_menu_button_label");

    if (ch.checked && -1 != e.pointerId && !e.composedPath().includes(el) && !e.composedPath().includes(lb) && !e.composedPath().includes(ch)) {
        ch.checked = false;
    }
}
var project_index = 0;
var project_item_width = 0;
var headerOffset = 70;
var theme = getTheme();

document.addEventListener('DOMContentLoaded', function() {
    var head = document.getElementById('header');

    window.addEventListener('scroll', function(e) {
        pos = window.scrollY / 2;
        head.style.backgroundPositionY = pos + "px";
        changeNav(pos);
    });
    const anchors = document.querySelectorAll('a[href*="#"]')

    for (let anchor of anchors) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault()

            const blockID = anchor.getAttribute('href').substr(1)

            pos = document.getElementById(blockID).getBoundingClientRect().top + window.pageYOffset - headerOffset;
            window.scrollTo({
                top: pos,
                behavior: "smooth"
            });
        })
    }
    setTheme(theme);
    document.getElementById('switch-theme').onclick = function() {
        setTheme(!theme);
    }
    resizeProjectItem();
    window.addEventListener('resize', resizeProjectItem);

    document.addEventListener('click', clickHendler);
});
