//var showdown = require('showdown');

// ========== showdown extension ==========
(function (showdown) {
    /**
     * Claire aware showdown extension
     */
    var showdown_extension_claire = function () {
        /** Convert special blockquote to Claire info|warn|error block */
        var blockquote_to_aside = {
            type: 'output',
            regex: /^<blockquote>$\s*<p><strong>(:\w+:)<\/strong>\s*((.*\n*)+?)^<\/blockquote>/gm,
            replace: function (src, type, content) {
                var dest_type =
                    (type == ':information_source:') ? 'information' :
                    (type == ':warning:') ? 'warning' :
                    (type == ':x:' || type == ':error:' ) ? 'error' :
                    '';
                return (dest_type != '')
                    ? '<aside data-claire-semantic="' + dest_type + '"><p>' + content + '</aside>'
                    : src;
            }
        };
        /** Convert special blockquote to Claire question block */
        var blockquote_to_div = {
            type: 'output',
            regex: /^<blockquote>$\s*<p><strong>(:\w+:)<\/strong>\s*((.*\n*)+?)^<\/blockquote>/gm,
            replace: function (src, type, content) {
                var dest_type =
                    (type == ':grey_question:' || type == ':question:') ? 'question' :
                    '';
                return (dest_type != '')
                    ? '<div data-claire-semantic="' + dest_type + '"><p>' + content + '</div>'
                    : src;
            }
        };
        /** Convert 'console' language code block to Claire console block */
        var code_console = {
            type: 'output',
            //regex: /^<pre><code class="console language-console">((.*\n*)+?)<\/code><\/pre>/gm,
            regex: /^<pre><code class="console language-console">((.*?[\n]?)+?)<\/code><\/pre>/gm,
            replace: '<pre><samp>$1</samp></pre>'
        };
        
        /** Convert code block to Claire code block */
        var code_block_language = {
            type: 'output',
            regex: /<pre><code class="(?!console)(\w+) language-\w+">/g,
            replace: '<pre><code class="ace" data-claire-semantic="$1">'
        };
        
        /** Convert code block to Claire code block */
        var code_block = {
            type: 'output',
            regex: /<pre><code>/g,
            replace: '<pre><code class="ace" data-claire-semantic="text">'
        };
        
        /** Convert image paragraph to figure bloc */
        var image_to_figure = {
            type: 'output',
            regex: /<p>(<img src="(.*?)".*?title="(.*?)".*?\/>)<\/p>/g,
            replace: '<figure>$1<figcaption>$3</figcaption></figure>'
        };
        
        return [
            blockquote_to_aside,
            blockquote_to_div,
            code_console,
            code_block_language,
            code_block,
            image_to_figure
        ];
    };
    
    showdown.extension('claire', showdown_extension_claire);
})(showdown);
