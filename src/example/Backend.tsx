import {useEffect, useState} from "react";

const Backend = () => {
  const [data, setData] = useState();
  useEffect(() => {
    fetch("/api")
      .then(response=>response.json())
      .then(response=>setData(response.message))
  }, [])
  return (
    <>
    Backend: {data}
    </>
  )
}
export default Backend;