
function getURLFragment(defaultFragment) {
    if (window.location.hash) {
        return window.location.hash.substring(1);
    }
    return defaultFragment;
}

function modifyURLFragment(fragment) {
    history.pushState(null,  null, fragment);
}

function doOnMenuClick(event) {
    event.preventDefault();
    $("section#start, section#manual, section#faq").hide();
    $("nav ul li a").removeClass("selected");
    $(this).addClass("selected");
    let section = $(this).attr("href");
    $("section" + section).show();
    modifyURLFragment(section);
}

function closeCookiesAlert(event) {
    $(this).parent().hide();
    localStorage.setItem("wcm-cookies-alert-shown", "yes");
}

function ShowCookiesAlertIfNeeded() {
    var cookiesAlertShown = localStorage.getItem("wcm-cookies-alert-shown");
    console.log(cookiesAlertShown);
    if (cookiesAlertShown == null || cookiesAlertShown == "") {
        $("div.cookies-alert").show();
    }
}

$(function() {
    $("nav ul li a").click(doOnMenuClick);
    $("div.close").click(closeCookiesAlert);
    ShowCookiesAlertIfNeeded();
    let fragment = getURLFragment();
    if (typeof(fragment) == "undefined" || fragment == "" || fragment == "#start") {
        $("section#manual, section#faq").hide();
    } else {
        $("section#start, section#manual, section#faq").hide();
        $("nav ul li a").removeClass("selected");
        $("nav ul li." + fragment + " a").addClass("selected");
        $("section#" + fragment).show();
    }
})
