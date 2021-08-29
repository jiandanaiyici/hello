const getParams = (tab: any, keyStr: string) => {
  let keys = keyStr.split('.');
  let label = tab;
  keys.forEach((key) => {
    label = label[key];
  });
  return label;
};

const getKey = (tab: any, tabKey: string) => {
  return getParams(tab, tabKey);
};

const getInstanceAt = (tabs: any[], tab: any, tabWidth: number, tabKey: string, gap: number) => {
  let halfWidth = (tabWidth - gap) / 2;
  let x = tab._instance.position.x;
  for (let i = 0; i < tabs.length; i++) {
    let targetX = tabs[i]._x - 1;
    if (getKey(tab, tabKey) === getKey(tabs[i], tabKey)) continue;
    // in range
    if (targetX <= x && x < targetX + halfWidth / 2) {
      // before range
      return {
        direction: 'left',
        instance: tabs[i]._instance,
        targetTab: tabs[i],
      };
    } else if (targetX + halfWidth / 2 <= x && x < targetX + halfWidth) {
      // after range
      return {
        direction: 'right',
        instance: tabs[i]._instance,
        targetTab: tabs[i],
      };
    }
  }
  return {
    direction: null,
    instance: null,
    targetTab: tab,
  };
};