window.TemplateRegistry.register('fresh-green-optimized', {
    name: '清新绿意',
    category: 'simple-professional',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#2d6a4f;margin:28px 0 14px;padding:12px 0;border-bottom:2px solid #95d5b2;letter-spacing:1px;">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:bold;color:#40916c;margin:20px 0 10px;padding:8px 14px;background:#d8f3dc;border-radius:6px;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#52b788;margin:14px 0 8px;padding-left:12px;border-left:3px solid #52b788;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding-left:18px;color:#444;line-height:1.8;"><span style="color:#52b788;margin-right:6px;">🌿</span>' + window.escapeHtml(el.items[j]) + '</p>';
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
