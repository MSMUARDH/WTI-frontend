import axios from "axios";
import { MDBContainer } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ViewNotePage = () => {
  const [sightDetail, setSightDetail] = useState("");
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const getSightDetail = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7298/api/SightDetail/${id}`
      );

      if (response.status == 200) {
        console.log(response.data);
        setSightDetail(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSightDetail();
  }, []);

  return (
    <MDBContainer>
      <h3 className="text-center mt-5">
        Sight Detail of Plane - {sightDetail.name}
      </h3>
      <p className="text-center"> Short Name : {sightDetail.shortName}</p>
      <p className="text-center">Airline code : {sightDetail.airlineCode}</p>

      <p className="text-center"> Date : {sightDetail.createdDate}</p>
      {/* <p className="text-center"> Time : {dateTimeString.substring(0, 10)}</p> */}

      <p className="text-center">Location : {sightDetail.location}</p>
    </MDBContainer>
  );
};

export default ViewNotePage;
