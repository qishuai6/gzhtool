window.TemplateRegistry.register('artistic-frame', {
    name: '艺术框架',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#5d4037;margin:28px 0 14px;padding:16px 24px;border:2px solid #8d6e63;border-radius:0;text-align:center;position:relative;background:#efebe9;">❧ ' + window.escapeHtml(el.label + el.text) + ' ❧</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#6d4c41;margin:20px 0 10px;padding:10px 20px;border-top:1px solid #bcaaa4;border-bottom:1px solid #bcaaa4;">◈ ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#795548;margin:14px 0 8px;padding-left:16px;font-style:italic;">— ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    html += '<div style="border:1px solid #d7ccc8;padding:12px 18px;margin:10px 0;background:#fafafa;">';
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;color:#5d4037;line-height:1.8;"><span style="color:#8d6e63;margin-right:8px;">✧</span>' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    html += '</div>';
                    break;
                case 'paragraph':
                    html += '<p style="margin:14px 0;line-height:2;color:#4e342e;text-indent:2em;letter-spacing:0.5px;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
