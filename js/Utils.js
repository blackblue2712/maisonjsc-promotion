var Server = {
    umbracoSurfacePath: "/Umbraco/Surface/",
    isProcessing: false,
    callFunc: function (url, func, type, dataType, post) {
        if (!Server.isProcessing) {
            Server.isProcessing = true;
            if (type === undefined) {
                type = "GET";
            }
            if (post === undefined) {
                post = {};
            }
            if (dataType === undefined) {
                dataType = "text";
            }

            post.globalLanguage = $("#global_hdnLanguage").val();
            post.globalCurrentPageId = $("#global_hdnCurrentPageId").val();
            post.globalCultureLCID = $("#global_hdnCultureLCID").val();

            // $.ajax({
            //     type: type,
            //     url: Server.umbracoSurfacePath + url,
            //     data: post,
            //     cache: false,
            //     dataType: dataType,
            //     success: function (response) {
            //         Server.isProcessing = false;
            //         func(response);
            //     },
            //     error: function (response) {
            //         Server.isProcessing = false;
            //         console.log(response);
            //         func(response);
            //     }
            // });
            $("#newsletter").show();
        } else {
            Message.alert("Please waiting...");
        }
    }
};

//Create container called APPBE.commonMethod for common method and properties
var commonMethod = {
    regExForUserName: /^([\w.]+)$/,
    regExForEmail: /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]{2,4}$/,

    validateUserName: function (userName) {
        return this.regExForUserName.test(userName);
    },
    validatePhoneNo: function (phoneNo) {
        phoneNo = phoneNo.trim();
        if (isNaN(phoneNo) || phoneNo.length >= 15 || phoneNo.length <= 5)
            return false;
        return true;
    },
    validateEmail: function (sEmail) {
        sEmail = sEmail.trim();
        if (sEmail.search(this.regExForEmail) != -1)
            return true;
        return false;
    },
    validateIdno: function (idNo) {
        idNo = idNo.trim();
        if (isNaN(idNo) || idNo.length > 12 || idNo.length < 9)
            return false;
        return true;
    },
    validateUndefined: function (strObj) {
        return typeof strObj == 'undefined' ? true : false;
    },
    strLenght: function (sStr) {
        var charset = document.charset;
        var len = 0;
        for (var i = 0; i < sStr.length; i++) {
            len += sStr.charCodeAt(i) < 0 || sStr.charCodeAt(i) > 255 ? (charset == "utf-8" ? 3 : 2) : 1;
        }
        return len;
    },
    byteLength: function (sStr) {
        aMatch = sStr.match(/[^\x00-\x80]/g);
        return (sStr.length + (!aMatch ? 0 : aMatch.length));
    },
    subString: function (sStr, len) {
        var num = 0;
        var strlen = 0;
        var newstr = "";
        var obj_value_arr = sStr.split("");
        for (var i = 0; i < obj_value_arr.length; i++) {
            if (i < len && num + this.byteLength(obj_value_arr[i]) <= len) {
                num += this.byteLength(obj_value_arr[i]);
                strlen = i + 1;
            }
        }
        if (sStr.length > strlen) {
            newstr = sStr.substr(0, strlen);
        } else {
            newstr = sStr;
        }
        return newstr;
    },
    textCounter: function (obj, showid, maxlimit) {
        var sValue = $(obj).val();
        var len = this.strLenght(sValue);
        if (len >= maxlimit) {
            $(obj).val(this.subString(sValue, maxlimit));
            $(showid).html(maxlimit);
        } else {
            $(showid).html(len);
        }
        if (len <= maxlimit) {
            $(showid).css("color", "");
        } else {
            $(showid).css("color", "red");
        }
    },
    clearData: function (selector) {
        var textboxs = $(selector).find("input[type=text]");
        var textareas = $(selector).find("textarea");
        var comboboxs = $(selector).find("select");

        for (var i = 0; i < textboxs.length; i++) {
            $(textboxs[i]).val("");
        }
        for (var i = 0; i < textareas.length; i++) {
            $(textareas[i]).val("");
        }
        for (var i = 0; i < comboboxs.length; i++) {
            $(comboboxs[i]).val("0");
        }
    },
    trackingGA: function (cat, action, label) {
        // ga('send', 'event', cat, action, label);
    }
}
var Message = {
    error: function (msg) {
        jAlert(msg);
    },
    alert: function (msg) {
        jAlert(msg);
    },
    warning: function (msg) {
        jAlert(msg);
    }
};