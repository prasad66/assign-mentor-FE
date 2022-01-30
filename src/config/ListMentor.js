import axios from "axios";

const ListMentor = async (mentorID) => {
  const result = await axios.get(
    `https://stu-hub.herokuapp.com/mentor/${mentorID}`
  );
  return result.data;
};
export default ListMentor;
