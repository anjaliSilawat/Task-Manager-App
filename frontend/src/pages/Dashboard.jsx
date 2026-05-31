import { useState, useEffect } from 'react'
import api from '../api'
import Navbar from '../components/Navbar'
import TaskCard from '../components/TaskCard'
import TaskModal from '../components/TaskModal'

const STAGES = ['Todo', 'In Progress', 'Done']

const stageStyles = {
  'Todo': { header: 'bg-gray-100 text-gray-700', dot: 'bg-gray-400' },
  'In Progress': { header: 'bg-yellow-50 text-yellow-700', dot: 'bg-yellow-400' },
  'Done': { header: 'bg-green-50 text-green-700', dot: 'bg-green-400' }
}

export default function Dashboard() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editTask, setEditTask] = useState(null)

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks')
      setTasks(res.data)
    } catch {
      setError('Failed to load tasks')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTasks() }, [])

  const handleSubmit = async (form) => {
    try {
      if (editTask) {
        await api.put(`/tasks/${editTask._id}`, form)
      } else {
        await api.post('/tasks', form)
      }
      setModalOpen(false)
      setEditTask(null)
      fetchTasks()
    } catch {
      setError('Failed to save task')
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Delete this task?')) return
    try {
      await api.delete(`/tasks/${id}`)
      fetchTasks()
    } catch {
      setError('Failed to delete task')
    }
  }

  const handleStageChange = async (id, stage) => {
    try {
      await api.put(`/tasks/${id}`, { stage })
      fetchTasks()
    } catch {
      setError('Failed to update stage')
    }
  }

  const handleEdit = (task) => {
    setEditTask(task)
    setModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-gray-800">My Tasks</h2>
          <button
            onClick={() => { setEditTask(null); setModalOpen(true) }}
            className="bg-blue-600 text-white px-5 py-2 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            + New Task
          </button>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg mb-6 text-sm">{error}</div>
        )}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STAGES.map(stage => {
              const stageTasks = tasks.filter(t => t.stage === stage)
              const style = stageStyles[stage]
              return (
                <div key={stage} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                  <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-4 ${style.header}`}>
                    <div className={`w-2 h-2 rounded-full ${style.dot}`} />
                    <span className="font-semibold text-sm">{stage}</span>
                    <span className="ml-auto text-xs font-medium opacity-60">{stageTasks.length}</span>
                  </div>

                  <div className="space-y-3">
                    {stageTasks.length === 0 ? (
                      <p className="text-center text-xs text-gray-400 py-8">No tasks here</p>
                    ) : (
                      stageTasks.map(task => (
                        <TaskCard
                          key={task._id}
                          task={task}
                          onEdit={handleEdit}
                          onDelete={handleDelete}
                          onStageChange={handleStageChange}
                        />
                      ))
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      <TaskModal
        isOpen={modalOpen}
        onClose={() => { setModalOpen(false); setEditTask(null) }}
        onSubmit={handleSubmit}
        editTask={editTask}
      />
    </div>
  )
}