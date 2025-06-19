// // src/component/BackgroundWrapper.jsx
// import React, { useEffect, useRef, useState } from "react";
// import "./style.css";
// import * as THREE from "three";
// import FOG from "vanta/dist/vanta.fog.min";

// function BackgroundWrapper({ children, type = "image" }) {
//   const vantaRef = useRef(null);
//   const [vantaEffect, setVantaEffect] = useState(null);

//   useEffect(() => {
//     if (type === "vanta" && !vantaEffect) {
//       setVantaEffect(
//         FOG({
//           el: vantaRef.current,
//           THREE: THREE,
//           mouseControls: true,
//           touchControls: true,
//           gyroControls: false,
//           minHeight: 200,
//           minWidth: 200,
//           highlightColor: 0xe0f7fa,
//           midtoneColor: 0x80deea,
//           lowlightColor: 0x00796b,
//           baseColor: 0x000000,
//           blurFactor: 0.4,
//           speed: 1,
//         })
//       );
//     }
//     return () => {
//       if (vantaEffect) vantaEffect.destroy();
//     };
//   }, [type]);

//   return (
//     <div
//       ref={type === "vanta" ? vantaRef : null}
//       className={`background-wrapper ${type === "image" ? "image-bg" : ""}`}
//     >
//       {children}
//     </div>
//   );
// }

// export default BackgroundWrapper;
