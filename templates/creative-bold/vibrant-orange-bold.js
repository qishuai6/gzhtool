window.TemplateRegistry.register('vibrant-orange-bold', {
    name: '橙色大胆',
    category: 'creative-bold',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:24px;font-weight:900;color:#fff;margin:28px 0 14px;padding:18px 24px;background:linear-gradient(135deg,#ff6d00,#ff9100);border-radius:12px;text-align:center;letter-spacing:3px;text-shadow:2px 2px 4px rgba(0,0,0,0.2);">🔥 ' + window.escapeHtml(el.label + el.text) + ' 🔥</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:18px;font-weight:700;color:#e65100;margin:22px 0 12px;padding:12px 18px;background:#fff3e0;border-radius:8px;border-left:5px solid #ff6d00;">⚡ ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:16px;font-weight:700;color:#ff6d00;margin:16px 0 8px;padding:8px 14px;background:linear-gradient(to right,#fff3e0,transparent);border-radius:4px;">▶ ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:8px 0;padding:8px 16px;background:#fff8e1;border-radius:8px;color:#333;line-height:1.8;border-left:3px solid #ffab00;"><span style="color:#ff6d00;font-weight:bold;margin-right:8px;">✦</span>' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    break;
                case 'paragraph':
                    html += '<p style="margin:12px 0;line-height:1.9;color:#333;text-indent:2em;font-size:15px;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
