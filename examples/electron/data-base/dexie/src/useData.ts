/* eslint-disable import/no-unresolved */
/* eslint-disable no-sparse-arrays */
import { useCallback, useEffect, useRef } from "react";
import { useSetState } from 'ahooks';
import db from './db';
import Dexie from 'dexie';

const useData = () => {
  const dbRef = useRef<Dexie>(db);
  const [state, setState] = useSetState({
    tasks: [],
    groups: []
  });

  useEffect(() => {
    if (dbRef.current) {
      console.log(dbRef.current, '>>>>>>>>>>dbRef');
    }
  }, [dbRef])

  useEffect(() => {
    const hanlder = async () => {
      if (db) {
        const tasks = await db.table('tasks').toArray();
        const groups = await db.table('groups').toArray();
        setState({
          tasks,
          groups,
        })
      }
    }
    hanlder();
  }, [db]);

  const addTask = useCallback(() => {
    db.table('tasks').add({
      name: '11',
    });
  }, []);

  const updateTask = useCallback(() => {
    console.log('更新任务>>>>>');
  }, []);

  const removeTask = useCallback(() => {
    console.log('删除任务>>>>');
  }, []);

  const clearTask = useCallback(() => {
    if (dbRef.current) {
      dbRef.current.table('tasks').clear();
    }
  }, []);

  const addGroup = useCallback(async () => {
    const result = await db.table('groups').add({
      name: '1'
    });
    return result;
  }, []);

  const updateGroup = useCallback(() => {
    console.log('update');
  }, []);

  const removeGroup = useCallback(() => {
    console.log('remove');
  }, []);

  const clearGroup = useCallback(() => {
    console.log('>>>>>>>>');
    dbRef.current.table('groups').clear();
  }, [dbRef])


  return [state, { addTask, updateTask, removeTask, clearTask, addGroup, updateGroup, removeGroup, clearGroup }] as const;
}

export default useData;