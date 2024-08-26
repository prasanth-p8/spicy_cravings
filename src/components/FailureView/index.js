import "./index.scss";

function FailureView(props) {
  const { reload } = props;
  return (
    <div className="failure-view-container">
      <div className="failure-view-sub-container">
        <h1>Oops!</h1>
        <p>It seems something went wrong.</p>
        <button
          className="button failure-view-try-again-button"
          onClick={reload}
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default FailureView;
