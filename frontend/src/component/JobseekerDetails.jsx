import { useEffect } from "react";
import { useAuth } from "../provider/authProvider";
import axios from "axios";

const JobseekerDetails = () => {
  const { token, userid } = useAuth();
  // const headers = {
  //   Authorization: `Bearer ${token}`,
  //   "userid": userid,
  //   // "Content-Type": "application/json", // Adjust content type based on your API requirements
  // };
  useEffect(() => {
    const fetchData = async () => {
      console.log("data fetching called");
      const data = await axios.get(
        `http://localhost:3000/api/v1/user/details/${userid}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userid: userid,
            // Add other headers if needed
          },
        }
      );

      console.log(data.data);
    };
    fetchData();
  }, [token, userid]);
  return <div>EmployeerDetails page</div>;
};

export default JobseekerDetails;
