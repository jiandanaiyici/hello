import { Random } from 'mockjs';

const tasks = Array(10).fill(1).map(() => {
  return {
    taskId: Random.id(),
    key: Random.id(),
    taskName: Random.city()
  }
})

const folders = Array(10).fill(1).map(() => {
  return {
    key: Random.id(),
    name: Random.cname(),
    children: Math.random() > 0.5 ? tasks : []
  }
})


export default folders;