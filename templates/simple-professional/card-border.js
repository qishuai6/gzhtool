window.TemplateRegistry.register('card-border', {
    name: '卡片边框',
    category: 'simple-professional',
    render: function (elements) {
        var html = '';
        var inSection = false;
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    if (inSection) { html += '</div>'; inSection = false; }
                    html += '<div style="background:#f8f9fa;border-radius:12px;padding:16px 20px;margin:20px 0 12px;border:1px solid #e9ecef;">';
                    html += '<h1 style="font-size:21px;font-weight:bold;color:#212529;margin:0;letter-spacing:1px;">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    html += '</div>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:bold;color:#495057;margin:18px 0 10px;padding:10px 16px;background:#fff;border:1px solid #dee2e6;border-radius:8px;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#6c757d;margin:14px 0 8px;padding-left:12px;border-left:3px solid #adb5bd;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    html += '<div style="background:#fff;border:1px solid #e9ecef;border-radius:8px;padding:12px 16px;margin:10px 0;">';
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;color:#495057;line-height:1.8;"><span style="color:#868e96;margin-right:8px;">●</span>' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    html += '</div>';
                    break;
                case 'paragraph':
                    html += '<p style="margin:12px 0;line-height:1.9;color:#495057;text-indent:2em;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        if (inSection) html += '</div>';
        return html;
    }
});
