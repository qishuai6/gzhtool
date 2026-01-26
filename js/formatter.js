/**
 * 文本格式化引擎
 * 将原始文本解析为结构化元素数组
 *
 * 元素类型:
 *   h1 - 一级标题 (一、二、三……)
 *   h2 - 二级标题 (（一）（二）（三）……)
 *   h3 - 三级标题 (1、2、3……)
 *   list - 列表项 (- 开头)
 *   paragraph - 普通段落
 */
window.Formatter = (function () {

    // 一级标题正则: "一、" "二、" "三、" ... "十、" 等
    var h1Regex = /^([一二三四五六七八九十百千万]+)、(.*)$/;

    // 二级标题正则: "（一）" "（二）" ...
    var h2Regex = /^[（(]([一二三四五六七八九十百千万]+)[)）]\s*(.*)$/;

    // 三级标题正则: "1、" "2、" "10、" ...
    var h3Regex = /^(\d+)[、.．]\s*(.*)$/;

    // 列表项正则: "- " 开头
    var listRegex = /^[-–—]\s+(.*)$/;

    /**
     * 解析一行文本
     */
    function parseLine(line) {
        var trimmed = line.trim();

        if (!trimmed) {
            return null; // 空行
        }

        var match;

        // 一级标题
        match = trimmed.match(h1Regex);
        if (match) {
            return { type: 'h1', label: match[1] + '、', text: match[2].trim() };
        }

        // 二级标题
        match = trimmed.match(h2Regex);
        if (match) {
            return { type: 'h2', label: '（' + match[1] + '）', text: match[2].trim() };
        }

        // 三级标题
        match = trimmed.match(h3Regex);
        if (match) {
            return { type: 'h3', label: match[1] + '、', text: match[2].trim() };
        }

        // 列表项
        match = trimmed.match(listRegex);
        if (match) {
            return { type: 'list', text: match[1].trim() };
        }

        // 普通段落
        return { type: 'paragraph', text: trimmed };
    }

    /**
     * 解析整段文本为元素数组
     * 会将连续的段落文本合并，将连续的列表项合并为列表组
     */
    function parse(rawText) {
        if (!rawText || !rawText.trim()) {
            return [];
        }

        var lines = rawText.split('\n');
        var elements = [];
        var currentParagraphLines = [];
        var currentListItems = [];

        function flushParagraph() {
            if (currentParagraphLines.length > 0) {
                elements.push({
                    type: 'paragraph',
                    text: currentParagraphLines.join('')
                });
                currentParagraphLines = [];
            }
        }

        function flushList() {
            if (currentListItems.length > 0) {
                elements.push({
                    type: 'list-group',
                    items: currentListItems.slice()
                });
                currentListItems = [];
            }
        }

        for (var i = 0; i < lines.length; i++) {
            var parsed = parseLine(lines[i]);

            if (!parsed) {
                // 空行: 结束当前段落和列表
                flushParagraph();
                flushList();
                continue;
            }

            if (parsed.type === 'h1' || parsed.type === 'h2' || parsed.type === 'h3') {
                flushParagraph();
                flushList();
                elements.push(parsed);
            } else if (parsed.type === 'list') {
                flushParagraph();
                currentListItems.push(parsed.text);
            } else if (parsed.type === 'paragraph') {
                flushList();
                currentParagraphLines.push(parsed.text);
            }
        }

        // 处理末尾
        flushParagraph();
        flushList();

        return elements;
    }

    return {
        parse: parse,
        parseLine: parseLine
    };
})();
