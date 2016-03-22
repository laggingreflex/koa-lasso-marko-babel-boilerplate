import { defineWidget } from 'marko-widgets';
import 'public/stylesheets/font-awesome.css';
import './login.css';
import $ from 'jquery';

module.exports = defineWidget({ onSubmit });

var working = false;

function onSubmit(event, form) {
  event.preventDefault();
  if (working) return;
  working = true;
  var $this = $(form);
  var $state = $this.find('button > .state');
  $this.addClass('loading');
  $state.html('Authenticating');
  var inputform = {};
  inputform['username'] = $("[name=username]").val();
  inputform['password'] = $("[name=password]").val();
  $.post('/login', inputform)
    .done(function() {
      $this.addClass('ok');
      $state.html('Welcome back!');
      setTimeout(function() {
        window.location = '/';
      }, 1000);
    })
    .fail(function() {
      $this.removeClass('loading');
      $this.addClass('error');
      $state.html('Oops, login failed!');
    });
}
