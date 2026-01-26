/**
 * 模板注册系统
 * 所有模板通过 TemplateRegistry.register() 注册
 */
window.TemplateRegistry = (function () {
    // 模板存储
    var templates = {};

    // 分类定义
    var categories = [
        { id: 'simple-professional', name: '简约专业' },
        { id: 'visual-balance', name: '视觉平衡' },
        { id: 'rich-decoration', name: '丰富装饰' },
        { id: 'creative-bold', name: '创意大胆' }
    ];

    return {
        /**
         * 注册模板
         * @param {string} id - 模板唯一ID
         * @param {object} template - 模板对象
         *   - name: 模板名称
         *   - category: 分类ID
         *   - render: function(elements) 渲染函数，接收解析后的元素数组，返回 HTML 字符串
         */
        register: function (id, template) {
            template.id = id;
            templates[id] = template;
        },

        /**
         * 获取模板
         */
        get: function (id) {
            return templates[id] || null;
        },

        /**
         * 获取所有模板
         */
        getAll: function () {
            return templates;
        },

        /**
         * 获取分类列表
         */
        getCategories: function () {
            return categories;
        },

        /**
         * 获取某分类下的模板列表
         */
        getByCategory: function (categoryId) {
            var result = [];
            for (var id in templates) {
                if (templates[id].category === categoryId) {
                    result.push(templates[id]);
                }
            }
            return result;
        },

        /**
         * 获取第一个模板ID
         */
        getDefaultId: function () {
            var keys = Object.keys(templates);
            return keys.length > 0 ? keys[0] : null;
        }
    };
})();
