window.TemplateRegistry.register('china-chic', {
    name: '国潮中国风',
    category: 'rich-decoration',
    render: function (elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#8b0000;margin:28px 0 14px;padding:16px 24px;background:linear-gradient(135deg,#fdf6e3,#f5e6d3);border:2px solid #c9a96e;text-align:center;letter-spacing:4px;">〖 ' + window.escapeHtml(el.label + el.text) + ' 〗</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:#8b4513;margin:20px 0 10px;padding:10px 18px;border-top:1px solid #c9a96e;border-bottom:1px solid #c9a96e;letter-spacing:2px;">◆ ' + window.escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:#a0522d;margin:14px 0 8px;padding-left:16px;border-left:3px solid #c9a96e;letter-spacing:1px;">▪ ' + window.escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<p style="margin:6px 0;padding-left:20px;color:#5d4037;line-height:2;letter-spacing:0.5px;"><span style="color:#c9a96e;margin-right:8px;">◇</span>' + window.escapeHtml(el.items[j]) + '</p>';
                    }
                    break;
                case 'paragraph':
                    html += '<p style="margin:14px 0;line-height:2.1;color:#3e2723;text-indent:2em;letter-spacing:1px;">' + window.escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }
});
