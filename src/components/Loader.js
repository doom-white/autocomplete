import React from "react";
import ContentLoader from "react-content-loader";

const Loader = (props) => (
  <ContentLoader
    speed={2}
    width={400}
    height={200}
    viewBox="0 0 400 200"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="17" y="51" rx="0" ry="0" width="50" height="40" />
    <rect x="84" y="67" rx="9" ry="9" width="117" height="9" />
  </ContentLoader>
);

export default Loader;
