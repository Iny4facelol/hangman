import { PropagateLoader } from "react-spinners";

export const Loader = () => {
  return (
    <>
      <section className="loader-section">
        <div className="loader-content">
        <PropagateLoader color="white" />
        <p>Preparando la plaza para la ejecución.</p>
        </div>
      </section>
    </>
  );
};
