import { useEffect, useState } from "react";
import { useAuth } from "../provider/authProvider";
import axios from "axios";

const EmployeerTargetJob = () => {
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
          `http://localhost:3000/api/v1/user/admin/jobsposted/jobs/65dd917aec41d057cb1f7ed5`,
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
        <div>EmployeerDetails page</div>
        <h1>{data.company}</h1>
      </>
    );
}

export default EmployeerTargetJob