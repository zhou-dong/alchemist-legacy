//sudo ./node_modules/@svgr/cli/bin/svgr --icon src/assets/svg/facebook.svg

import React from "react";

const Facebook = props => (
  <svg viewBox="0 0 59 59" width="3em" height="3em" {...props}>
    <linearGradient
      id="a"
      gradientUnits="userSpaceOnUse"
      x1={37.646}
      y1={14.5}
      x2={37.646}
      y2={56.878}
      spreadMethod="reflect"
    >
      <stop offset={0} stopColor="#6dc7ff" />
      <stop offset={1} stopColor="#e6abff" />
    </linearGradient>
    <path
      d="M42 56V38h5.358l.934-8H42v-4.457c0-2.097-.131-3.527 2.877-3.527L48 22.014v-6.479c-1-.088-2.487-.285-5.136-.285-5.531 0-8.864 3.376-8.864 9.576V30h-7v8h7v18h8z"
      fill="url(#a)"
    />
    <linearGradient
      id="b"
      gradientUnits="userSpaceOnUse"
      x1={32}
      y1={6.833}
      x2={32}
      y2={58.017}
      spreadMethod="reflect"
    >
      <stop offset={0} stopColor="#1a6dff" />
      <stop offset={1} stopColor="#c822ff" />
    </linearGradient>
    <path
      d="M50 57H14c-3.859 0-7-3.141-7-7V14c0-3.859 3.141-7 7-7h36c3.859 0 7 3.141 7 7v36c0 3.859-3.141 7-7 7zM14 9c-2.757 0-5 2.243-5 5v36c0 2.757 2.243 5 5 5h36c2.757 0 5-2.243 5-5V14c0-2.757-2.243-5-5-5H14z"
      fill="url(#b)"
    />
  </svg>
);

export default Facebook;
