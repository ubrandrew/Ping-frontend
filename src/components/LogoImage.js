import React from "react";

const LogoImage = ({data}) => {
    return (
      <img src={`data:image/png;base64,${data}`} className="h-16 w-16 mx-5 my-4" />
    )
}

export default LogoImage;