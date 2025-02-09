// @ts-check
/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const typedocSidebar = {
  items: [
    {
      type: 'category',
      label: 'Functions',
      items: [{ type: 'doc', id: 'api/functions/greet', label: 'greet' }],
    },
  ],
};
module.exports = typedocSidebar.items;
