window.TemplateRegistry.register('sidebar-stripe', {
    name: '侧边条纹',
    category: 'visual-balance',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#1a1a1a;margin:28px 0 14px;padding:12px 20px;border-left:6px solid #3b82f6;background:linear-gradient(to right,#eff6ff,transparent);">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#1e40af;margin:20px 0 10px;padding:10px 16px;border-left:4px solid #60a5fa;background:#f0f9ff;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#2563eb;margin:14px 0 8px;padding:8px 14px;border-left:3px solid #93c5fd;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    html += '<div style="border-left:2px solid #bfdbfe;padding-left:16px;margin:10px 0;">';
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;color:#444;line-height:1.8;"><span style="color:#3b82f6;margin-right:8px;">›</span>' + window.escapeHtml(el.items[j]) + '</p>';
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
