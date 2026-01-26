window.TemplateRegistry.register('cyber-neon', {
    name: '赛博霓虹',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:900;color:#ff00ff;margin:28px 0 14px;padding:16px 20px;background:#1a0a2e;border-radius:8px;text-align:center;text-shadow:0 0 10px #ff00ff,0 0 20px #ff00ff;letter-spacing:3px;">✦ ' + window.escapeHtml(el.label + el.text) + ' ✦</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:700;color:#00ffff;margin:20px 0 10px;padding:10px 16px;background:#0a0a2e;border:1px solid #00ffff;border-radius:6px;text-shadow:0 0 5px #00ffff;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#ff6ec7;margin:14px 0 8px;padding-left:14px;border-left:3px solid #ff6ec7;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding-left:18px;color:#444;line-height:1.8;"><span style="color:#ff00ff;margin-right:8px;">⬡</span>' + window.escapeHtml(el.items[j]) + '</p>';
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
