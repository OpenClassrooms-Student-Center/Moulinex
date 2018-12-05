
/**
* Open the file selected by the user 
* and convert its content to print it on the page.
**/
var openFile = function(event) {
    var input = event.target;
    var md_content;
    
    var reader = new FileReader();
    reader.onload = function(){
        var md_content = reader.result;
        var html_course = convert_md_to_ochtml(md_content);
        //document.getElementById('md-content').innerText = md_content;
        document.getElementById('html-course').innerText = html_course;
        document.getElementById('rendered-course').innerHTML = html_course;
    console.log(md_content);
    };
    
    reader.readAsText(input.files[0]);


};


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

    var ochtml = converter.makeHtml(text_md);
    return ochtml;
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

    /* Alert the copied text */
    alert("Your course was copied to your clipboard.");
}

function myFunction() {
  var copyText = document.getElementById("myInput");
  copyText.select();
  document.execCommand("copy");
  
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copied: " + copyText.value;
}

function outFunc() {
  var tooltip = document.getElementById("myTooltip");
  tooltip.innerHTML = "Copy to clipboard";
}