function EmptyView({ title, message }) {
  return (
    <div className="empty-view">
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default EmptyView;
