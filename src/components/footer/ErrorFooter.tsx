import { CloudAlert } from "lucide-react";

const ErrorFooter = () => {
  return (
    <>
      <CloudAlert color="#dc2626" />
      <span className="font-normal bg-gradient-to-r bg-clip-text text-transparent from-red-600 via-red-500 to-red-400 animate-text">
        Jelenleg nincs elérhető link
      </span>
    </>
  );
};

export default ErrorFooter;
