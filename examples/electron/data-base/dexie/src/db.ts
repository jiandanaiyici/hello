import Dexie from 'dexie';

interface GroupData {
  groupId?: number;
  groupName: string;
}


class DexieDBManager {
  private db!: Dexie;

  /** 数据库名称 */
  private static DB_NAME = 'DB_NAME';

  /** 表名 */
  private static GROUP_NAME = 'groups';
  private static TASK_NAME = 'tasks';

  /** 设置版本号 */
  private static DB_VERSION = 1;

  /** 初始化 */
  init() {
    this.db = new Dexie(DexieDBManager.DB_NAME, { autoOpen: true });
    this.db.version(DexieDBManager.DB_VERSION).stores({
      [DexieDBManager.GROUP_NAME]: '++groupId, groupName',
      [DexieDBManager.TASK_NAME]: '++taskId, taskName'
    })
  }

  getGroupTable() {
    return this.db.table(DexieDBManager.GROUP_NAME);
  }

  public async getGroups() {
    const result = await this.getGroupTable().toArray();
    return result || [];
  }

  public addGroup(group: GroupData = {} as GroupData) {
    return this.getGroupTable().add(group);
  }
}

// const db = new Dexie('ReactSampleDB');
// db.version(1).stores({ groups: '++groupId' });
// db.version(1).stores({ tasks: '++taskId' });

export default new DexieDBManager();