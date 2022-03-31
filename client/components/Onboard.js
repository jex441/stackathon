import React from "react";

export default function Onboard() {
  return (
    <section className="container mt-10 flex-col md:flex-row">
      <div className="h-2/6 flex space-y-4 flex-wrap sm:justify-center sm:w-3/6 sm:h-full sm:flex-col">
        <span className="text-4xl pb-4">Putting Artists First</span>
        <ul className="text-lg sm:space-y-2">
          <li>Designed Specifically for Artists</li>
          <li>No Advertising</li>
          <li>Custom Domains</li>
          <li>Free to Use</li>
          <li>
            <a href="http://www.selected-work.com/janeisidor" target="_blank">
              <button
                type="button"
                className="pill mr-4 my-4 hover:text-white z-20"
              >
                View Demo Site
              </button>
            </a>
            <a href="#auth">
              <button type="button" className="pillDark my-4 z-20">
                Get Started
              </button>
            </a>
          </li>
        </ul>
      </div>
      <div className="h-3/6 flex flex-row justify-between space-x-4 items-start sm:items-center sm:h-full sm:w-3/6">
        <span className="h-full flex items-end sm:items-center">
          <img
            src="mobile.png"
            className="phoneimg z-10 h-3/6 sm:absolute sm:h-2/6"
          />
        </span>
        <span className="h-full flex items-end sm:items-center">
          <img
            src="desktop.png"
            className="desktopimg h-3/6 sm:absolute sm:h-3/6 z-0"
          />
        </span>
      </div>
    </section>
  );
}
