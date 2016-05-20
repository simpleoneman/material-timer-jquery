$(document).ready(function () {

  // Format date from html to values for js
  var foramtTimerArray = [];
  var timerSet = $('#clock').data('countdown-start');
  timerSet = timerSet.split(':');
  timerSet.forEach(function (e) {
    if (parseInt(e) < 10) {
      foramtTimerArray.push(e.substr(1));
    } else {
      foramtTimerArray.push(e);
    }
  });
  // Timer values
  var $days = foramtTimerArray[0];
  var $hours = foramtTimerArray[1];
  var $minutes = foramtTimerArray[2];
  var $seconds = foramtTimerArray[3];
  // Print blocks html
  var $daysOut = $('#clock-days');
  var $hoursOut = $('#clock-hours');
  var $minutesOut = $('#clock-minutes');
  var $secondsOut = $('#clock-seconds');
  var $startClock = $('#start-clock');
  // Paste in html values
  $daysOut.text($days < 10 ? '0' + $days + 'd' : $days + 'd');
  $hoursOut.text($hours < 10 ? '0' + $hours + 'h' : $hours + 'h');
  $minutesOut.text($minutes < 10 ? '0' + $minutes + 'm' : $minutes + 'm');
  $secondsOut.text($seconds < 10 ? '0' + $seconds : $seconds);

  $startClock.click(function () {
    $clock($days, $hours, $minutes, $seconds);
    $startClock.css({'opacity':'0', 'transition':'all 1s'});
    setTimeout(function(){
      $startClock.css('visibility', 'hidden');
    }, 1000);
  });

  function $clock($days, $hours, $minutes, $seconds) {
    var $daysOut = $('#clock-days');
    var $hoursOut = $('#clock-hours');
    var $minutesOut = $('#clock-minutes');
    var $secondsOut = $('#clock-seconds');
    var $interval;
    var $intervalAnimation;
    // Paste in html values
    $daysOut.text($days < 10 ? '0' + $days + 'd' : $days + 'd');
    $hoursOut.text($hours < 10 ? '0' + $hours + 'h' : $hours + 'h');
    $minutesOut.text($minutes < 10 ? '0' + $minutes + 'm' : $minutes + 'm');
    $secondsOut.text($seconds < 10 ? '0' + $seconds : $seconds);

    // Animation for seconds
    $intervalAnimation = setInterval(function () {
      if ($days > 0 || $hours > 0 || $minutes > 0 || $seconds > 0) {
        $secondsOut.toggleClass('seconds');
      } else {
        $secondsOut.removeClass('seconds');
        clearInterval($intervalAnimation);
      }
    }, 500);
    // Run timer
    $interval = setInterval(function () {
      if ($days >= 0 && $hours >= 0 && $minutes >= 0 && $seconds >= 0) {
        --$seconds;
      }
      if ($seconds < 0) {
        $seconds = 59;
        --$minutes;
      }
      if ($minutes < 0) {
        $minutes = 59;
        --$hours;
      }
      if ($hours < 0) {
        $hours = 23;
        --$days;
      }
      if ($days === 0 && $hours === 0 && $minutes === 0 && $seconds === 0) {
        clearInterval($interval);
      }
      // Paste in html values
      $daysOut.text($days < 10 ? '0' + $days + 'd' : $days + 'd');
      $hoursOut.text($hours < 10 ? '0' + $hours + 'h' : $hours + 'h');
      $minutesOut.text($minutes < 10 ? '0' + $minutes + 'm' : $minutes + 'm');
      $secondsOut.text($seconds < 10 ? '0' + $seconds : $seconds);
      if ($days === -1) {
        clearInterval($interval);
        $daysOut.text('00d');
        $hoursOut.text('00h');
        $minutesOut.text('00m');
        $secondsOut.text('00');
      }
    }, 1000);
  }

});