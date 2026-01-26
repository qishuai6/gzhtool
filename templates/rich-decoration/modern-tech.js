window.TemplateRegistry.register('modern-tech', {
    name: '现代科技',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#00e5ff;margin:28px 0 14px;padding:16px 20px;background:linear-gradient(135deg,#0d1117,#161b22);border-radius:8px;border-left:4px solid #00e5ff;letter-spacing:2px;">⚡ ' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#58a6ff;margin:20px 0 10px;padding:10px 16px;background:#0d1117;border-radius:6px;border:1px solid #30363d;">▶ ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#79c0ff;margin:14px 0 8px;padding-left:14px;border-left:3px solid #388bfd;">» ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    html += '<div style="background:#0d1117;border:1px solid #30363d;border-radius:6px;padding:12px 16px;margin:10px 0;">';
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;color:#c9d1d9;line-height:1.8;font-family:monospace;"><span style="color:#00e5ff;">$</span> ' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    html += '</div>';
                    break;
                case 'paragraph':
                    html += '<p style="margin:12px 0;line-height:1.9;color:#444;text-indent:2em;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
