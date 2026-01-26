window.TemplateRegistry.register('minimal-line', {
    name: '极简线条',
    category: 'simple-professional',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:700;color:#2c3e50;margin:30px 0 14px;padding-bottom:10px;border-bottom:1px solid #ddd;letter-spacing:2px;">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#34495e;margin:22px 0 10px;padding-bottom:6px;border-bottom:1px dashed #ccc;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#555;margin:16px 0 8px;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding-left:18px;color:#555;line-height:1.8;">— ' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    break;
                case 'paragraph':
                    html += '<p style="margin:12px 0;line-height:2;color:#444;text-indent:2em;letter-spacing:0.5px;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
