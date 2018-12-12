//jQuery(document).ready(loadContent());


function loadContent() {

    // ===== Dialog : Chapter extract Preview =====
    extractChapter();    

    // ===== Sommaire =====
    extractToC();
}

function extractChapter() {
    jQuery("#dialog-chapter-extract").dialog({
        autoOpen: false,
        width: 900,
        modal: true,
        show: {
            effect: "fade",
            duration: 200
        },
        hide: {
            effect: "fade",
            duration: 200
        },
        beforeClose: function() {
            jQuery('body > .projectContent:first').show();
        }
    });
}

function extractToC() {
    var $toc = jQuery("#toc");
    $toc.resizable();
    var lastLevel = 0;
    var ulStack = [$toc];
    var counter = 0;

    //var levelName = [{key: 1, value: "Title"}, {key: 2, value: "Part"}, {key: 3, value: "Chapter"}, {key: 4, value: "Section"}, {key: 5, value: "Sub-header"}, {key: 6, value: "Subsub-header"}];
    var levelName = ["Title", "Part", "Chapter", "Section", "", ""];

    jQuery(":header").each(function() {
        var $this = jQuery(this);

        //Hide the page title from the toc
        if ($this.hasClass("hide-from-toc")) {
            return;
        }

        counter++;
        
        $this.before('<a name="' + counter + '"/>');
        var $lastUl = ulStack[ulStack.length - 1];
        
        var level = $this.prop('tagName')[1];
        if (level > lastLevel) {
            for (var i = lastLevel; i < level; i++) {
                ulStack.push(jQuery('<ol></ol>').appendTo($lastUl));
            }
        } else if (level < lastLevel) {
            for (var i = lastLevel; i > level; i--) {
                ulStack.pop();
            }
        }
        
        $lastUl = ulStack[ulStack.length - 1];
        var liOpt = '';
        var liAppend = '';
        var liClass = 'toc-level-' + level;
        if (level == 3) {
            $this.nextUntil('h3, h2, h1').wrapAll('<div id="chapter-' + counter + '"></div>');
            liAppend += ' <span class="ui-icon ui-icon-search" onclick="showChapter(' + counter + ')"></span>';
        }
        liOpt += ' class="' + liClass + '"';
        $lastUl.append('<li' + liOpt + '><a href="#' + counter + '">' + $this.html()  + '</a>' + liAppend + '</li>');
        lastLevel = level;
    });
}


function showChapter(id) {
    jQuery("#chapter-extract").empty();
    $chapter = jQuery('#chapter-' + id + ':first');
    jQuery("#chapter-extract").append($chapter.clone());
    jQuery('body > .projectContent:first').first().hide();
    jQuery("#dialog-chapter-extract").dialog('option', 'title', $chapter.prev().html()).dialog('open');
}