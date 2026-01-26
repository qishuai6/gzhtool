/**
 * 主应用逻辑
 */
(function () {
    var currentTemplateId = null;

    /**
     * 初始化应用
     */
    function init() {
        buildStyleSelects();
        formatText();
    }

    /**
     * 构建样式选择下拉框
     */
    function buildStyleSelects() {
        var catSelect = document.getElementById('categorySelect');
        var tmplSelect = document.getElementById('templateSelect');
        if (!catSelect || !tmplSelect) return;

        var categories = window.TemplateRegistry.getCategories();

        // 填充分类
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            var templates = window.TemplateRegistry.getByCategory(cat.id);
            if (templates.length === 0) continue;
            var opt = document.createElement('option');
            opt.value = cat.id;
            opt.textContent = cat.name;
            catSelect.appendChild(opt);
        }

        // 监听分类变化
        catSelect.addEventListener('change', function () {
            populateTemplates(catSelect.value);
        });

        // 监听模板变化
        tmplSelect.addEventListener('change', function () {
            currentTemplateId = tmplSelect.value;
            formatText();
        });

        // 默认填充第一个分类的模板
        if (catSelect.options.length > 0) {
            populateTemplates(catSelect.options[0].value);
        }
    }

    /**
     * 根据分类填充模板下拉框
     */
    function populateTemplates(categoryId) {
        var tmplSelect = document.getElementById('templateSelect');
        if (!tmplSelect) return;

        tmplSelect.innerHTML = '';
        var templates = window.TemplateRegistry.getByCategory(categoryId);

        for (var i = 0; i < templates.length; i++) {
            var opt = document.createElement('option');
            opt.value = templates[i].id;
            opt.textContent = templates[i].name;
            tmplSelect.appendChild(opt);
        }

        // 选中第一个模板
        if (tmplSelect.options.length > 0) {
            currentTemplateId = tmplSelect.options[0].value;
            formatText();
        }
    }

    /**
     * 格式化文本并渲染预览
     */
    window.formatText = function () {
        var inputEl = document.getElementById('inputText');
        var previewEl = document.getElementById('previewArea');

        if (!inputEl || !previewEl) return;

        var rawText = inputEl.value;

        if (!rawText || !rawText.trim()) {
            previewEl.innerHTML = '<p class="placeholder">左侧输入内容后，这里将显示排版效果...</p>';
            return;
        }

        var elements = window.Formatter.parse(rawText);

        if (elements.length === 0) {
            previewEl.innerHTML = '<p class="placeholder">左侧输入内容后，这里将显示排版效果...</p>';
            return;
        }

        var template = null;
        if (currentTemplateId) {
            template = window.TemplateRegistry.get(currentTemplateId);
        }

        if (template && typeof template.render === 'function') {
            previewEl.innerHTML = '<div class="wechat-content">' + template.render(elements) + '</div>';
        } else {
            previewEl.innerHTML = '<div class="wechat-content">' + defaultRender(elements) + '</div>';
        }
    };

    /**
     * 默认渲染
     */
    function defaultRender(elements) {
        var html = '';
        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            switch (el.type) {
                case 'h1':
                    html += '<h1 style="font-size:22px;font-weight:bold;margin:24px 0 12px;color:#333;">' + escapeHtml(el.label + el.text) + '</h1>';
                    break;
                case 'h2':
                    html += '<h2 style="font-size:18px;font-weight:bold;margin:20px 0 10px;color:#555;">' + escapeHtml(el.label + el.text) + '</h2>';
                    break;
                case 'h3':
                    html += '<h3 style="font-size:16px;font-weight:bold;margin:16px 0 8px;color:#666;">' + escapeHtml(el.label + el.text) + '</h3>';
                    break;
                case 'list-group':
                    html += '<ul style="margin:12px 0;padding-left:20px;">';
                    for (var j = 0; j < el.items.length; j++) {
                        html += '<li style="margin:4px 0;color:#444;">' + escapeHtml(el.items[j]) + '</li>';
                    }
                    html += '</ul>';
                    break;
                case 'paragraph':
                    html += '<p style="margin:12px 0;line-height:1.8;color:#444;">' + escapeHtml(el.text) + '</p>';
                    break;
            }
        }
        return html;
    }

    /**
     * HTML 转义
     */
    function escapeHtml(text) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(text));
        return div.innerHTML;
    }
    window.escapeHtml = escapeHtml;

    /**
     * 复制到公众号
     */
    window.copyToClipboard = function () {
        var previewEl = document.getElementById('previewArea');
        if (!previewEl) return;

        var content = previewEl.querySelector('.wechat-content');
        if (!content) {
            showToast('--', '暂无内容', '请先在左侧输入文本内容');
            return;
        }

        var range = document.createRange();
        range.selectNodeContents(content);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            if (navigator.clipboard && window.ClipboardItem) {
                var htmlBlob = new Blob([content.innerHTML], { type: 'text/html' });
                var textBlob = new Blob([content.innerText], { type: 'text/plain' });
                var item = new ClipboardItem({
                    'text/html': htmlBlob,
                    'text/plain': textBlob
                });
                navigator.clipboard.write([item]).then(function () {
                    showToast('OK', '复制成功', '请打开公众号后台，直接 Ctrl+V 粘贴即可');
                }).catch(function () {
                    fallbackCopy();
                });
            } else {
                fallbackCopy();
            }
        } catch (e) {
            fallbackCopy();
        }

        selection.removeAllRanges();
    };

    function fallbackCopy() {
        try {
            document.execCommand('copy');
            showToast('OK', '复制成功', '请打开公众号后台，直接 Ctrl+V 粘贴即可');
        } catch (e) {
            showToast('--', '复制失败', '请手动选择预览区内容进行复制');
        }
    }

    /**
     * 清空输入
     */
    window.clearInput = function () {
        var inputEl = document.getElementById('inputText');
        if (inputEl) {
            inputEl.value = '';
            formatText();
        }
    };

    /**
     * 复制提示词
     */
    window.copyPrompt = function (event) {
        var promptEl = document.getElementById('aiPromptText');
        if (!promptEl) return;

        var text = promptEl.textContent || promptEl.innerText;

        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function () {
                showToast('OK', '提示词已复制', '现在去把它发给豆包或 DeepSeek 吧');
            }).catch(function () {
                fallbackCopyText(text);
            });
        } else {
            fallbackCopyText(text);
        }
    };

    function fallbackCopyText(text) {
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            showToast('OK', '提示词已复制', '现在去把它发给豆包或 DeepSeek 吧');
        } catch (e) {
            showToast('--', '复制失败', '请手动选择提示词内容进行复制');
        }
        document.body.removeChild(textarea);
    }

    /**
     * Toast 提示
     */
    function showToast(icon, title, message) {
        var oldOverlay = document.querySelector('.toast-overlay');
        var oldToast = document.querySelector('.toast');
        if (oldOverlay) oldOverlay.remove();
        if (oldToast) oldToast.remove();

        var overlay = document.createElement('div');
        overlay.className = 'toast-overlay';
        document.body.appendChild(overlay);

        var toast = document.createElement('div');
        toast.className = 'toast';
        toast.innerHTML =
            '<div class="toast-icon">' + escapeHtml(icon) + '</div>' +
            '<div class="toast-title">' + escapeHtml(title) + '</div>' +
            '<div class="toast-message">' + escapeHtml(message) + '</div>';
        document.body.appendChild(toast);

        overlay.addEventListener('click', function () {
            closeToast(overlay, toast);
        });
        toast.addEventListener('click', function () {
            closeToast(overlay, toast);
        });

        requestAnimationFrame(function () {
            overlay.classList.add('show');
            toast.classList.add('show');
        });

        setTimeout(function () {
            closeToast(overlay, toast);
        }, 2500);
    }

    function closeToast(overlay, toast) {
        if (overlay) overlay.classList.remove('show');
        if (toast) toast.classList.remove('show');
        setTimeout(function () {
            if (overlay && overlay.parentNode) overlay.remove();
            if (toast && toast.parentNode) toast.remove();
        }, 300);
    }

    // 初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
