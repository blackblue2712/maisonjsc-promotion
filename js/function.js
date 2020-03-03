﻿$(function() {
    Career.Init(), Subscriber.Init(), SiteApp.Init(), ContactPage.Init(), Common.Init(), PageNews.Init()
});
var Career = {
        Init: function() {
            $(".js-career-paging a").on("click", function(t) {
                t.preventDefault(), Career.paging(this)
            }), $(".js-job-btnSearch").on("click", function(t) {
                t.preventDefault(), Career.search(this)
            }), $(".js-textSearch").bind("enterKey", Career.search), $(".js-textSearch").keyup(function(t) {
                13 == t.keyCode && $(this).trigger("enterKey")
            }), $(".js-brand-filter").bind("change", Career.brandFilter), $(".js-type-filter").bind("change", Career.typeFilter), $(".js-location-filter").bind("change", Career.locationFilter), $(".js-file").on("change", Career.checkFiles), $(".js-btn-send").on("click", function() {
                $("#myForm").submit()
            }), $("#myForm").ajaxForm({
                url: "/Umbraco/Surface/Upload/Resume",
                dataType: "json",
                success: function(t) {
                    "success" == t.status ? ($(".upload-file span").html(""), jAlert(t.message), $("#myForm").each(function() {
                        this.reset()
                    })) : jAlert(t.message)
                }
            })
        },
        paging: function(t) {
            var e = $(t).attr("href"),
                a = ($(".js-textSearch").val(), $(".js-brand-filter").attr("brandId"), $(".js-type-filter").attr("type"), $(".js-location-filter").attr("locationId"), e);
            $.ajax({
                type: "POST",
                url: a,
                data: {
                    op: "LoadAjax"
                },
                dataType: "html",
                cache: !1,
                success: function(t) {
                    "" != t && ($(".js-loadContent").html(t), $(".paging a").on("click", function(t) {
                        t.preventDefault(), Career.paging(this)
                    }))
                },
                error: function(t) {
                    jAlert(t)
                }
            })
        },
        search: function() {
            var t = $(".js-filter").attr("url"),
                e = $(".js-textSearch").val(),
                a = t;
            $.ajax({
                type: "POST",
                url: a,
                data: {
                    op: "LoadAjax",
                    textSearch: e
                },
                dataType: "html",
                cache: !1,
                success: function(t) {
                    "0" == t ? jAlert($(".js-textSearch").attr("data-noresult")) : ($(".js-loadContent").html(t), $(".paging a").on("click", function(t) {
                        t.preventDefault(), Career.paging(this)
                    }))
                },
                error: function(t) {
                    jAlert(t)
                }
            })
        },
        brandFilter: function() {
            var t = $(".js-filter").attr("url"),
                e = ($(".js-textSearch").val(), $(".js-brand-filter").val()),
                a = $(".js-type-filter").attr("type"),
                n = $(".js-location-filter").attr("locationId"),
                r = t;
            $.ajax({
                type: "POST",
                url: r,
                data: {
                    op: "LoadAjax",
                    brandId: e,
                    typeString: a,
                    locationId: n
                },
                dataType: "html",
                cache: !1,
                success: function(t) {
                    "" != t && ($(".js-loadContent").html(t), $(".paging a").on("click", function(t) {
                        t.preventDefault(), Career.paging(this)
                    }), $(".js-brand-filter").attr("brandId", e))
                },
                error: function(t) {
                    jAlert(t)
                }
            })
        },
        typeFilter: function() {
            var t = $(".js-filter").attr("url"),
                e = ($(".js-textSearch").val(), $(".js-brand-filter").attr("brandId")),
                a = $(".js-type-filter").val(),
                n = $(".js-location-filter").attr("locationId"),
                r = t;
            $.ajax({
                type: "POST",
                url: r,
                data: {
                    op: "LoadAjax",
                    brandId: e,
                    typeString: a,
                    locationId: n
                },
                dataType: "html",
                cache: !1,
                success: function(t) {
                    "" != t && ($(".js-loadContent").html(t), $(".paging a").on("click", function(t) {
                        t.preventDefault(), Career.paging(this)
                    }), $(".js-type-filter").attr("type", a))
                },
                error: function(t) {
                    jAlert(t)
                }
            })
        },
        locationFilter: function() {
            var t = $(".js-filter").attr("url"),
                e = ($(".js-textSearch").val(), $(".js-brand-filter").attr("brandId")),
                a = $(".js-type-filter").attr("type"),
                n = $(".js-location-filter").val(),
                r = t;
            $.ajax({
                type: "POST",
                url: r,
                data: {
                    op: "LoadAjax",
                    brandId: e,
                    typeString: a,
                    locationId: n
                },
                dataType: "html",
                cache: !1,
                success: function(t) {
                    "" != t && ($(".js-loadContent").html(t), $(".paging a").on("click", function(t) {
                        t.preventDefault(), Career.paging(this)
                    }), $(".js-location-filter").attr("locationId", n))
                },
                error: function(t) {
                    jAlert(t)
                }
            })
        },
        checkFiles: function(t) {
            var e = ($(this).attr("curLang"), this.files ? this.files : []);
            return e.length && window.FileReader ? e[0].size > 6291456 ? (jAlert($(".js-file").attr("langSize")), !1) : -1 == $.inArray($(this).val().split(".").pop().toLowerCase(), BE.functions._allowExtension) ? (jAlert($(".js-file").attr("langType")), !1) : void $(".upload-file span").text($(this).val().split("\\").pop()) : !1
        }
    },
    SiteApp = {
        Init: function() {
            $(".js-txtSearchKey").on("keypress", function(t) {
                13 == t.keyCode && SiteApp.searchPage(this)
            }), $(".js-btnSearchKey").on("click", function(t) {
                t.preventDefault(), SiteApp.searchPage()
            })
        },
        searchPage: function() {
            var t = $(".js-txtSearchKey").val();
            return "" == t ? (jAlert("Vui lòng nhập từ khóa cần tìm"), !1) : (window.location.href = "/search/?q=" + encodeURI(t), !1)
        }
    },
    BrandPage = {
        Init: function() {
            $(".js-cboCitys").click(BrandPage.filterByCity)
        },
        filterByCity: function(t) {
            var e = $(t).val();
            if (0 == e) $(".js-listDistricts").html('<select class="default-usage-select"><option value="0">ALL</option></select>'), $(".listitem li").css({
                display: "block"
            }), $(".js-listDistricts select").selectbox();
            else {
                $(".listitem li").css({
                    display: "none"
                }), $(".listitem ." + e).css({
                    display: "block"
                }), $(".js-listDistricts").html("");
                var a = window.location.href;
                $.ajax({
                    method: "POST",
                    url: a,
                    data: {
                        ProvinceId: e,
                        op: "LoadAjax"
                    }
                }).done(function(t) {
                    $(".js-listDistricts").html(t), $(".js-listDistricts select").selectbox()
                })
            }
        },
        filterByDistrict: function(t) {
            var e = $(t).val();
            0 == e ? $(".listitem li").css({
                display: "block"
            }) : ($(".listitem li").css({
                display: "none"
            }), $(".listitem ." + e).css({
                display: "block"
            }))
        }
    },
    ContactPage = {
        Init: function() {
            $(".js-btnContactPage").click(ContactPage.submitUserContact)
        },
        submitUserContact: function() {
            var t = $("#txtContactName"),
                e = $("#txtContactEmail"),
                a = $("#txtSendto"),
                n = $("#txtContactPhone"),
                r = $("#txtContactMessage");
            if ($(".js-join-subcriber").is(":checked")) var i = 1;
            else var i = 0;
            var l = $(this).attr("data-id"),
                s = "",
                o = null;
            return "" == t.val() && (s += t.attr("lang") + "\n", o = null != o ? o : t), "" == e.val() ? (s += e.attr("lang") + "\n", o = null != o ? o : e) : "" == e.val() || commonMethod.validateEmail(e.val()) || (s += e.attr("data-invalid") + "\n", o = null != o ? o : e), "" == n.val() ? (s += n.attr("lang") + "\n", o = null != o ? o : n) : (0 == Common.checkNumeric(n.val()) || 0 == Common.checkFormatPhone(n.val())) && (s += n.attr("lang-phone-fail") + "\n", o = null != o ? o : n), "" == r.val() && (s += r.attr("lang") + "\n", o = null != o ? o : r), "" != s ? void jAlert(s, "", function() {
                $(o).focus()
            }) : void Server.callFunc("Contact/SubmitUserContact", function(t) {
                1 == t.Status ? (commonMethod.clearData("#pContact"), $("#thankyou-registration").show()) : jAlert(t.Message)
            }, "POST", "json", {
                Name: t.val(),
                Email: e.val(),
                Sendto: a.val(),
                Phone: n.val(),
                Message: r.val(),
                id: l,
                JoinSubscriber: i
            })
        }
    },
    Subscriber = {
        location: "",
        Init: function() {
            $("#txtSubscriberEmail").on("keypress", function(t) {
                13 == t.keyCode && Subscriber.submitEmail()
            }), $(".js-btnSubscriber").click(Subscriber.submitEmail), $(".js-subscriber-submit").on("click", function(t) {
                t.preventDefault(), Subscriber.submitSubscriber(this)
            })
        },
        addOtherTextbox: function(t) {
            "other" == $(t).val() ? ($(".js-othercountry").css({
                display: "block"
            }), Subscriber.location = $(t).val()) : ($(".js-othercountry").css({
                display: "none"
            }), Subscriber.location = $(t).text())
        },
        submitEmail: function() {
            var t = null,
                e = 0,
                a = "",
                n = $("#txtSubscriberEmail");
            return "" == n.val() || n.val() == n.attr("placeholder") ? (a += "<p>" + n.attr("lang") + "</p>", t = null == t ? n : t, e += 1) : "" == n.val() || commonMethod.validateEmail(n.val()) || (a += "<p>" + n.attr("data-invalid") + "</p>", t = null != t ? t : n), "" != a ? (a = e > 1 ? '<div class="multi-msg">' + a + "</div>" : a, jAlert(a, "Thông báo", function() {
                $(t).focus()
            }), !1) : void Server.callFunc("Subscriber/Submit", function(t) {
                1 == t.status ? ($("#newsletter").show(), $(".default-usage-select").selectbox(), $(".js-email").val(n.val())) : jAlert(t.message)
            }, "POST", "json", {
                Email: n.val()
            })
        },
        submitSubscriber: function() {
            var t = null,
                e = 0,
                a = "",
                n = $(".js-customerName");
            ("" == n.val() || n.val() == n.attr("placeholder")) && (a += "<p>" + n.attr("lang") + "</p>", t = null == t ? n : t, e += 1);
            var r = $(".js-gender");
            "" == r.val() && (a += "<p>" + r.attr("lang") + "</p>", e += 1);
            var i = $(".js-country");
            "" == Subscriber.location || "other" == Subscriber.location && ("" == i.val() || i.val() == i.attr("placeholder")) ? (a += "<p>" + $(".js-location").attr("lang") + "</p>", e += 1) : "other" == Subscriber.location || "Foreign Country" == Subscriber.location ? Subscriber.location = i.val() : Subscriber.location = $(".loca").find(".jquery-selectbox-currentItem").text();
            var l = $(".js-phone");
            return "" == l.val() || l.val() == l.attr("placeholder") ? (a += "<p>" + l.attr("lang") + "</p>", t = null == t ? l : t, e += 1) : (0 == Common.checkNumeric(l.val()) || 0 == Common.checkFormatPhone(l.val())) && (a += "<p>" + l.attr("lang-phone-fail") + "</p>", t = null == t ? l : t, e += 1), "" != a ? (a = e > 1 ? '<div class="multi-msg">' + a + "</div>" : a, jAlert(a, "Thông báo", function() {
                $(t).focus()
            }), !1) : void Server.callFunc("Subscriber/SubmitInfo", function(t) {
                1 == t.status ? (n.val(" "), $(".js-email").val(" "), l.val(" "), $("#newsletter").hide(), $("#thankyou").show()) : jAlert(t.message)
            }, "POST", "json", {
                customerName: n.val(),
                Email: $(".js-email").val(),
                gender: r.val(),
                location: Subscriber.location,
                phone: l.val()
            })
        }
    },
    PageNews = {
        brandId: 0,
        Init: function() {
            $(".paging .js-loadpaging").bind("click", PageNews.LoadPaging), $(".js-sortby").bind("click", PageNews.LoadPaging), $(".js-brandfilter").bind("change", function() {
                PageNews.brandId = $(this).val(), PageNews.LoadPaging(this)
            }), $(".js-pressFilter").bind("change", function(t) {
                t.preventDefault(), PageNews.pressFilter(this)
            })
        },
        LoadPaging: function(t) {
            var e = this,
                a = $(".currentUrl").val();
            void 0 != $(this).attr("href") && (t.preventDefault(), a = $(this).attr("href")), Server.umbracoSurfacePath = "", Server.callFunc(a, function(t) {
                $(".js-listnews-content").html(t), $(".paging .js-loadpaging").bind("click", PageNews.LoadPaging), $(".news-item").addClass("animate-scroll"), $(e).hasClass("js-sortby") && ($(".js-sortby").removeClass("active"), $(e).addClass("active"))
            }, "POST", "text", {
                op: "LoadAjax",
                brand: PageNews.brandId
            })
        },
        pressFilter: function(t) {
            var e = $(t).val();
            "0" != e ? ($(".press-release--list").hide(), $(".year-" + e).show()) : $(".press-release--list").show()
        }
    },
    Common = {
        Init: function() {
            $(".btn-close").on("click", function() {
                $(".popup").hide(), $(".wrap-box--search").hide()
            })
        },
        checkNumeric: function(t) {
            var e = /^\d+$/,
                a = /^((\d+(\.\d *)?)|((\d*\.)?\d+))$/;
            return e.test(t) || a.test(t) ? !0 : !1
        },
        checkFormatPhone: function(t) {
            return t = t.trim(), t.length >= 14 || t.length <= 7 ? !1 : !0
        }
    };