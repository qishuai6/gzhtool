/**
 * 模板加载辅助
 * 在所有模板和应用脚本加载后执行
 * 确保模板注册完毕并触发初始格式化
 */
(function () {
    // 所有脚本已加载，触发初始格式化
    if (typeof window.formatText === 'function') {
        window.formatText();
    }
})();
