window.TemplateRegistry.register('emoji-festival', {
    name: '表情节日',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        var h1Icons = ['🎯', '🚀', '💡', '🏆', '⭐'];
        var h2Icons = ['📌', '📋', '🔖', '📝', '🎗️'];
        var h3Icons = ['✅', '🔹', '💎', '🌟', '🎈'];
        var h1Idx = 0, h2Idx = 0, h3Idx = 0;
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    var icon1 = h1Icons[h1Idx++ % h1Icons.length];
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#1a1a2e;margin:28px 0 14px;padding:14px 20px;background:linear-gradient(to right,#ffecd2,#fcb69f);border-radius:10px;text-align:center;">' + icon1 + ' ' + window.escapeHtml(el.label + el.text) + ' ' + icon1 + '</h1>';
                    break;
                case 'h2':
                    var icon2 = h2Icons[h2Idx++ % h2Icons.length];
                    html += '<h2 style="font-size:17px;font-weight:600;color:#e65100;margin:20px 0 10px;padding:10px 16px;background:#fff8e1;border-radius:8px;">' + icon2 + ' ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    var icon3 = h3Icons[h3Idx++ % h3Icons.length];
                    html += '<h3 style="font-size:15px;font-weight:600;color:#f57c00;margin:14px 0 8px;">' + icon3 + ' ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding-left:8px;color:#444;line-height:1.8;">🔸 ' + window.escapeHtml(el.items[j]) + '</p>';
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
