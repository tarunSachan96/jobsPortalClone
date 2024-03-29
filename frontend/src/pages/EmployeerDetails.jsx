import { useEffect, useState } from "react";
import { useAuth } from "../provider/authProvider";
import axios from "axios";
const EmployeerDetails = () => {
  const { token, userid } = useAuth();
  const [data,setData]=useState("")
  const headers = {
    Authorization: `Bearer ${token}`,
    userid: userid,
    "Content-Type": "application/json", // Adjust content type based on your API requirements
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("data fetching called");
      const data = await axios.get(
        `http://localhost:3000/api/v1/user/admin/details/${userid}`,
        {
          headers,
        }
      );
      console.log(data.data[0]);
      setData(data.data[0]);
    };
    fetchData();
  }, []);
  return <><div>EmployeerDetails page</div>
  <h1>{data.company}</h1>
  </>;
};

export default EmployeerDetails;
