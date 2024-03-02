import { useEffect, useState } from "react";
import { useAuth } from "../provider/authProvider";
import axios from "axios";

const EmployeerJobsPosted = () => {
  const { token, userid } = useAuth();
  const [data, setData] = useState([]);
  const headers = {
    Authorization: `Bearer ${token}`,
    userid: userid,
    "Content-Type": "application/json", // Adjust content type based on your API requirements
  };
  useEffect(() => {
    const fetchData = async () => {
      console.log("data fetching called");
      const data = await axios.get(
        `http://localhost:3000/api/v1/user/admin/jobsposted/jobs`,
        {
          headers,
        }
      );
      console.log(data.data);
      setData(data.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div>Employeer All Details page</div>
      <h1>{data.company}</h1>
    </>
  );
};

export default EmployeerJobsPosted;
