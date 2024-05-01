import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg width="379px" height="379px" viewBox="0 0 379 379" {...props}>
      <defs>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="70.0424637%" id="linearGradient-1">
          <stop stop-color="#85FFC4" offset="0%" />
          <stop stop-color="#407B5F" offset="51.7419764%" />
          <stop stop-color="#000000" offset="100%" />
        </linearGradient>
        <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="linearGradient-2">
          <stop stop-color="#85FFC4" offset="0%" />
          <stop stop-color="#000000" offset="100%" />
        </linearGradient>
      </defs>
      <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <g id="A4-Copy-3" transform="translate(-640.000000, -319.000000)">
          <g id="Group" transform="translate(640.000000, 319.000000)">
            <rect id="Rectangle" fill="#000000" x="102" y="182" width="25" height="173" />
            <rect id="Rectangle-Copy-4" fill="#000000" x="170" y="269" width="8" height="107" />
            <rect id="Rectangle-Copy-6" fill="#000000" x="295" y="264" width="8" height="75" />
            <rect id="Rectangle-Copy-5" fill="#000000" x="232" y="220" width="8" height="151" />
            <path
              d="M189.5,0 C294.15796,0 379,84.8420399 379,189.5 C379,294.15796 294.15796,379 189.5,379 C84.8420399,379 0,294.15796 0,189.5 C0,84.8420399 84.8420399,0 189.5,0 Z M190,34 C104.395864,34 35,103.395864 35,189 C35,274.604136 104.395864,344 190,344 C275.604136,344 345,274.604136 345,189 C345,103.395864 275.604136,34 190,34 Z"
              id="Combined-Shape"
              fill="url(#linearGradient-1)"
            />
            <path
              d="M114.5,132 C133.553824,132 149,147.446176 149,166.5 C149,185.553824 133.553824,201 114.5,201 C95.4461761,201 80,185.553824 80,166.5 C80,147.446176 95.4461761,132 114.5,132 Z M114.5,156 C108.70101,156 104,160.70101 104,166.5 C104,172.29899 108.70101,177 114.5,177 C120.29899,177 125,172.29899 125,166.5 C125,160.70101 120.29899,156 114.5,156 Z"
              id="Combined-Shape-Copy-2"
              fill="url(#linearGradient-2)"
            />
            <path
              d="M69.5,222 C76.4035594,222 82,227.596441 82,234.5 C82,241.403559 76.4035594,247 69.5,247 C62.5964406,247 57,241.403559 57,234.5 C57,227.596441 62.5964406,222 69.5,222 Z M70,230 C67.790861,230 66,231.790861 66,234 C66,236.209139 67.790861,238 70,238 C72.209139,238 74,236.209139 74,234 C74,231.790861 72.209139,230 70,230 Z"
              id="Combined-Shape-Copy-3"
              fill="url(#linearGradient-2)"
            />
            <path
              d="M173.5,250 C180.403559,250 186,255.596441 186,262.5 C186,269.403559 180.403559,275 173.5,275 C166.596441,275 161,269.403559 161,262.5 C161,255.596441 166.596441,250 173.5,250 Z M174,258 C171.790861,258 170,259.790861 170,262 C170,264.209139 171.790861,266 174,266 C176.209139,266 178,264.209139 178,262 C178,259.790861 176.209139,258 174,258 Z"
              id="Combined-Shape-Copy-4"
              fill="url(#linearGradient-2)"
            />
            <path
              d="M235.5,197 C242.403559,197 248,202.596441 248,209.5 C248,216.403559 242.403559,222 235.5,222 C228.596441,222 223,216.403559 223,209.5 C223,202.596441 228.596441,197 235.5,197 Z M236,205 C233.790861,205 232,206.790861 232,209 C232,211.209139 233.790861,213 236,213 C238.209139,213 240,211.209139 240,209 C240,206.790861 238.209139,205 236,205 Z"
              id="Combined-Shape-Copy-5"
              fill="url(#linearGradient-2)"
            />
            <path
              d="M298.5,244 C305.403559,244 311,249.596441 311,256.5 C311,263.403559 305.403559,269 298.5,269 C291.596441,269 286,263.403559 286,256.5 C286,249.596441 291.596441,244 298.5,244 Z M299,252 C296.790861,252 295,253.790861 295,256 C295,258.209139 296.790861,260 299,260 C301.209139,260 303,258.209139 303,256 C303,253.790861 301.209139,252 299,252 Z"
              id="Combined-Shape-Copy-6"
              fill="url(#linearGradient-2)"
            />
          </g>
        </g>
      </g>
    </Svg>
  );
};

export default Icon;
