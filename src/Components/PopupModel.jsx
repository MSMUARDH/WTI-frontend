import React, { useEffect, useState } from "react";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBRadio,
} from "mdb-react-ui-kit";
import { MDBContainer, MDBInput, MDBTextArea } from "mdb-react-ui-kit";
import { AddSightData, getAllSightData } from "../features/Notes/detailsSlice";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function PopupModel() {
  const { details, isLoading } = useSelector((state) => state.SightDetails);

  useEffect(() => {
    dispatch(getAllSightData());
  }, [isLoading]);

  const [centredModal, setCentredModal] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sighting, setSighting] = useState({
    name: "",
    shortName: "",
    airlineCode: "",
    location: "",
    createdDate: "",
    active: true,
    delete: false,
    createdUserId: 1, // Example user ID
    modifiedUserId: 1,
    photoPath: "string",
  });

  const validateSighting = (sighting) => {
    for (const key in sighting) {
      if (sighting.hasOwnProperty(key)) {
        if (
          sighting[key] === "" ||
          sighting[key] === null ||
          sighting[key] === undefined
        ) {
          return false;
        }
      }
    }
    return true;
  };

  //for form

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSighting({ ...sighting, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (validateSighting(sighting)) {
        dispatch(AddSightData(sighting));

        if (isLoading) {
          toast.success("Adding Details...");
        }
        dispatch(getAllSightData());
        toast.success("Saved successfully...");
        navigate("/");
      } else {
        toast.warn("Please fill in all fields");
      }
    } catch (error) {
      toast.error("Note saved successfully...");
    }
  };

  const token = localStorage.getItem("token");

  const handleClose = () => {
    navigate("/");
  };

  return (
    <>
      <div
        className="mt-5"
        style={{ display: "flex", justifyContent: "center" }}
      ></div>
      {/*  */}
      {isLoading && <h1>Loading</h1>}
      <MDBModal tabIndex="-1" show={centredModal} setShow={setCentredModal}>
        <MDBModalDialog centered>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle className="text-center">
                Add your Sight Details
              </MDBModalTitle>
              <MDBBtn
                className="btn-close"
                color="none"
                onClick={handleClose}
              ></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>
              <div>
                <div className="row justify-content-center">
                  <div className="">
                    <form>
                      {/* //!Name of the airline */}

                      <MDBContainer className="mb-3">
                        <MDBInput
                          onChange={handleChange}
                          value={sighting.name}
                          name="name"
                          label="Name of the airline"
                          id="typeText"
                          type="text"
                        />
                      </MDBContainer>
                      {/* //!Short name of airline */}
                      <MDBContainer className="mb-3">
                        <MDBInput
                          onChange={handleChange}
                          value={sighting.shortName}
                          name="shortName"
                          label="Short name of airline"
                          id="typeText"
                          type="text"
                        />
                      </MDBContainer>
                      {/* //!airlineCode */}
                      <MDBContainer className="mb-3">
                        <MDBInput
                          onChange={handleChange}
                          value={sighting.airlineCode}
                          name="airlineCode"
                          label="Airline Code"
                          id="typeText"
                          type="text"
                        />
                      </MDBContainer>

                      {/* //!location */}
                      <MDBContainer className="mb-3">
                        <MDBInput
                          onChange={handleChange}
                          value={sighting.location}
                          name="location"
                          label="Location"
                          id="typeText"
                          type="text"
                        />
                      </MDBContainer>

                      {/* //! DATE HERE*/}
                      <MDBContainer className="mb-3">
                        <MDBInput
                          onChange={handleChange}
                          value={sighting.createdDate}
                          name="createdDate"
                          id="typeText"
                          type="datetime-local"
                        />
                      </MDBContainer>

                      {/* //! Photo HERE*/}

                      <MDBContainer className="mb-3">
                        <MDBInput
                          // onChange={handleChange}
                          id="typeText"
                          type="file"
                        />
                      </MDBContainer>
                    </form>
                  </div>
                </div>
              </div>
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn onClick={handleClose} color="secondary">
                Close
              </MDBBtn>
              <MDBBtn onClick={handleSubmit}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
