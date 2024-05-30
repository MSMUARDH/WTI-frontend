import axios from "axios";

// !AddSightData
const AddSightData = async (sighting) => {
  // console.log("from SERVICE",sighting)

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let URL = "https://localhost:7298/api/SightDetail";


  const response = await axios.post(URL, sighting, {
    headers: headers,
  });

  console.log("repns service",response.data)

  return response.data;
};


// !getAllSightData
const getAllSightData = async () => {

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let URL = "https://localhost:7298/api/SightDetail";


  const response = await axios.get(URL, {
    headers: headers,
  });

// console.log("get all respons from servic",response.data)

  return response.data;
};

// !deleteNote
const deleteSightDetail = async (id) => {

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let URL = `https://localhost:7298/api/SightDetail?id=${id}`;


  const response = await axios.delete(URL);

  console.log( "this is from delete service",response);

  return response.data;
};


// !update detail
const updateDetail = async (sigtingdata) => {

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
  };

  let URL = "https://localhost:7298/api/SightDetail";


  const response = await axios.put(URL, sighting, {
    headers: headers,
  });

  // console.log("repns service",response.data)

  return response.data;








// !old
  // const id = noteData.id;
  // const data = { Note_Title: noteData.title, Note_Text: noteData.text };


  // const response = await axios.put(
  //   `http://localhost:5000/api/note/${id}`,
  //   data
  // );


  // return response.data;
};





const detailService = {
  AddSightData,
  getAllSightData,
  deleteSightDetail,
  updateDetail

};

export default detailService;