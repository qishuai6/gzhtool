window.TemplateRegistry.register('new-year-festival', {
    name: '新年节日',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#ffd700;margin:28px 0 14px;padding:16px 24px;background:linear-gradient(135deg,#c62828,#e53935);border-radius:8px;text-align:center;text-shadow:1px 1px 2px rgba(0,0,0,0.3);">🧧 ' + window.escapeHtml(el.label + el.text) + ' 🧧</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#c62828;margin:20px 0 10px;padding:10px 18px;background:#fff3e0;border:2px solid #ff8f00;border-radius:8px;">🏮 ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#d32f2f;margin:14px 0 8px;padding-left:14px;border-left:4px solid #ff6f00;">🎊 ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding-left:18px;color:#333;line-height:1.8;"><span style="color:#c62828;margin-right:6px;">🎏</span>' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    break;
                case 'paragraph':
                    html += '<p style="margin:12px 0;line-height:1.9;color:#333;text-indent:2em;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
