window.TemplateRegistry.register('tech-business-blue', {
    name: '科技商务蓝',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#fff;margin:28px 0 14px;padding:16px 24px;background:linear-gradient(135deg,#1565c0,#0277bd);border-radius:8px;border-left:5px solid #00e5ff;">💼 ' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#0d47a1;margin:20px 0 10px;padding:10px 18px;background:linear-gradient(to right,#e3f2fd,#fff);border-left:4px solid #2196f3;border-radius:4px;">📊 ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#1976d2;margin:14px 0 8px;padding-left:14px;border-left:3px solid #64b5f6;">▸ ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    html += '<div style="background:#f5f9ff;border:1px solid #bbdefb;border-radius:8px;padding:12px 16px;margin:10px 0;">';
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;color:#333;line-height:1.8;"><span style="color:#1976d2;margin-right:8px;">✓</span>' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    html += '</div>';
                    break;
                case 'paragraph':
                    html += '<p style="margin:12px 0;line-height:1.9;color:#333;text-indent:2em;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
