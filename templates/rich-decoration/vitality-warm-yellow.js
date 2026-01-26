window.TemplateRegistry.register('vitality-warm-yellow', {
    name: '活力暖黄',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#f57f17;margin:28px 0 14px;padding:14px 20px;background:linear-gradient(135deg,#fff9c4,#fff176);border-radius:12px;text-align:center;">☀️ ' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#ff8f00;margin:20px 0 10px;padding:10px 16px;background:#fffde7;border-radius:8px;border:1px dashed #ffca28;">🌻 ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#f9a825;margin:14px 0 8px;padding-left:12px;border-left:4px solid #fdd835;">🌼 ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding:6px 14px;color:#444;line-height:1.8;background:#fffde7;border-radius:6px;margin-left:8px;"><span style="color:#f9a825;margin-right:6px;">🔆</span>' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    break;
                case 'paragraph':
                    html += '<p style="margin:12px 0;line-height:1.9;color:#444;text-indent:2em;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
