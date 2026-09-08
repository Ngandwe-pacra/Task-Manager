
export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white/80 px-8 py-6 text-center text-sm text-gray-500 backdrop-blur">
      Built by the intern team —{" "}
      <span className="font-semibold text-blue-600">TaskFlow</span>{" "}
      {new Date().getFullYear()}
    </footer>
  );
}
