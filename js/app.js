/**
 * 主应用逻辑
 */
(function () {
    var currentTemplateId = null;
    var currentCategoryId = null;

    /**
     * 更新预览区域的复制状态
     */
    function updatePreviewCopyState() {
        var previewEl = document.getElementById('previewArea');
        if (!previewEl) return;

        if (window.authCheckCanUse) {
            var checkResult = window.authCheckCanUse();
            if (!checkResult.canUse) {
                previewEl.classList.add('no-copy');
            } else {
                previewEl.classList.remove('no-copy');
            }
        }
    }

    /**
     * 处理预览区域的复制事件
     */
    function handlePreviewCopy(e) {
        if (window.authCheckCanUse) {
            var checkResult = window.authCheckCanUse();
            if (!checkResult.canUse) {
                e.preventDefault();
                if (window.authShowBar) {
                    window.authShowBar();
                }
                showToast('🔒', '需要验证码', '免费使用次数已用完，请输入验证码继续使用');
            }
        }
    }

    /**
     * 初始化应用
     */
    function init() {
        buildStyleSelects();
        formatText();
        updatePreviewCopyState();

        // 监听预览区域的复制事件
        var previewEl = document.getElementById('previewArea');
        if (previewEl) {
            previewEl.addEventListener('copy', handlePreviewCopy);
        }
    }

    // 导出更新复制状态函数供外部调用
    window.updatePreviewCopyState = updatePreviewCopyState;

    /**
     * 构建样式选择 tab/chip 按钮
     */
    function buildStyleSelects() {
        var tabsContainer = document.getElementById('categoryTabs');
        var chipsContainer = document.getElementById('templateChips');
        if (!tabsContainer || !chipsContainer) return;

        var categories = window.TemplateRegistry.getCategories();

        // 构建分类 tab 按钮
        for (var i = 0; i < categories.length; i++) {
            var cat = categories[i];
            var templates = window.TemplateRegistry.getByCategory(cat.id);
            if (templates.length === 0) continue;

            var tab = document.createElement('button');
            tab.className = 'category-tab';
            tab.textContent = cat.name;
            tab.setAttribute('data-category', cat.id);

            tab.addEventListener('click', (function (categoryId) {
                return function () {
                    selectCategory(categoryId);
                };
            })(cat.id));

            tabsContainer.appendChild(tab);
        }

        // 默认选中第一个分类
        var firstTab = tabsContainer.querySelector('.category-tab');
        if (firstTab) {
            var firstCatId = firstTab.getAttribute('data-category');
            selectCategory(firstCatId);
        }
    }

    /**
     * 选中分类
     */
    function selectCategory(categoryId) {
        currentCategoryId = categoryId;

        // 更新 tab 激活态
        var tabs = document.querySelectorAll('.category-tab');
        for (var i = 0; i < tabs.length; i++) {
            if (tabs[i].getAttribute('data-category') === categoryId) {
                tabs[i].classList.add('active');
            } else {
                tabs[i].classList.remove('active');
            }
        }

        // 填充模板 chips
        populateTemplates(categoryId);
    }

    /**
     * 根据分类填充模板 chip 按钮
     */
    function populateTemplates(categoryId) {
        var chipsContainer = document.getElementById('templateChips');
        if (!chipsContainer) return;

        chipsContainer.innerHTML = '';
        var templates = window.TemplateRegistry.getByCategory(categoryId);

        for (var i = 0; i < templates.length; i++) {
            var chip = document.createElement('button');
            chip.className = 'template-chip';
            chip.textContent = templates[i].name;
            chip.setAttribute('data-template', templates[i].id);

            chip.addEventListener('click', (function (templateId) {
                return function () {
                    selectTemplate(templateId);
                };
            })(templates[i].id));

            chipsContainer.appendChild(chip);
        }

        // 选中第一个模板
        if (templates.length > 0) {
            selectTemplate(templates[0].id);
        }
    }

    /**
     * 选中模板
     */
    function selectTemplate(templateId) {
        currentTemplateId = templateId;

        // 更新 chip 激活态
        var chips = document.querySelectorAll('.template-chip');
        for (var i = 0; i < chips.length; i++) {
            if (chips[i].getAttribute('data-template') === templateId) {
                chips[i].classList.add('active');
            } else {
                chips[i].classList.remove('active');
            }
        }

        formatText();
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
            previewEl.innerHTML = '<p class="placeholder">上方输入内容后，这里将显示排版效果...</p>';
            return;
        }

        var elements = window.Formatter.parse(rawText);

        if (elements.length === 0) {
            previewEl.innerHTML = '<p class="placeholder">上方输入内容后，这里将显示排版效果...</p>';
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
        // 检查是否可以使用
        if (window.authCheckCanUse) {
            var checkResult = window.authCheckCanUse();

            if (!checkResult.canUse) {
                // 需要验证，显示验证条
                if (window.authShowBar) {
                    window.authShowBar();
                }
                showToast('🔒', '需要验证码', '免费使用次数已用完，请输入验证码继续使用');
                return;
            }

            // 如果是免费使用，增加使用次数并提示剩余次数
            if (checkResult.reason === 'free') {
                if (window.authIncrementUsage) {
                    window.authIncrementUsage();
                }
                var remaining = checkResult.remaining - 1;
                if (remaining > 0) {
                    console.log('剩余免费次数：' + remaining);
                }
                // 复制后更新预览区域状态（检查是否还有免费次数）
                setTimeout(function() {
                    updatePreviewCopyState();
                }, 100);
            }
        }

        var previewEl = document.getElementById('previewArea');
        if (!previewEl) return;

        var content = previewEl.querySelector('.wechat-content');
        if (!content) {
            showToast('--', '暂无内容', '请先在上方输入文本内容');
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
                    showCopySuccessMessage();
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

    function showCopySuccessMessage() {
        var message = '请打开公众号后台，直接 Ctrl+V 粘贴即可';

        // 检查是否需要提示剩余次数
        if (window.authCheckCanUse) {
            var checkResult = window.authCheckCanUse();
            if (checkResult.reason === 'free' && checkResult.remaining <= 1 && checkResult.remaining > 0) {
                message = '还剩 ' + checkResult.remaining + ' 次免费使用机会。之后需要验证码';
            } else if (checkResult.reason === 'free' && checkResult.remaining === 0) {
                message = '这是最后一次免费使用。下次需要验证码';
            }
        }

        showToast('OK', '复制成功', message);
    }

    function fallbackCopy() {
        try {
            document.execCommand('copy');
            showCopySuccessMessage();
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
     * 打开小红书主页
     */
    window.openXiaohongshu = function () {
        var xiaohongshuUrl = 'https://www.xiaohongshu.com/user/profile/607312980000000001005c49?xsec_token=YB9RhN3-FRWTpfsBSReIEukeEHMjB5xVd60pn5fT9HZG8%3D&xsec_source=app_share&xhsshare=&shareRedId=ODY5MzQ3PUE2NzUyOTgwNjY0OTc5SDpC&apptime=1769565449&share_id=5b3d1ad751c94c799c41520e423a6d0b&share_channel=copy_link';

        window.open(xiaohongshuUrl, '_blank');
        showToast('🔗', '正在跳转', '即将打开小红书主页');
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

    // 导出 showToast 供其他模块使用
    window.showToast = showToast;

    // 初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
