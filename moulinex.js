var stackEdit = true;
var md_content;

function updateStackEditValue() {
    stackEdit = jQuery("#stackedit-option").is(":checked");
}

jQuery(document).ready(function() {
    updateStackEditValue();
});


function cleanContent() {
    document.getElementById("html-course").innerText = "";
    document.getElementById("course-content").innerHTML = "";
    document.getElementById("toc").innerHTML = "<span id='toggleTocButton' class=\"ui-icon ui-icon-caret-1-e\" onclick=\"toggleToc()\"></span>";
    document.getElementById("dialog-chapter-extract").innerHTML = "<div class=\"projectContent small-course\"><div class=\"course-content\"><div id=\"chapter-extract\"></div></div></div>";
    md_content = "";
}

/**
* Open the file selected by the user 
* and convert its content to print it on the page.
**/
function openFiles(event) {
    var filelist = document.getElementById('files').files;
    cleanContent();

    for(var i=0; i<filelist.length; i++)
    {
        convertFile(filelist[i]);
    }

    setTimeout(loadContent, 500); // To load the table of content
}

function convertFile(file) {
    var reader = new FileReader();
    reader.onload = function()
    {
        var md_content = reader.result + "\n\n";

        document.getElementById('html-course').innerText += convert_md_to_ochtml(md_content);
        document.getElementById('course-content').innerHTML += convert_md_to_ochtml(md_content);

    }
    reader.readAsText(file, "UTF-8");
}

/**
* When using StackEdit (online markdown editor), you may have a tag left at the
* end of the file. This will automatically delete it.
**/
function removeStackEditTag(ochtmlAsString) {
    var regex = /<!--stackedit_data:(.|\n)*-->/;

    ochtmlAsString = ochtmlAsString.replace(regex, "");
    return ochtmlAsString;
}


/**
* Convert the input markdown text into OpenClassrooms compliant HTML.
* This results in the HTML code you can copy-paste to your course.
**/
function convert_md_to_ochtml(text_md) {
    var converter = new showdown.Converter({
        noHeaderId: true,
        tables: 'true',
        literalMidWordUnderscores: true, // to avoid an_underscored_word to render as an<i>underscored</i>word
        omitExtraWLInCodeBlocks: 'true',
        extensions: ['claire'],
    });

    if (stackEdit) {        
        return removeStackEditTag(converter.makeHtml(text_md));
    }
    else {
        return converter.makeHtml(text_md);
    }
}


/* Functions to copy-paste the text and stylize the button */
function copyTextToClipboard() {

    /* Select the content of the "html-course" div */
    var range = document.createRange();
    range.selectNode(document.getElementById("html-course"));
    window.getSelection().removeAllRanges();
    window.getSelection().addRange(range);


    /* Copy the text to the clipboard */
    document.execCommand("copy");
}