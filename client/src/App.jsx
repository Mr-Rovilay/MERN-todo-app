import Home from "./components/Home";

export const url = import.meta.env.VITE_SERVER_DOMAIN;

const App = () => {
  return (
    <div className="text-center">
      <Home />
    </div>
  );
};

export default App;
