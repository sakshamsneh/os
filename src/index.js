import Vue from 'vue';
import App from './App.vue';
// import $ from 'jquery';

new Vue({
  el: '#app',
  render: h => h(App),
});

// array/map of window and their z-index, bring the clicked one on top, by reducing others' zindex by 1, and add 1 to clicked window

var proglist = ['notepad', 'console', 'game'];

$(document).ready(function () {
  setInterval(function () {
    var today = new Date();
    $('#timenow').html(
      today.getHours() + ":" + today.getMinutes() + " " +
      today.getDate() + '/' + (today.getMonth() + 1) + '/' + today.getFullYear()
    );
  }, 1000);
  $('.navbar .nav-item').click(function () {
    $(this).toggleClass("selected");
  });
  $("#notifbtn").click(function () {
    $("#notif").toggle("slide", { direction: "right" }, 300);
  });
  $("#startmenubtn").click(function () {
    $("#startmenu").toggle("slide", { direction: "left" }, 300);
  });
  $(".body-content").click(function () {
    hidepanels();
  });
  $(".closewindow").click(function () {
    var $target = $(this).parent().parent();
    $target.hide("fast", function () { $target.remove(); });
  });
  $(".minwindow").click(function () {
    var $target = $(this).parent().parent();
    $target.hide("slow");
    addwindow($target);
  });

  var maxz = $('.window:last').css("zIndex");
  $(".window").on("click", function () {
    maxz++;
    $(this).css('z-index', maxz);
    hidepanels();
  });

  $(".navbar").on('click', '.apps', function () {
    var elem = '#' + $(this).attr('id').slice(0, -1);
    $(elem).show("slow");
    if ($(this).attr('id').slice(-1) == 'm')
      remwindow($(this).attr('id'));
  });

  // create ul of all programs and add, with effects...
  proglist.forEach(prog => {
    $('#proglist').append('<li class="list-group-item bg-dark">' + prog + '</li>')
  });

  // startconsole();
});

var $lastelem = '#startmenubtn';
function addwindow($target) {
  if ($('#' + $target.attr('id') + 'm').length) { //if exists, then show, else create
    $('#' + $target.attr('id') + 'm').show();
  } else {
    var elem = '<div class="nav-link text-white pr-1 pl-1 apps" id=' + $target.attr('id') + 'm' + '>' + $target.attr('id') + '</div>'
    $(elem).insertAfter($lastelem);
  }
  $lastelem = '#' + $target.attr('id') + 'm';
}
function remwindow(elem) {
  $('#' + elem).hide();
}

function hidepanels() {
  $(".panel").hide("slow");
  $(".selected").toggleClass("selected");
}
/*
function createToast(tapp, ttime, tmsg) {
  var toast = '<div class="toast" role="alert" aria-live="assertive" aria-atomic="true"><div class="toast-header"><strong class="mr-auto">' + tapp + '</strong><small>' + ttime + '</small><button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="toast-body">' + tmsg + '</div></div>';
  $('#notiflist').append(toast);
  console.log(toast);
}

var today = new Date();
createToast('test', today.getHours() + ":" + today.getMinutes(), 'test'); */

/* var myT = new Terminal();
$("#console").append(myT.html);
var cont = true;
function startconsole() {
  myT.input('', function (input) {
    var wrdlist = input.split(" ");
    wrdlist.shift();
    switch (wrdlist[0]) {
      case 'help': myT.print('help:check later'); break;
      case 'say': myT.print(wrdlist.slice(1, wrdlist.length).join(" ")); break;
      case 'time': var today = new Date();
        myT.print('The current time is: ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
        break;
      case 'exit': cont = false; break;
      default: myT.print('input correctly');
        break;
    }
  });
} */

function myTerminal() {
  var textArea = $('#term');
  // const newline = "\n> ";
  // textArea.val += newline;
}