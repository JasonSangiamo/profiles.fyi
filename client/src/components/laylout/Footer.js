import React from "react";

export default function Footer() {
  return (
    <div>
      <footer className="bg-dark text-white mt-5 p-4 fixed-bottom text-center ">
        Copyright &copy; {new Date().getFullYear()} profiles.fyi
      </footer>
    </div>
  );
}
