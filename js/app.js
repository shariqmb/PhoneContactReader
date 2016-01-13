document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    // we will not be doing anything!!
}

$(document).on("pageshow", function () {
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
    if ($("#contactsList").length == 1) {
        $("body").addClass('ui-disabled').css("background", "#000");
        $.mobile.loading("show");
        var options = new ContactFindOptions();
        options.filter = "";
        options.multiple = true;
        var filter = ["displayName", "phoneNumbers"];
        navigator.contacts.find(filter, onSuccess, onError, options);
    }
});

function onSuccess(contacts) {
    var html = "";
    for (var i = 0; i < contacts.length; i++) {
        if ($.trim(contacts[i].displayName).length != 0 || $.trim(contacts[i].nickName).length != 0) {
            html += '<li>';
            html += '<h2>' + contacts[i].displayName ? contacts[i].displayName : contacts[i].nickName + '</h2>';
            if (contacts[i].phoneNumbers) {
                html += '<ul class="innerlsv" data-role="listview" data-inset="true">';
                html += '<li><h3>Phone Numbers</h3></li>';
                for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                    html += "<li>Type: " + contacts[i].phoneNumbers[j].type + "<br/>" +
                        "Value: " + contacts[i].phoneNumbers[j].value + "<br/>" +
                        "Preferred: " + contacts[i].phoneNumbers[j].pref + "</li>";
                }
                html += "</ul>";
            }
            html += '</li>';
        }
    }
    if (contacts.length === 0) {
        html = '<li data-role="collapsible" data-iconpos="right" data-shadow="false" data-corners="false">';
        html += '<h2>No Contacts</h2>';
        html += '<label>No Contacts Listed</label>';
        html += '</li>';
    }
    $("#contactsList").html(html);
    $("#contactsList").listview('refresh');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}

function onError(contactError) {
    alert('Oops Something went wrong!');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}