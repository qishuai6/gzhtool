window.TemplateRegistry.register('creative-carnival', {
    name: '创意狂欢',
    category: 'visual-balance',
    render: function (elements) {
        var html = '';
        var colors = ['#e91e63', '#9c27b0', '#3f51b5', '#009688', '#ff5722'];
        var colorIdx = 0;
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var c = colors[colorIdx % colors.length];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;color:#fff;margin:28px 0 14px;padding:14px 20px;background:linear-gradient(135deg,' + c + ',' + colors[(colorIdx + 1) % colors.length] + ');border-radius:10px;text-align:center;">' + window.escapeHtml(el.label + el.text) + '</h1>';
                    colorIdx++;
                    break;
                case 'h2':
                    html += '<h2 style="font-size:17px;font-weight:600;color:' + c + ';margin:20px 0 10px;padding:10px 16px;border:2px solid ' + c + ';border-radius:8px;text-align:center;">' + window.escapeHtml(el.label + el.text) + '</h2>';
                    colorIdx++;
                    break;
                case 'h3':
                    html += '<h3 style="font-size:15px;font-weight:600;color:' + c + ';margin:14px 0 8px;padding-left:12px;border-left:4px solid ' + c + ';">' + window.escapeHtml(el.label + el.text) + '</h3>';
                    colorIdx++;
                    break;
                case 'list-group':
                    for (var j = 0; j < el.items.length; j++) {
                        var lc = colors[(colorIdx + j) % colors.length];
                        html += '<p style="margin:6px 0;padding-left:18px;color:#444;line-height:1.8;"><span style="color:' + lc + ';margin-right:8px;">★</span>' + window.escapeHtml(el.items[j]) + '</p>';
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
