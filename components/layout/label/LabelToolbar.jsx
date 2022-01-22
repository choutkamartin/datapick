export default function LabelToolbar({ project }) {
  return (
    <div className="flex gap-x-8 items-center toolbar bg-white border-b px-4 py-2">
      <div>
        Project: <span className="font-medium">{project.name}</span>
      </div>
      <div>
        Type: <span className="font-medium">{project.type}</span>
      </div>
    </div>
  );
}
