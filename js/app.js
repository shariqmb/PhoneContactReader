document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
    var options = new ContactFindOptions();
    options.filter = '';
    options.multiple = true;
    var filter = ['displayName'];
    navigator.contacts.find(filter, onSuccess, onError, options);
}

$(document).on("pageshow", function () {
    if ($("#addContact").length == 1) {
        $("body").addClass('ui-disabled').css("background", "#000");
        $.mobile.loading("show");
        bindAddContactEvents();
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
                for (var j = 0; j < contacts[i].phoneNumbers.length; j++) {
                    html += "<li>Number: " + contacts[i].phoneNumbers[j].value + "</li>";
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
    $("#contactsList").listview().listview('refresh');
    $(".innerlsv").listview().listview('refresh');
}

function onError(contactError) {
    alert('Oops Something went wrong!');
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
}

function bindAddContactEvents() {
    $.mobile.loading("hide");
    $("body").removeClass('ui-disabled');
    $("#addContact").on("click", function () {
        var name = $.trim($("#name").val()),
            number = $.trim($("#number").val());
        if (name.length == 0) {
            alert("Please enter a valid Name");
            return false;
        }
        if (number.length == 0) {
            alert("Please enter a valid Number");
            return false;
        }
        var contact = navigator.contacts.create();
        contact.displayName = name;
        contact.nickname = name;

        var phoneNumbers = [];
        phoneNumbers[0] = new ContactField('mobile', number, true);
        contact.phoneNumbers = phoneNumbers;
        contact.save(createSuccess, createError);
    });
}

function createSuccess() {
    alert("Contact has been successfully added");
    resetPage();
}

function createError() {
    alert("Oops Something went wrong!");
}

function resetPage() {
    $("#name").val("");
    $("#number").val("");
}