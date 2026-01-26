window.TemplateRegistry.register('fresh', {
    name: '清新风格',
    category: 'visual-balance',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#1e88e5;margin:28px 0 14px;padding:14px 20px;background:linear-gradient(to right,#e3f2fd,#fff);border-radius:8px;border-left:5px solid #1e88e5;">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#1565c0;margin:20px 0 10px;padding:8px 16px;background:#e8f4fd;border-radius:6px;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#42a5f5;margin:14px 0 8px;padding-left:12px;border-left:3px solid #42a5f5;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding-left:18px;color:#444;line-height:1.8;"><span style="color:#42a5f5;margin-right:8px;">◆</span>' + window.escapeHtml(el.items[j]) + '</p>';
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
