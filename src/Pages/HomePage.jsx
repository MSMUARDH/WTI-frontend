import React, { useEffect } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBadge,
} from "mdb-react-ui-kit";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";

// App.js

import NavBar from "../Components/NavBar";
import { useDispatch, useSelector } from "react-redux";

import { getAllSightData, deleteDetail } from "../features/Notes/detailsSlice";

import { Link } from "react-router-dom";

function HomePage() {
  const { details, isSuccess, isLoading } = useSelector(
    (state) => state.SightDetails
  );
  const dispatch = useDispatch();

  const token = localStorage.getItem("token");

  useEffect(() => {
    dispatch(getAllSightData());
  }, [isLoading]);

  return (
    <>
      <NavBar />
      {/* {isLoading && <h1>Loading</h1>} */}
      <MDBContainer className="App">
        <Link to="/create-note">
          <MDBBtn className="my-3" toggle>
            Add Sight Detail
          </MDBBtn>
        </Link>

        <div className="container">
          <div className="row">
            {details.map((detail, index) => (
              <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                <MDBCard className="shadow-5-strong ">
                  <MDBCardBody className="cardhvr">
                    <MDBContainer>
                      <MDBBadge className="mb-3" pill color="success" light>
                        {detail.name}
                      </MDBBadge>
                    </MDBContainer>
                    <Link to={`/view-detail/${detail.id}`}>
                      <MDBCardTitle>
                        {" "}
                        {detail.name && detail.name.length > 20
                          ? detail.name.slice(0, 20) + "..."
                          : detail.name}
                      </MDBCardTitle>
                      {/* <MDBCardText>
                        {note.Note_Text && note.Note_Text.length > 30
                          ? note.Note_Text.slice(0, 30) + "..."
                          : note.Note_Text}
                      </MDBCardText> */}
                    </Link>

                    <div className="mt-4 d-flex justify-content-between">
                      <Link to={`/update-detail/${detail.id}`}>
                        <MDBBtn color="success">Update</MDBBtn>
                      </Link>
                      <MDBBtn
                        onClick={() => dispatch(deleteDetail(detail.id))}
                        color="danger"
                      >
                        Delete
                      </MDBBtn>
                    </div>
                  </MDBCardBody>
                </MDBCard>
              </div>
            ))}
          </div>
        </div>
      </MDBContainer>
    </>
  );
}

export default HomePage;
