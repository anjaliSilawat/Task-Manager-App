export default function TaskCard({ task, onEdit, onDelete, onStageChange }) {
  const stageColors = {
    'Todo': 'bg-gray-100 text-gray-600',
    'In Progress': 'bg-yellow-100 text-yellow-700',
    'Done': 'bg-green-100 text-green-700'
  }

  const nextStage = {
    'Todo': 'In Progress',
    'In Progress': 'Done',
    'Done': null
  }

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 space-y-2">
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-medium text-gray-800 text-sm">{task.title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap ${stageColors[task.stage]}`}>
          {task.stage}
        </span>
      </div>

      {task.description && (
        <p className="text-xs text-gray-500">{task.description}</p>
      )}

      <div className="flex items-center gap-2 pt-1">
        {nextStage[task.stage] && (
          <button
            onClick={() => onStageChange(task._id, nextStage[task.stage])}
            className="text-xs bg-blue-50 text-blue-600 px-3 py-1 rounded-lg hover:bg-blue-100 transition"
          >
            → {nextStage[task.stage]}
          </button>
        )}
        <button onClick={() => onEdit(task)}
          className="text-xs bg-gray-50 text-gray-600 px-3 py-1 rounded-lg hover:bg-gray-100 transition ml-auto">
          Edit
        </button>
        <button onClick={() => onDelete(task._id)}
          className="text-xs bg-red-50 text-red-500 px-3 py-1 rounded-lg hover:bg-red-100 transition">
          Delete
        </button>
      </div>
    </div>
  )
}