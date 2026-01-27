/**
 * 验证码验证逻辑
 */
(function () {
    'use strict';

    // 有效期配置（天数）
    var VALIDITY_PERIODS = {
        '1month': 30,
        '6months': 180,
        '1year': 365,
        'permanent': -1  // -1 表示永久
    };

    var AUTH_STORAGE_KEY = 'gzhtool_auth';

    /**
     * 初始化验证检查
     */
    function initAuth() {
        var authData = getAuthData();

        if (authData && isAuthValid(authData)) {
            // 验证有效，隐藏验证条
            hideAuthBar();
            unlockInterface();
        } else {
            // 验证无效或不存在，显示验证条
            showAuthBar();
            lockInterface();
        }
    }

    /**
     * 从 localStorage 获取验证数据
     */
    function getAuthData() {
        try {
            var data = localStorage.getItem(AUTH_STORAGE_KEY);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            return null;
        }
    }

    /**
     * 保存验证数据到 localStorage
     */
    function saveAuthData(authCode, type) {
        var data = {
            authCode: authCode,
            type: type,
            activatedAt: Date.now()
        };
        try {
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(data));
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * 检查验证是否有效
     */
    function isAuthValid(authData) {
        if (!authData || !authData.type || !authData.activatedAt) {
            return false;
        }

        var type = authData.type;
        var period = VALIDITY_PERIODS[type];

        // 永久有效
        if (period === -1) {
            return true;
        }

        // 检查是否过期
        var now = Date.now();
        var activatedAt = authData.activatedAt;
        var expiresAt = activatedAt + (period * 24 * 60 * 60 * 1000);

        return now < expiresAt;
    }

    /**
     * 验证输入的验证码
     */
    function verifyCode() {
        var input = document.getElementById('authInput');
        var errorEl = document.getElementById('authError');

        if (!input) return;

        // 获取输入值并格式化（去除空格和短横线，转大写）
        var rawCode = input.value.trim();
        var formattedCode = rawCode.replace(/[\s-]/g, '').toUpperCase();

        // 重新格式化为 XXXX-XXXX-XXXX
        var displayCode = '';
        for (var i = 0; i < formattedCode.length; i++) {
            if (i > 0 && i % 4 === 0) {
                displayCode += '-';
            }
            displayCode += formattedCode[i];
        }

        // 检查验证码是否存在
        if (!window.AUTH_CODES || !window.AUTH_CODES[displayCode]) {
            showError('验证码无效，请重新输入');
            return;
        }

        // 获取验证码类型
        var type = window.AUTH_CODES[displayCode];

        // 保存验证数据
        if (!saveAuthData(displayCode, type)) {
            showError('保存失败，请重试');
            return;
        }

        // 显示成功提示
        showSuccess();

        // 1秒后隐藏验证条并解锁界面
        setTimeout(function () {
            hideAuthBar();
            unlockInterface();
        }, 1000);
    }

    /**
     * 显示错误提示
     */
    function showError(message) {
        var input = document.getElementById('authInput');
        var errorEl = document.getElementById('authError');

        if (input) {
            input.classList.add('error');
        }

        if (errorEl) {
            errorEl.textContent = message;
            errorEl.style.display = 'inline';
        }

        // 2秒后清除错误状态
        setTimeout(function () {
            clearError();
        }, 2000);
    }

    /**
     * 清除错误状态
     */
    function clearError() {
        var input = document.getElementById('authInput');
        var errorEl = document.getElementById('authError');

        if (input) {
            input.classList.remove('error');
        }

        if (errorEl) {
            errorEl.style.display = 'none';
            errorEl.textContent = '';
        }
    }

    /**
     * 显示成功提示
     */
    function showSuccess() {
        var errorEl = document.getElementById('authError');

        if (errorEl) {
            errorEl.textContent = '验证成功！';
            errorEl.style.color = '#00f0ff';
            errorEl.style.display = 'inline';
        }
    }

    /**
     * 显示验证条
     */
    function showAuthBar() {
        var authBar = document.getElementById('authBar');
        if (authBar) {
            authBar.style.display = 'block';
        }
    }

    /**
     * 隐藏验证条（带动画）
     */
    function hideAuthBar() {
        var authBar = document.getElementById('authBar');
        if (authBar) {
            authBar.classList.add('slide-out');
            setTimeout(function () {
                authBar.style.display = 'none';
            }, 500);
        }
    }

    /**
     * 锁定主界面
     */
    function lockInterface() {
        var container = document.querySelector('.container');
        if (container) {
            container.classList.add('locked');
        }
    }

    /**
     * 解锁主界面
     */
    function unlockInterface() {
        var container = document.querySelector('.container');
        if (container) {
            container.classList.remove('locked');
        }
    }

    /**
     * 处理回车键验证
     */
    function handleKeyPress(event) {
        if (event.key === 'Enter' || event.keyCode === 13) {
            verifyCode();
        }
    }

    // 导出全局函数
    window.verifyCode = verifyCode;

    // 页面加载时初始化
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function () {
            initAuth();

            // 绑定回车键事件
            var input = document.getElementById('authInput');
            if (input) {
                input.addEventListener('keypress', handleKeyPress);
            }
        });
    } else {
        initAuth();

        // 绑定回车键事件
        var input = document.getElementById('authInput');
        if (input) {
            input.addEventListener('keypress', handleKeyPress);
        }
    }
})();
