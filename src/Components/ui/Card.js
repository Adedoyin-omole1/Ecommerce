export default function Card({ title, children, footer }) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {title && (
        <div className="px-6 py-4 border-b">
          <h3 className="text-lg font-semibold">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
      {footer && <div className="px-6 py-4 border-t bg-gray-50">{footer}</div>}
    </div>
  );
}
