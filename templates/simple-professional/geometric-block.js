window.TemplateRegistry.register('geometric-block', {
    name: '几何块体',
    category: 'simple-professional',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#fff;margin:24px 0 14px;padding:14px 20px;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:4px;">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:bold;color:#5b4a9e;margin:20px 0 10px;padding:10px 16px;background:#f0ecff;border-radius:4px;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#764ba2;margin:14px 0 8px;padding:8px 14px;background:#faf5ff;border-left:4px solid #764ba2;">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding:6px 14px;color:#444;line-height:1.8;"><span style="display:inline-block;width:8px;height:8px;background:#764ba2;border-radius:2px;margin-right:10px;vertical-align:middle;"></span>' + window.escapeHtml(el.items[j]) + '</p>';
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
