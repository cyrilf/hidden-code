#Hidden Code

It's a jQuery plugin.

Hidden Code allows you to activate an hidden code on your website (e.g. the konami code)

##Examples

Here is some [live examples](http://cyrilf.github.com/hidden-code/examples/index.html).

##Basic use

    $(window).hiddenCode({
        callback: function() {
            alert('You found the hidden Code !');
        }
    });

##Advanced use

    $(window).hiddenCode({
        //You can type a password like this one:
        //   password: 'bacon'
        //Or the following one (with key code) :
    
        password: [66,65,67,79,78],
        callback: function() {
           $("#project_title").html("Nice job you found my hidden code !");
        }
    });


If you have some problems or improvements with it, contact me.

[Cyril F - Web, Software & mobile developer](http://cyrilf.com)
