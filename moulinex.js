/**
* Open the file selected by the user 
* and convert its content to print it on the page.
**/
var openFile = function(event) {
    var input = event.target;
    var md_content;
    
    var reader = new FileReader();

    var md_content = "";
    var html_course;
    var reader = new FileReader();  
    function readFile(index) {
        if( index >= input.files.length ) return;
        var file = input.files[index];
        reader.onload = function(e) {  
            // get file content 
            md_content += e.target.result + "\n\n";

            readFile(index+1);

            html_course = convert_md_to_ochtml(md_content);
            document.getElementById('html-course').innerText = html_course;
            document.getElementById('course-content').innerHTML = html_course;
        }
        reader.readAsText(file);
    }
    readFile(0);

    setTimeout(loadContent, 1000);

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
}