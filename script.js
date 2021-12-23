var currentHour = parseInt(moment().format('H'));
var time = [9, 10, 11, 12, 13, 14, 15, 16, 17,];
var classes = [".9am", ".10am", ".11am", ".12pm", ".1pm", ".2pm", ".3pm", ".4pm", ".5pm",];
var classIndex = time.indexOf(currentHour);
$("#currentDay").text(moment().format('dddd, MMMM D, YYYY'));
var currentDayCheck = moment().format('dddd, MMMM D, YYYY')
var notes = ["", "", "", "", "", "", "", "", "",]


if (currentHour < 10) {
    allFuture();
}
else if (currentHour > 16) {
    allPast();
}
else {
    formatTimes()
}




function allFuture() {
    for (i = 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
    $(classes[0]).addClass("present");
}

function allPast() {
    for (i = 0; i < classes.length - 1; i++) {
        $(classes[i]).addClass("past");
    }
    $(classes[time.length - 1]).addClass("present");
}

function formatTimes() {
    $(classes[classIndex]).addClass("present");
    for (i = 0; i < classIndex; i++) {
        $(classes[i]).addClass("past");
    }    
    for (i = classIndex + 1; i < classes.length; i++) {
        $(classes[i]).addClass("future");
    }
}

$(".saveBtn").on("click", function () {
    var dI = $(this).data('index');
    notes[dI] = $(classes[dI]).val();
    localStorage.setItem('notes', JSON.stringify(notes))
    alert("saved")
})

grabData();

function grabData() {
    notes = JSON.parse(localStorage.getItem("notes"));
    if (notes == null) {
        notes = ["", "", "", "", "", "", "", "", ""];
        return;
    }
    for (i = 0; i < classes.length; i++) {
        ($(classes[i])).val(notes[i]);
    }
}

$(".clear").on("click", function () {
    clearData() 
})
function clearData() {
    var confirmDelete = confirm("Are you sure?");
    if (confirmDelete == true) {
        notes = ["", "", "", "", "", "", "", "", ""];
        localStorage.setItem('notes', JSON.stringify(notes));
        grabData();
    }
}
