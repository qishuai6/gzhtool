window.TemplateRegistry.register('academic-report', {
    name: '学术报告',
    category: 'creative-bold',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:24px;font-weight:bold;color:#1a237e;margin:32px 0 16px;padding-bottom:12px;border-bottom:3px double #1a237e;text-align:center;letter-spacing:4px;">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:18px;font-weight:bold;color:#283593;margin:24px 0 12px;padding:8px 0;border-bottom:1px solid #9fa8da;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:16px;font-weight:600;color:#3949ab;margin:18px 0 10px;padding-left:16px;border-left:3px solid #7986cb;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    html += '<div style="background:#f5f5f5;border-left:3px solid #9fa8da;padding:12px 18px;margin:12px 0;">';
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;color:#37474f;line-height:1.9;font-size:14px;"><span style="color:#3949ab;margin-right:8px;">•</span>' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    html += '</div>';
                    break;
                case 'paragraph':
                    html += '<p style="margin:14px 0;line-height:2;color:#37474f;text-indent:2em;font-size:15px;letter-spacing:0.3px;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
