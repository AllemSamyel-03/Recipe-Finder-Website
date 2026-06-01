function Loading({ text = "Loading recipes..." }) {
  return (
    <div className="loading-box">
      <span className="loader"></span>
      <p>{text}</p>
    </div>
  );
}

export default Loading;
