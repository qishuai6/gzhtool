window.TemplateRegistry.register('emoji-bubble', {
    name: '表情气泡',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#fff;margin:28px 0 14px;padding:16px 24px;background:linear-gradient(135deg,#ff9a9e,#fecfef);border-radius:20px;text-align:center;">🌈 ' + window.escapeHtml(el.label + el.text) + ' 🌈</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#e91e63;margin:20px 0 10px;padding:10px 18px;background:#fce4ec;border-radius:16px;">💖 ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#ad1457;margin:14px 0 8px;">🔅 ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    var bubbleEmojis = ['💫', '✨', '🌟', '💝', '🎀'];
                    for (var j = 0; j < el.items.length; j++) {
                        var emoji = bubbleEmojis[j % bubbleEmojis.length];
                        html += '<p style="margin:8px 0;padding:8px 14px;background:#fff0f5;border-radius:12px;color:#444;line-height:1.8;">' + emoji + ' ' + window.escapeHtml(el.items[j]) + '</p>';
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
