window.TemplateRegistry.register('modern-business', {
    name: '现代商务',
    category: 'simple-professional',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#1a1a2e;margin:28px 0 16px;padding:12px 0;border-bottom:3px solid #0f3460;letter-spacing:1px;">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:18px;font-weight:bold;color:#0f3460;margin:22px 0 12px;padding-left:12px;border-left:4px solid #0f3460;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:16px;font-weight:600;color:#16213e;margin:16px 0 8px;padding-left:10px;border-left:3px solid #e94560;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:8px 0;padding-left:16px;color:#333;line-height:1.8;position:relative;"><span style="color:#e94560;margin-right:8px;">▸</span>' + window.escapeHtml(el.items[j]) + '</p>';
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
